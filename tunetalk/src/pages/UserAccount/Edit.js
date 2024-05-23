import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../authentication/UserState";
import axios from "axios"; 
import AccountLogo from "../../assets/AccountLogo.svg"
import "../../css/App.css"; 
import "../../css/Profile.css"; 


export const Edit = () => {
    const [user, setUser] = useUser();
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [bio, setBio] = useState(user.bio);
    const [newProfileImage, setNewProfileImage] = useState(user.profileImage || AccountLogo);
    const [newProfileFile, setNewProfileFile] = useState(null);
    const [alertMessage, setAlertMessage] = useState("");
    const navigate = useNavigate();

    const handleProfileImageChange = (event) => {
        const file = event.target.files[0];
        setNewProfileFile(file);
        setNewProfileImage(URL.createObjectURL(file));
    };

    const handleSave = async () => {
        try {
            if (!username.trim() || !email.trim()) {
                setAlertMessage("Name and email cannot be empty");
                return; // Don't proceed with saving if required fields are empty
            }

            // Check if the new username is different from the current and if its already taken
            if (username !== user.username) {
                const usernameInput = await axios.get(`http://localhost:8082/api/userprofile/username-availability/${username}`);
                if (!usernameInput.data.isAvailable) {
                    setAlertMessage("This username is already in use by another account. Try a different one.")
                    return; // Stop the update if the email is not available
                }
            }
            
            // Check if the new email is different from the current and if its already taken
            if (email !== user.email) {
                const emailInput = await axios.get(`http://localhost:8082/api/userprofile/email-availability/${email}`);
                if (!emailInput.data.isAvailable) {
                    setAlertMessage("This email is already in use by another account. Try a different one.");
                    return; // Stop the update if the email is not available
                }
            }
    
            const formData = new FormData();
            formData.append("username", username);
            formData.append("email", email);
            formData.append("bio", bio);
    
            if (newProfileFile) {
                formData.append("profileImage", newProfileFile);
            } else if (newProfileImage === "") {
                formData.append("profileImage", ""); // Sending empty string to indicate removal
            }
    
            axios.put("http://localhost:8082/api/userprofile/edit-profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(res => {
                const data = res.data;
                console.log(data);
                if (data.status === "ok") {
                    setAlertMessage("Profile updated successfully!");
                    console.log("Profile update successful!");
                    setUser({
                        ...user,
                        username: data.user.username,
                        email: data.user.email,
                        bio: data.user.bio,
                        profileImage: data.user.profileImage || AccountLogo
                    });
                    navigate("/account/profile");
                }
            }).catch(error => {
                console.error("Error updating profile:", error);
                setAlertMessage("Failed to update profile. Please check your internet connection or try again later.");
            });
        } catch (error) {
            console.error("Error checking email availability:", error);
            setAlertMessage("Error during validation. Please try again later.");
        }
    };

    return (
        <div className="edit-profile-page">
            <br/>
            <h1>Edit Profile</h1>
            <div className="profile-image-section">
                <div className="profile-image-container">
                    {/* Set profile image to Account Logo if user doesnt add new profile image*/}
                    <img className="profile-image" src={newProfileImage} alt="Profile" />
                </div>
                <div className="profile-image-change">
                <label htmlFor="profileImageInput" className="change-button" >Change photo</label>
                <input 
                    type="file"
                    id="profileImageInput"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleProfileImageChange} // Only handles adding new photos
                />
                </div>
            </div>
            
            <div className="form-section">
                <div className="form-group">
                    <label htmlFor="firstName">Username:</label>
                    <textarea value={username} onChange={(e) => setUsername(e.target.value)}
                        id="username"
                        className="edit-textarea"
                        placeholder="Enter your username"
                    />
                    <br></br>
                    <label htmlFor="email">Email:</label>
                    <textarea value={email} onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        className="edit-textarea"
                        placeholder="Enter your email"
                    />
                    <br></br>
                    <label htmlFor="bio">Bio:</label>
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)}
                        id="bio"
                        className="edit-textarea"
                        placeholder="Enter your bio"
                    />

                    <br></br>
                    {alertMessage && (
                        <div className="alert">{ alertMessage }</div>
                    )} <br/>
                </div>
                <center><button onClick={handleSave}>Save Changes</button></center><br></br>
            </div>
        </div>
    );
};