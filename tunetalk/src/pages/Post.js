import React, { useEffect, useState } from "react";
import axios from 'axios';
import "../css/App.css"; // NOTE: put 2 . ("..") since this file is in it's own folder too. 
import StarRating from "./StarRating";

function Post() {

    //spotify api credentials and endpoints
    const CLIENT_ID = "8e2f1c8ec6e14de3b5117923af68adf7"
    const REDIRECT_URI = "http://localhost:3000/login"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const SCOPES = "user-read-recently-played";

    //state hooks to store the token and recent song info
    const [token, setToken] = useState("")
    const [recentTrack, setRecentTrack] = useState(null)
    const [comment, setComment] = useState('');

    const userId = '6629d5a24bc4cc737042dca8';
    //hook to process the authentication token after login
    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token");

        //if no token in storage and there is a hash code, then store it
        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
            window.location.hash = "";
            window.localStorage.setItem("token", token);
        }

        setToken(token); //updates the token
    }, []);

    // function to handle the user logout
    const logout = () => {
        setToken(""); // Clear the token from state
        setRecentTrack(null); // Clear the recent track from state
        window.localStorage.removeItem("token"); // Remove the token from localStorage
    };

    // function to construct the spotify login url
    const getLoginURL = () => {
        return `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(SCOPES)}&show_dialog=true`;
    }

    const getRecentTrack = () => {
        if (!token) {
            console.log('No token available'); //log an error if no token is available
            return;
        }

        //make a get request to the spotify api
        axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
            headers: {
                'Authorization': `Bearer ${token}` // set the autherization header with the token
            }
        })
            .then(response => {
                const track = response.data.items[0].track; //extract track info from the response
                //update the recentTrack state with the track details
                setRecentTrack({
                    artist: track.artists.map(artist => artist.name).join(', '), //join multiple artists the a comma
                    title: track.name, //title 
                    albumCover: track.album.images[0].url // URL of album image
                });
 
                //prepare song to be saved
                const songData = {
                    userId: userId,
                    song:{
                        title: track.name,
                        artist: track.artists.map(artist => artist.name).join(', '),
                        albumCover: track.album.images[0].url,
                    },
                    comments: [],
                    rating: StarRating,
                }

                saveTrackToDatabase(songData);
            })
            .catch(error => {
                console.log('Error fetching recent track:', error); //log any errors during the call
            });
    };

    const saveTrackToDatabase = (songData) => {
        axios.post("http://localhost:8082/api/songposts/", songData)
        .then(response => {
            console.log('Song post saved:', response.data);
        })
        .catch(error => {
            console.error('Error saving the song post: ', error.response.data);
        })
    }

    const handleCommentSubmit = (e) => {
        e.preventDefault(); 


        console.log(comment);

        setComment(''); // Clear the comment input after submission
    };

    //component render
    return (
        <div className="home-page">
            {!token ?
                <a href={getLoginURL()}>Login to Spotify</a>
                : <button onClick={logout}>Logout</button>}

            <div className="button-container">
                <div className="button-box">
                    <button onClick={getRecentTrack}>Show Last Played Song</button>
                </div>
            </div>

            {/* Display the recent track information */}
            {recentTrack && (
                <div className="post-card">
                    <div className="post-card-content">
                        <h2 className="song-title">{recentTrack.title}</h2>
                        <h3 className="artist-name">{recentTrack.artist}</h3>
                    </div>
                    <div className="post-card-image-container">
                        <img src={recentTrack.albumCover} alt={`${recentTrack.title} Album Cover`} className="post-card-image" />
                        <StarRating onRating={(rate) => console.log(rate)} />
                    </div>
                    <div className="post-card-content">
                        {/* Comment form */}
                        <form onSubmit={handleCommentSubmit}>
                            <input
                                type="text"
                                className="comment-input"
                                placeholder="Add a comment..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <button type="submit" className="submit-comment">Post</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Post;