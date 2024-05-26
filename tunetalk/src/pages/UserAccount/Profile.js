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
    const [user] = useUser();
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
                        {posts && posts.map((post) => (
                            <PostDetails key={post._id} post={post} />
                        ))}
                    </div>
                </>
                )}
            </div>
        </div>  
    );
};