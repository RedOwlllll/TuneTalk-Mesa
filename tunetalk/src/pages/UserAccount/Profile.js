import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../authentication/UserState";
import AccountLogo from "../../assets/AccountLogo.svg"
import "../../css/App.css"; 
import "../../css/Profile.css"; 
import { useEffect } from "react";
import { useState } from "react";
import PostDetails from "../../components/PostDetails";

export const Profile = () => {
    const [user, setUser] = useUser();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/posts/getuserpost?username=${user.username}`);
            const json = await response.json();
            if (response.ok) {
                setPosts(json);
            }
        }
        if (user.isAuthenticated) {
            fetchPosts();
        }
    }, [user]);
    
    

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
                    </>
                    )}
            </div>
        </div>  
    );
};