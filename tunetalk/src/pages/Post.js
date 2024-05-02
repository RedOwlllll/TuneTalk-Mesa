import React, { useEffect, useState } from "react";
import axios from 'axios';
import "../css/App.css"; // NOTE: put 2 . ("..") since this file is in it's own folder too. 
import "../css/Post.css";
import StarRating from "./StarRating";

function Post() {

    //spotify api credentials and endpoints
    // const CLIENT_ID = "82051e28a62540019c2de5c903d8bca1"
    // const REDIRECT_URI = "http://localhost:3000/home"
    // const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    // const RESPONSE_TYPE = "token"
    // const SCOPES = "user-read-recently-played";

    //state hooks to store the token and recent song info
    // const [token, setToken] = useState("");
    const [recentTrack, setRecentTrack] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [caption, setCaption] = useState('');
    const [captionPosted, setCaptionPosted] = useState(false);

    const token = localStorage.getItem("access_token");
    const username = localStorage.getItem("userlogin");

    //console.log(token, username);

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
        }).then(response => {
                const track = response.data.items[0].track; //extract track info from the response
    
                //axios.get('http://localhost:8082/api/caption/${track.id}')
                //update the recentTrack state with the track details
                setRecentTrack({
                    artist: track.artists.map(artist => artist.name).join(', '), //join multiple artists the a comma
                    title: track.name, //title 
                    albumCover: track.album.images[0].url, // URL of album image
                    caption: caption
                });
 
                //prepare song to be saved
                const songData = {
                    title: track.name,
                    artist: track.artists.map(artist => artist.name).join(', '),
                    albumCover: track.album.images[0].url,                    
                    comments: [],
                    rating: StarRating,
                    caption: caption,
                }
                
                saveTrackToDatabase(username, songData);

            }).catch(error => {
                console.log('Error fetching recent track:', error); //log any errors during the call
            });
    };

    const saveTrackToDatabase = (username, songData) => {
        console.log(songData);
        axios.post(`http://localhost:8082/api/user/${username}/addPost`, songData)
            .then(response => {
                console.log('Song post saved:', response.data);
                localStorage.setItem("postId", response.data._id);
            })
            .catch(error => {
                console.error('Error saving the song post:', error.response.data);
            });
    };

    const handleCommentSubmit = (e) => {

        e.preventDefault(); 

        const commentData = {
            text: newComment,
            user: username
        };
    };

    //Sends a POST request to the backend with the caption data
    const saveCaptionToDatabase = async (username, captionText) => {
        if(!captionText) return;

        try {
            const response = await axios.post(`http://localhost:8082/api/${username}/save-caption`, { caption: captionText });
            console.log('Caption saved:', response.data);
        } catch (error) {
            console.error('Error saving the caption:', error.message);
        }
    };

    //Function to handle "Enter" key in caption input
    const handleCaptionKeyPress = async (e) => {
        if(e.key === 'Enter')
        {
            e.preventDefault();
            postCaption();
            await saveCaptionToDatabase(username, caption);
        }
    }

    //Function to save the caption
    const postCaption = () => {
        console.log('Caption is posted: "', caption, '"');
        setCaptionPosted(true);
    }

    //Caption input field
    const captionInput = (
        <input
            type="text"
            className="caption-input"
            placeholder="Add a caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            onKeyDown={handleCaptionKeyPress}
        />
    )

    //JSX for caption display
    const displayCaption = (
        <div className="caption-display">
            <p>{caption}</p>
        </div>
    )

    //Depending on the captionPosted status, render the caption display or the caption input
    const captionRender = () => {
        return captionPosted ? displayCaption : captionInput;
    }


    // component render
    return (
        <div className="home-page">
            {/* {!token ?
                <a href={getLoginURL()}>Login to Spotify</a>
                : <button onClick={logout}>Logout</button>} */}

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
                        {/* Render the caption input */}
                        {captionRender()}
                        {/* Render existing comments */}
                        <div className="comments-container">
                        {comments.map((c) => (
                            <div key={c.id} className="comment">
                                <p>{c.body}</p>
                                <small>{new Date(c.date).toLocaleString()}</small>
                            </div>
                        ))}
                        </div>
                        {/* Comment form */}
                        <form onSubmit={handleCommentSubmit}>
                            <input
                                type="text"
                                className="comment-input"
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
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