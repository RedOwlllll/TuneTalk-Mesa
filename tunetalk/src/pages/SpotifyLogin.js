import { useEffect } from "react";
import { useUser } from "../UserState";
import { useNavigate } from "react-router-dom";

const CLIENT_ID = "82051e28a62540019c2de5c903d8bca1"; // Client ID where
const SPOTIFY_AUTH = "https://accounts.spotify.com/authorize"; // Base url where we make the authorization request to spottify
const REDIRECT_URI = "http://localhost:3000/home"; // url after login successful
const SPACE_ENCODE = "%20"; // %20 represents a space in urls
/*
    Spotify scope array that allows us to get all neccesary data from the user's spotify acc
    Link to definitions of scopes: https://developer.spotify.com/documentation/web-api/concepts/scopes
    (note: using all scopes except the soa ones as it would end up as an illegal scope).
*/  
const spotifyScopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'app-remote-control',
    'streaming', 
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-private',
    'playlist-modify-public',
    'user-follow-modify',
    'user-follow-read',
    'user-read-playback-position',
    'user-top-read',
    'user-read-recently-played',
    'user-library-modify',
    'user-library-read',
    'user-read-email',
    'user-read-private',
];
const SCOPES_URL_PARAM = spotifyScopes.join(SPACE_ENCODE); // Joining all the scopes together by using the SPACE_ENCODE variable that performs percent coding and represents the space in the url.  

export const SpotifyLogin = () => {
    const navigate = useNavigate();
    const userContext = useUser();
    const [user] = userContext;

    const handleSpotifyLogin = (e) => {
        e.preventDefault();
        window.location.href = `${SPOTIFY_AUTH}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialogue=true`;
    };

    useEffect(() => {
        const handleLoginRedirect = () => {
            if (window.location.hash && user.isAuthenticated) {
                const { access_token, expires_in, token_type } = getTokenAfterAuth(window.location.hash);
                localStorage.clear();
                localStorage.setItem("accessToken", access_token);
                localStorage.setItem("tokenType", token_type);
                localStorage.setItem("expiresIn", expires_in);

                // Fetch user data from Spotify after authentication
                fetchSpotifyUserData(access_token);
                console.log("test");
            }
        };

        handleLoginRedirect();

        return () => {
            window.removeEventListener("hashchange", handleLoginRedirect);
        };
    });

    const getTokenAfterAuth = (hash) => {
        const stringAfterHashtag = hash.substring(1);
        const paramsInUrl = stringAfterHashtag.split("&").reduce((accumulater, currentValue) => {
            const [key, value] = currentValue.split("=");
            accumulater[key] = value;
            return accumulater;
        }, {});
        return paramsInUrl;
    };

    const fetchSpotifyUserData = (accessToken) => {
        fetch('https://api.spotify.com/v1/me', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        })
        .then(response => response.json())
        .then(data => {
            const userData = {
                spotifyId: data.id,
                email: data.email,
                displayName: data.display_name,
                profileUrl: data.external_urls.spotify
            };

            // Send user data to your backend API
            saveUserDataToBackend(userData);
            console.log("user signed in");
        })
        .catch(error => console.error('Error fetching Spotify data:', error));
    };

    const saveUserDataToBackend = (userData) => {
        fetch('http://localhost:8082/api/users', {
            method: "POST",
            crossDomain: true, 
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                userData
            }),
        })

        .then(response => response.json())
        .then(savedUser => {
            console.log('User saved:', savedUser);
            navigate('/home');
        })
        .catch(error => console.error('Error saving user:', error));
    };

    return (
        <form className="spotify-login" onSubmit={handleSpotifyLogin}>
            <button type="submit">Login to Spotify </button>
        </form>
    );
};