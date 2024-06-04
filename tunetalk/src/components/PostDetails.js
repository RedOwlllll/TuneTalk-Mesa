import React, { useEffect, useState, useRef } from "react";
import "../css/App.css";
import "../css/PostDetails.css";
import axios from "axios";
import { useUser } from "../authentication/UserState";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown, faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';


const PostDetails = ({post}) => {

    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [user] = useUser(); 
    const [isVisible, setIsVisible] = useState(false);
    const [comments, setComments] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const toggleVisibility = () => setIsVisible(!isVisible); // Collapse comment box


    const handleRating = (rate) => {
        setRating(rate);

        // Update class for each star
        const stars = document.querySelectorAll('.rating i');
        stars.forEach((star, idx) => {
          if (idx < rate) {
            star.classList.remove('far');
            star.classList.add('fas');
          } else {
            star.classList.remove('fas');
            star.classList.add('far');
          }
        });
      };


      useEffect(() => {
        if (post._id) {
            fetchComments(post._id);
        }
    }, [post._id]);
    

    const fetchComments = async (postId) => {
        try {
            const response = await axios.get(`http://localhost:8082/api/postsongs/comments/${encodeURIComponent(postId)}`);
            setComments(response.data.comments);
            console.log("comments fetched")
            console.log(response.data.comments);
            console.log(comments)
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };
    
      

    const handleSubmit = async (e) => {
        //e.preventDefault();
        if (!user) {
            alert('You must be logged in to post comments.');
            return;
        }
        try {
            

            console.log(comment)
            console.log("chan")
            const commentData = {
                postId: post._id,  
                commentusername: user.username,
                commentbody: comment,
                commentrating: rating
            };
            const response = await axios.post('http://localhost:8082/api/postsongs/comment', commentData);
            console.log('Comment added:', response.data);
            console.log(commentData)
            setComment('');
            setRating(1);
        } catch (error) {
            console.error('Failed to post comment:', error);
        }
    };
    
    function StarRating({ rating }) {
        const totalStars = 5;
        let stars = [];

        // Create filled stars up to the rating
        for (let i = 1; i <= totalStars; i++) {
            if (i <= rating) {
            stars.push(<i key={i} className="fas fa-star" style={{ color: '#ffc107' }}></i>);
            } else if (i > rating && i - 1 < rating) {
            stars.push(<i key={i} className="fas fa-star-half-alt" style={{ color: '#ffc107' }}></i>);
            } else {
            stars.push(<i key={i} className="far fa-star" style={{ color: '#ffc107' }}></i>);
            }
        }
        return <div>{stars}</div>;
      }

    
    
    const [newComment, setNewComment] = useState('');
    
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

    return (
        <div className="featured-track-container">
            <h2>{post.postusername}</h2>
                
                
                <div className="track-card">
                    <img
                        src={post.imageData}
                        className="track-image"
                        alt="Post Image"
                    />
                    <div className="track-info">
                        <div className="track-title">{post.title}</div>
                        <div className="track-artist">{post.artist}</div>
                        <div>
                            <div className="Audio-feed">
                            {post.previewURL && (
                                <audio controls src={post.previewURL}>
                                    Your browser does not support the audio element.
                                </audio>
                            )}
                            </div>
                            {/* Implement graphical star display soon  */}
                            
                            {post.spotifyURL && (
                                <a href={post.spotifyURL || "#"} target="_blank" rel="noopener noreferrer" className="spotify-play-button">
                                    Listen on Spotify
                                </a>
                            )}
                        </div>
                    </div>
                </div>
                <h4 className="community-h4">{post.postusername}: {post.caption}</h4>
                <div className = "star-feed"><StarRating rating={post.rating} /></div>
                <h5>{formatDate(post.createdAt)}</h5>  
                {/* Comment form */}


                <form onSubmit={handleSubmit}>
          <input class="post-comment-input" type = "text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write a comment..." required />
          
          <button class="post-comment-btn" type="submit">Post Comment</button>
        </form>


                <br />
                <div className="post-comments-container">
                    <div className="toggleText" onClick={toggleVisibility} style={{ cursor: 'pointer' }}>
                        <strong>{comment.commentusername}</strong> <h5>{isVisible ? 'Hide' : 'Show'} comments <FontAwesomeIcon icon={faChevronCircleDown} className={`icon ${isVisible ? 'up' : 'down'}`} /></h5>
                    </div>
                    <div className={`collapsible-content ${isVisible ? 'open' : ''}`}>
                        {isVisible && (
                            <div>
                                {comments.map((comment, index) => (
                                    <div key={index} className="comment">
                                        <p><strong>{comment.commentusername}</strong> : <span>{comment.commentbody}</span></p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
        </div>
    );
}

export default PostDetails;
