import React, { useState } from "react";
import "../css/App.css";
import "../css/PostDetails.css";

const PostDetails = ({ post }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const username = 'testname'; // Ideally, this should be passed as a prop or fetched from a user's session

    const handleNewCommentSubmit = (e) => {
        e.preventDefault();

        if (!newComment.trim()) return; // Prevent submitting empty comments

        const newComments = [...comments, { text: newComment, user: username }];
        setComments(newComments);
        setNewComment('');

        // Here you would typically also send `newComments` to your backend
    };

    // Created function to format date better in the post
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
    };

    return (
        <div className="post-details-container">
            <div className="post-details">
                <h4>Email: {post.email}</h4>
                <h4>Title: {post.title}</h4>
                <h4>Artist: {post.artist}</h4>
                <h4> {post.image}</h4>
                <img
                    src={post.imageData}
                    className="post-card-image"
                    style={{ width: "500px", height: "500px" }}
                    alt="Post Image"
                />
                <h4>Caption: {post.caption}</h4>
                <h4>Personal Rating: {post.rating}</h4>
                <h4>Date & Time Posted: {formatDate(post.createdAt)}</h4>

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