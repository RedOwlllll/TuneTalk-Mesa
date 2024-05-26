import "../css/App.css"; // NOTE: put 2 . ("..") since this file is in it's own folder too. 
import "../css/PostDetails.css";
import { handleCommentSubmit } from "../pages/Post";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../authentication/UserState";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



import { faChevronCircleDown, faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';


const PostDetails = ({post}) => {
    // const [newComment, setNewComment] = useState('');
    // const [comments, setComments] = useState([]);
    // const username = 'testname'
    const [commentText, setCommentText] = useState('');
    const [rating, setRating] = useState(0);
    const [user] = useUser(); 
    const [isVisible, setIsVisible] = useState(false);
    const [comments, setComments] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const toggleVisibility = () => setIsVisible(!isVisible); // Collapse comment box

    // const handleCommentSubmit = (e) => {

    //     e.preventDefault(); 

    //     const commentData = {
    //         text: newComment,
    //         user: username
    //     };

       
    // };

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
        e.preventDefault();
        if (!user) {
            alert('You must be logged in to post comments.');
            return;
        }
        try {
            //const post = {postusername,imageData,email,title,artist,rating,caption}

            console.log(commentText)
            console.log("chan")
            const commentData = {
                postId: post._id,  // Ensure this is the MongoDB _id of the post
                commentusername: user.username,
                commentbody: commentText, // This should be the text of the new comment
                commentrating: rating
            };
            const response = await axios.post('http://localhost:8082/api/postsongs/comment', commentData);
            console.log('Comment added:', response.data);
            console.log(commentData)
            setCommentText('');
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
            // Handle half star for fractions
            stars.push(<i key={i} className="fas fa-star-half-alt" style={{ color: '#ffc107' }}></i>);
          } else {
            stars.push(<i key={i} className="far fa-star" style={{ color: '#ffc107' }}></i>);
          }
        }
    
        return <div>{stars}</div>;
      }

    
    
    return (
        
        <div className="post-details">


            
            {/* <h4>Username: {post.postusername}</h4> */}
            <h4>Email: {post.email}</h4>
            <h4>Title: {post.title}</h4>
            <h4>Artist: {post.artist}</h4>
            <h4>Rating: {post.rating}</h4>
            <h4>Caption: {post.caption}</h4>
            <h4>Image: {post.image}</h4>
            
            <img
            src={post.imageData}
            className="post-card-image"
            style={{ width: "500px", height: "500px" }}
            alt="Post Image"
            />
            

            <h4>Timestamp: {post.createdAt}</h4>
            
            {/* Comment form */}
            <form onSubmit={handleSubmit}>
          <input class="post-comment-input" type = "text" value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Write a comment..." required />
          <div className="rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <label key={star}>
                  <input
                    type="radio"
                    name="rating"
                    value={star}
                    onClick={() => handleRating(star)}
                  />
                  <i className={star <= rating ? 'fas fa-star' : 'far fa-star'}></i>
                </label>
              ))}
            </div>
          <button class="post-comment-btn" type="submit">Post Comment and Rating</button>
        </form>
        
        <div className="community-comments-container">
        <div className="toggleText" onClick={toggleVisibility} style={{ cursor: 'pointer' }}>
        <strong>{commentText.username}</strong> <h5>View {isVisible ? 'less' : 'more'} comments <FontAwesomeIcon icon={isVisible ? faChevronCircleDown : faChevronCircleDown} className={`icon ${isVisible ? 'up' : 'down'}`} /></h5>
        </div>
        <div className={`collapsible-content ${isVisible ? 'open' : ''}`}>
            {isVisible && (
            <div>
                <h4>Average Rating: <StarRating rating={averageRating} /></h4>
                {comments.map((commentText, index) => (
                <div key={index} className="comment">
                    <p><strong>{commentText.username}</strong></p><StarRating rating={commentText.rating} /> : <span>{commentText.body}</span>
                </div>
                ))}
            </div>
            )}
        </div>
        </div>

     
        
        </div>
    )
    }
            

export default PostDetails