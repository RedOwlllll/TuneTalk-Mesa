// import React, { useState } from "react";
// import "../css/App.css";
// import "../css/PostDetails.css";
// import { useUser } from "../authentication/UserState";

// const PostDetails = ({ post }) => {
//     const [comments, setComments] = useState([]);
//     const [newComment, setNewComment] = useState('');
//     const [user] = useUser();

//     const handleNewCommentSubmit = (e) => {
//         e.preventDefault();

//         if (!newComment.trim()) return; // Prevent submitting empty comments

//         const newComments = [...comments, { text: newComment, user: user.username }];
//         setComments(newComments);
//         setNewComment('');
//     };

//     // Created function to format date better in the post
//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
//     };

//     return (
//         <div className="post-details-container">
//             <div className="post-details">
//                 <h4>Username: {post.postusername}</h4>
//                 <h4>Email: {post.email}</h4>
//                 <h4>Title: {post.title}</h4>
//                 <h4>Artist: {post.artist}</h4>
//                 <h4> {post.image}</h4>
//                 <img
//                     src={post.imageData}
//                     className="post-card-image"
//                     style={{ width: "500px", height: "500px" }}
//                     alt="Post Image"
//                 />
//                 <h4>Caption: {post.caption}</h4>
//                 <h4>Personal Rating: {post.rating}</h4>
//                 <h4>Date & Time Posted: {formatDate(post.createdAt)}</h4>

//                 {/* Comment form */}
//                 <form onSubmit={handleNewCommentSubmit}>
//                     <input
//                         type="text"
//                         className="comment-input"
//                         placeholder="Add a comment..."
//                         value={newComment}
//                         onChange={(e) => setNewComment(e.target.value)}
//                     />
//                     <button type="submit" className="submit-comment">Post</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default PostDetails;

import React, { useState, useRef } from "react";
import "../css/App.css";
import "../css/PostDetails.css";
import { useUser } from "../authentication/UserState";

const PostDetails = ({ post }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [user] = useUser();
    const [isPlaying, setIsPlaying] = useState(false); // State to manage play status
    const audioRef = useRef(null);

    const handleNewCommentSubmit = (e) => {
        e.preventDefault();

        if (!newComment.trim()) return; // Prevent submitting empty comments

        const newComments = [...comments, { text: newComment, user: user.username }];
        setComments(newComments);
        setNewComment('');
    };

    // Function to toggle audio playback
    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Created function to format date better in the post
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
    };

    console.log("Preview URL:", post.previewURL);
    console.log("Spotify URL:", post.spotifyURL);

    return (
        <div className="post-details-container">
            <div className="post-details">
                <h4>Username: {post.postusername}</h4>
                <h4>Email: {post.email}</h4>
                <h4>Title: {post.title}</h4>
                <h4>Artist: {post.artist}</h4>
                <img
                    src={post.imageData}
                    className="post-card-image"
                    style={{ width: "500px", height: "500px" }}
                    alt="Post Image"
                />
                {post.previewURL && (
                    <audio controls src={post.previewURL}>
                        Your browser does not support the audio element.
                    </audio>
                )}
                <h4>Caption: {post.caption}</h4>
                <h4>Personal Rating: {post.rating}</h4>
                <h4>Date & Time Posted: {formatDate(post.createdAt)}</h4>
                {post.spotifyURL && (
                    <a href={post.spotifyURL || "#"} target="_blank" rel="noopener noreferrer" className="spotify-button">
                        Listen on Spotify
                    </a>

                )}
                {/* Comment form */}
                <form onSubmit={handleNewCommentSubmit}>
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
    );
}

export default PostDetails;
