import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SPOTIFY_AUTH = "https://accounts.spotify.com/authorize";
//const REDIRECT_URI = "http://localhost:3000/home";
const REDIRECT_URI = "http://localhost:3000/account/spotify"; // Needed to change the uri to this as there was issues with redirecting to the home page right after spotify user is authenticated
const CLIENT_ID = "82051e28a62540019c2de5c903d8bca1";

/*
    Spotify scope array that allows us to get all neccesary data from the user's spotify acc
    Link to definitions of scopes: https://developer.spotify.com/documentation/web-api/concepts/scopes
*/
const spotifyScopes = [
    'user-read-recently-played',
    'user-read-email',
    'user-read-private'
];
const SCOPES_URL_PARAM = spotifyScopes.join("%20"); // Joining all the scopes together by using the SPACE_ENCODE variable that performs percent coding and represents the space in the url.  
 
// Function that returns the access token generated once user's spotify account is authenticated 
const getTokenAfterAuth = () => {
    return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
};

export const SpotifyLogin = () => {
    const [alertMessage, setAlertMessage] = useState("");
    const [user, setUser] = useState({ isAuthenticated: false, spotifyAccount: '' });
    const [userInfo, setUserInfo] = useState(null); // State variable to save user's spotify info
    const navigate = useNavigate();

    // Function that will display the page that asks the user to connect to their spotify acc for our application
    const handleLogin = async () => {
        window.location = `${SPOTIFY_AUTH}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
    };

    useEffect(() => {
        console.log("inside useEffect");
    
        const getUserSpotifyInfo = async () => {
            console.log("After getUserSpotifyInfo");
    
            // Check if there's a hash in the URL - no hash, that means access token was not generated
            if (window.location.hash !== "") {
                const { access_token } = getTokenAfterAuth(window.location.hash);
                localStorage.setItem("access_token", access_token);
                console.log(access_token);
                window.location.hash = ""; // REMOVES ACCESS TOKEN FROM URL ONCE SIGN IN IS AUTHENTICATED.
    
                try {
                    // Fetch user information from Spotify using api below
                    const userInfoResponse = await axios.get("https://api.spotify.com/v1/me", {
                        headers: {
                            Authorization: "Bearer " + access_token,
                            "Content-Type": "application/json",
                        },
                    });

                    const userInfo = userInfoResponse.data; // Needed to define 
                    
                    // Fetch spotify accounts details (can also check in console).
                    const spotifyUserInfo = {
                        userId: userInfo.id,
                        userUrl: userInfo.external_urls.spotify,
                        username: userInfo.display_name,
                        email: userInfo.email,
                    };
                    console.log(spotifyUserInfo);
                    setUserInfo(spotifyUserInfo);
                    setAlertMessage("Spotify account connected!");
    
                    // Update user state
                    setUser({
                        isAuthenticated: true,
                        spotifyAccount: spotifyUserInfo.username, // Should save the user's Spotify username to the users state now. 
                    });
                } catch (error) {
                    console.error("Error connecting to Spotify:", error.message);
                    setAlertMessage("Failed to connect to Spotify");
                }
            } else {
                console.log("Hash / access token not found");
            }
        };
        getUserSpotifyInfo();
    }, []); // Allows useEffect hook to render only once. 

    useEffect(() => {
        // Navigate back to account/spotify page, which should display users spotify details and then allow them to navigate to the home page (through the button)
        if (user.isAuthenticated) {
            navigate("/account/spotify");
        }
    }, [user.isAuthenticated, navigate]);

    return (
        <div className="spotify-login-container">
            {!user.isAuthenticated ? (
                // Show the login button and header only if the user is not authenticated / hasn't gone through the window.location link yet
                <>
                    <h3>Nearly there! <br/> You need to connect your Spotify Account with TuneTalk</h3>
                    <br/>
                    <button type="submit" onClick={handleLogin}>Login to your Spotify Account</button>
                    <br/><br/>
                </>
            ) : (
                // when User's spotify is authenticated, show alert message and Spotify user info
                <>
                    {alertMessage && <h3>{alertMessage}</h3>}
                        {userInfo && (
                            <div>
                                <br/><br/>
                                <h4>Spotify Details:</h4>
                                <p><b>User ID:</b> {userInfo.userId}</p>
                                <p><b>Username:</b> {userInfo.username}</p>
                                <p><b>Email:</b> {userInfo.email}</p>
                                <br/><br/><br/>
                            <button type="submit" onClick={() => navigate('/home')}>Go to your Home Page!</button>
                        </div> 
                    )}
                </>
            )}
        </div>
    );
};