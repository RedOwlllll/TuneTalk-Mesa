import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../authentication/UserState";
import AccountLogo from "../../assets/AccountLogo.svg";
import "../../css/App.css"; 
import "../../css/Profile.css"; 
import "../../css/PostDetails.css";
import PostDetails from "../../components/PostDetails";
import axios from "axios";

const CLIENT_ID = "fed33d2e0da4477c9bfa5d6b80b06cc1";
const CLIENT_SECRET = "d429104cf4b2470794d90179df216895";

export const Profile = () => {
    const [user, setUser] = useUser();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [featuredTrack, setFeaturedTrack] = useState(null);
    const [previewURL, setPreviewURL] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const genreMapping = {
        "kpop": "k-pop",
        "hiphop": "hip-hop",
        "rnb": "r-n-b",
        // Add more mappings as needed 
    };
    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`/api/posts/getuserpost?username=${user.username}`);
                const json = await response.json();
                if (response.ok) {
                    setPosts(json);
                }
            } catch (error) {
                console.error("Error fetching user posts:", error);
            }
        };

        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`/api/users/details?username=${user.username}`);
                const userData = await response.json();
                if (response.ok) {
                    setUser(userData); // Update user state
                    setRecommendations(userData.recommendations || []);
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        if (user.isAuthenticated) {
            fetchPosts();
            fetchUserDetails();
        }
    }, [user, setUser]);

    useEffect(() => {
        const getAccessToken = async () => {
            const params = new URLSearchParams();
            params.append('grant_type', 'client_credentials');
            params.append('client_id', CLIENT_ID);
            params.append('client_secret', CLIENT_SECRET);

            try {
                const { data } = await axios.post('https://accounts.spotify.com/api/token', params);
                setAccessToken(data.access_token);
            } catch (error) {
                console.error('Error fetching access token:', error);
            }
        };

        getAccessToken();
    }, []);

    useEffect(() => {
        const fetchRecommendations = async (genres) => {
            const spotifyGenres = genres.map(genre => genreMapping[genre] || genre); 
            const genreString = spotifyGenres.join(","); 
            let retryCount = 0;
            const maxRetries = 3;

            while (retryCount < maxRetries) {
                try {
                    const recommendationsResponse = await axios.get(`https://api.spotify.com/v1/recommendations?limit=1&seed_genres=${genreString}`, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });

                    if (recommendationsResponse.data.tracks.length > 0) {
                        const track = recommendationsResponse.data.tracks[0];
                        setFeaturedTrack(track);
                        setPreviewURL(track.preview_url); // Set the preview URL
                        return;
                    }
                } catch (error) {
                    if (error.response && error.response.status === 429) {
                        const retryAfter = error.response.headers['retry-after'] ? parseInt(error.response.headers['retry-after'], 10) : Math.pow(2, retryCount) * 60;
                        console.error(`Rate limit exceeded, retrying in ${retryAfter} seconds.`);
                        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
                        retryCount++;
                    } else {
                        console.error('Error fetching recommendations:', error);
                        break;
                    }
                }
            }
        };

        if (user.username && accessToken) {
            axios.get(`http://localhost:8082/api/community/status/${encodeURIComponent(user.username)}`)
                .then(statusResponse => {
                    const followedCommunities = Object.keys(statusResponse.data).filter(community => statusResponse.data[community]);
                    if (followedCommunities.length > 0) {
                        fetchRecommendations(followedCommunities); 
                    }
                }).catch(error => console.error('Error fetching followed communities:', error));
        }
    }, [user.username, accessToken]);

    return (
        <div className="user">
            <div className="user-page">
                {user.isAuthenticated && (
                    <>
                        <div className="profile-section">
                            <div className="profile-image-container">
                                <img className="profile-image" src={user.profileImage || AccountLogo} alt="Profile" />
                            </div>
                            <br />
                            <div className="user-details">
                                <p><strong>Username: </strong> {user.username}</p>
                                {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}
                            </div>
                            <br />
                            <button className="edit-button" onClick={(e) => navigate("/account/edit-profile")}>Edit Profile</button>
                        </div>  
    
                        <div className="posts-container">
                            <br></br><br></br>
                            <center><h1>My Posts:</h1></center>
                            <br />
                            {posts && posts.map((post) => (
                                <PostDetails key={post._id} post={post} />
                            ))}
                        </div>
    
                        <div className="song-recommendations">
                            <br></br><br></br>
                            <center><h1>Song Recommendations:</h1></center>
                            <br/>
                            <div className="featured-track-container">
                                {featuredTrack ? (
                                    <div className="track-card">
                                        <img src={featuredTrack.album.images[0].url} alt={featuredTrack.name} className="track-image" />
                                        <div className="track-info">
                                            <p className="track-title">{featuredTrack.name}</p>
                                            <p className="track-artist">{featuredTrack.artists.map(artist => artist.name).join(', ')}</p>
                                            <br />
                                            {previewURL && (
                                                <audio controls src={previewURL}>
                                                    Your browser does not support the audio element.
                                                </audio>
                                            )}
                                            <br /><br />
                                            <a href={featuredTrack.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="spotify-play-button">Listen on Spotify</a>
                                        </div>
                                        
                                    </div>
                                ) : (
                                    <center><h5>To have songs recommended, follow a community!</h5></center>
                                )}
                                <br/>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
    
    
};

export default Profile;