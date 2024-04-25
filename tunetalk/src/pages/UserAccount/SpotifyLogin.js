import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import { useNavigate } from "react-router-dom";

const SPOTIFY_AUTH = "https://accounts.spotify.com/authorize";
const REDIRECT_URI = "http://localhost:3000/home";
const CLIENT_ID = "82051e28a62540019c2de5c903d8bca1";

const spotifyScopes = [
    'user-read-recently-played',
    'user-read-email',
    'user-read-private'
];
const SCOPES_URL_PARAM = spotifyScopes.join("%20");

export const getTokenAfterAuth = () => {
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
    const navigate = useNavigate();
  
    const handleLogin = () => {
        window.location = `${SPOTIFY_AUTH}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
    }; 
    
    useEffect(() => {
        console.log("inside useEffect");
        const getUserSpotifyInfo = async () => {
            console.log("After getUserSpotifyInfo");
            if (window.location.hash) {
                const { access_token } = getTokenAfterAuth(window.location.hash);
                localStorage.setItem("accessToken", access_token);
                console.log(access_token);
                window.location.hash = ""; // REMOVES ACCESS TOKEN FROM URL ONCE SIGN IN IS AUTHENTICATED.
                
                try {
                    // Fetch user information from Spotify
                    const userInfoResponse = await axios.get("https://api.spotify.com/v1/me", {
                        headers: {
                            Authorization: "Bearer " + access_token,
                            "Content-Type": "application/json",
                        },
                    });
                    const userInfo = userInfoResponse.data;
                    
                    // Process user information
                    const spotifyUserInfo = {
                        userId: userInfo.id,
                        userUrl: userInfo.external_urls.spotify,
                        name: userInfo.display_name,
                    };
                    console.log(spotifyUserInfo);

                    // Update user state
                    setUser({
                        isAuthenticated: true,
                        spotifyAccount: spotifyUserInfo,
                    });

                    if (user.isAuthenticated) {
                        navigate("/home");
                    }

                } catch (error) {
                    console.error('Error connecting to Spotify:', error.message);
                    setAlertMessage("Failed to connect to Spotify");
                }
            }
        };
        getUserSpotifyInfo();
    });




  
    return (
        <div className="spotify-login-container">
            <h3>Nearly there! <br/> You need to connect your Spotify Account with TuneTalk</h3>

            <br></br>
            <br/><button type = "submit" onClick={handleLogin}>Login to your Spotify Account</button><br/><br/>
            {alertMessage && <p>{alertMessage}</p>}
        </div>
    );
};