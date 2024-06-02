import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../authentication/UserState";
import AccountLogo from "../../assets/AccountLogo.svg"
import "../../css/App.css"; 
import "../../css/Profile.css"; 
import { useEffect } from "react";
import { useState } from "react";
import PostDetails from "../../components/PostDetails";
import axios from "axios";


const CLIENT_ID = "a8c9857ace8449f290ed14c54c878e1f";
const CLIENT_SECRET = "c747a0da53124c4ba8bc12a0e88d859b";

export const Profile = () => {
    const [user, setUser] = useUser();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [featuredTrack, setFeaturedTrack] = useState(null)
    const [accessToken, setAccessToken] = useState('');
    const genreMapping = {
        "kpop": "k-pop",
        "hiphop" : "hip-hop",
        "rnb" : "r-n-b",
        // Add more mappings as needed because spotify api is dumb
    };
    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         const response = await fetch(`/api/posts/getuserpost?username=${user.username}`);
    //         const json = await response.json();
    //         if (response.ok) {
    //             setPosts(json);
    //             setRecommendations(user.recommendations || []);
    //         }
    //     }
    //     if (user.isAuthenticated) {
    //         fetchPosts();
    //     }
    // }, [user]);
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
            try {
                const spotifyGenres = genres.map(genre => genreMapping[genre] || genre); // Use the mapped genre or default to the original
                const genreString = spotifyGenres.join(",");  // Assuming genres can be combined, adjust if needed
                const recommendationsResponse = await axios.get(`https://api.spotify.com/v1/recommendations?limit=1&seed_genres=${genreString}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                const recommendationsData = recommendationsResponse.data;
                if (recommendationsData.tracks.length > 0) {
                    setFeaturedTrack(recommendationsData.tracks[0]);  // Set the first track from recommendations as the featured track
                }
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            }
        };
    
        if (user.username && accessToken) {
            axios.get(`http://localhost:8082/api/community/status/${encodeURIComponent(user.username)}`)
                .then(statusResponse => {
                    const followedCommunities = Object.keys(statusResponse.data).filter(community => statusResponse.data[community]);
                    if (followedCommunities.length > 0) {
                        fetchRecommendations(followedCommunities);  // Fetch recommendations based on the followed communities    
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
                        <br></br>
                        <div className="user-details">
                            <p><strong>Username: </strong> {user.username}</p>
                            {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}
                        </div>
                        <br></br>
                            <button className="edit-button" onClick={(e) => navigate("/account/edit-profile")}>Edit Profile</button>
                    </div>
                    <div className="post-section">
                        <center><h1>My Posts:</h1></center><br></br>
                        {posts && posts.map((post) => (
                            <PostDetails key={post._id} post={post} />
                        ))}
                    </div>
                    <div className="song-recommendations">
                    <center><h1>Song Recommendations:</h1></center>
                    {user.recommendations && user.recommendations.length > 0 ? (
                        user.recommendations.map((track, index) => (
                            <div key={index} className="featured-track-container">
                                <div className="track-card">
                                    {track.album && track.album.images && track.album.images.length > 0 &&
                                        <img src={track.album.images[0].url} alt={track.name} className="track-image" />
                                    }
                                    <div className="track-info">
                                        <p className="track-title">{track.name}</p>
                                        {track.artists && track.artists.length > 0 &&
                                            <p className="track-artist">by {track.artists.map(artist => artist.name).join(', ')}</p>
                                        }
                                        <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="spotify-play-button">Listen on Spotify</a>
                                    </div>
                                </div>
                            </div>
                            ))
                        ) : (
                            <center><h5>To have songs recommended, follow a community!</h5></center>
                        )}
                    </div>
                    <div className="song-recommendations 2">
                        <h1>Song Recommendations 2:</h1>
                        {featuredTrack && (
                            <div className="track-card">
                                <img src={featuredTrack.album.images[0].url} alt={featuredTrack.name} className="track-image" />
                                <div className="track-info">
                                    <p className="track-title">{featuredTrack.name}</p>
                                    <p className="track-artist">{featuredTrack.artists.map(artist => artist.name).join(', ')}</p>
                                    <a href={featuredTrack.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="spotify-play-button">
                                        Listen on Spotify
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                    </>
                    )}
            </div>
        </div>  
    );
};