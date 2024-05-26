import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../authentication/UserState";
import AccountLogo from "../../assets/AccountLogo.svg"
import "../../css/App.css"; 
import "../../css/Profile.css"; 

export const Profile = () => {
    const [user] = useUser();
    const navigate = useNavigate();


    return (
        <div className="user">
            <div className="user-page">
                {user.isAuthenticated && (
                   
                    <div className="profile-section">
                        <div className="profile-image-container" style={{justifyContent: 'center'}}>
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
                )}
            </div>
        </div>  
    );
};