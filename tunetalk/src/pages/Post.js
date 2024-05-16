import React, { useEffect, useState } from "react";
import axios from 'axios';
import "../css/App.css"; // NOTE: put 2 . ("..") since this file is in it's own folder too. 
import "../css/Post.css";
import StarRating from "./StarRating";

export const handleCommentSubmit = (e, username, newComment, setComments, setNewComment) => {

    console.log("testers for the comment section")
    e.preventDefault(); 

    const commentData = {
        text: newComment,
        user: username
    };

};


function Post() {

    const [recentTrack, setRecentTrack] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    
    const token = localStorage.getItem("access_token");
    const username = localStorage.getItem("userlogin");

    console.log(username);
  

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
    
                //update the recentTrack state with the track details
                setRecentTrack({
                    artist: track.artists.map(artist => artist.name).join(', '), //join multiple artists the a comma
                    title: track.name, //title 
                    albumCover: track.album.images[0].url // URL of album image
                });
 
                //prepare song to be saved
                const songData = {
                    title: track.name,
                    artist: track.artists.map(artist => artist.name).join(', '),
                    albumCover: track.album.images[0].url,                    
                    comments: [],
                    rating: StarRating,
                }
                
                saveTrackToDatabase(username, songData);

            }).catch(error => {
                console.log('Error fetching recent track:', error); //log any errors during the call
            });
    };

    const saveTrackToDatabase = (username, songData) => {
        console.log(songData);
        axios.post(`http://localhost:8082/api/user/${username}/addPost`, songData )
          .then(response => {
            console.log('Song post saved:', response.data);
          })
          .catch(error => {
            console.error('Error saving the song post:', error.response.data);
          });
        };

    

       

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

