import React, { useState } from "react";
import "../css/App.css";
import "../css/PostDetails.css";
import { useUser } from "../authentication/UserState";


const PostDetails = ({ post }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [user] = useUser();

    const handleNewCommentSubmit = (e) => {
        e.preventDefault();

        if (!newComment.trim()) return; // Prevent submitting empty comments

        const newComments = [...comments, { text: newComment, user: user.username }];
        setComments(newComments);
        setNewComment('');
    };

    // Created function to format date better in the post
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
    };

    function StarRating({ rating }) {
        const totalStars = 5;
        let stars = [];
    
        // Create filled stars up to the rating
        for (let i = 1; i <= totalStars; i++) {
          if (i <= rating) {
            stars.push(<i key={i} className="fas fa-star" style={{ color: '#ffc107' }}></i>);
          } else if (i > rating && i - 1 < rating) {
            // Handle half star for fractions
            stars.push(<i key={i} className="fas fa-star-half-alt" style={{ color: '#ffc107' }}></i>);
          } else {
            stars.push(<i key={i} className="far fa-star" style={{ color: '#ffc107' }}></i>);
          }
        }
    
        return <div>{stars}</div>;
    }

    return (
        <div className="post-details-container">
            <div className="post-details">
                <div className="username-detail"><h2>{post.postusername}</h2></div>
                <div className="post-track">
                    
                    <h4> {post.image}</h4>
                    <img
                        src={post.imageData}
                        className="feed-card-image"
                        style={{ width: "300px", height: "300px" }}
                        alt="Post Image"
                    />
                    <div className="track-details">
                        <div className="track-title">{post.title}</div>
                        <div className="track-artist">{post.artist}</div>
                    </div>
                </div>
                <div className="caption-rating-box">
                    <h4>{post.caption}</h4>
                    <div className="post-stars"><StarRating rating={post.rating} /></div>
                </div>
                <h5>{formatDate(post.createdAt)}</h5>

                {/* Comment form */}
                <form onSubmit={handleNewCommentSubmit}>
                    <input
                        type="text"
                        className="comment-input"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button type="submit" className="submit-comment">Comment</button>
                </form>
            </div>
        </div>
    );
}

export default PostDetails;