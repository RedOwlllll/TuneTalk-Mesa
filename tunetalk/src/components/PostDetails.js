import "../css/App.css"; // NOTE: put 2 . ("..") since this file is in it's own folder too. 
import "../css/PostDetails.css";
import { handleCommentSubmit } from "../pages/Post";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../authentication/UserState";


const PostDetails = ({post}) => {
    // const [newComment, setNewComment] = useState('');
    // const [comments, setComments] = useState([]);
    // const username = 'testname'
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [user] = useUser(); 

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

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('You must be logged in to post comments.');
            return;
        }
        try {
            const commentData = {
                postId: post._id,  // Ensure this is the MongoDB _id of the post
                username: user.username,
                comment: comment, // This should be the text of the new comment
            };
    
            const response = await axios.post('http://localhost:8082/api/posts/comment', commentData);
            console.log('Comment added:', response.data);
            setComment('');
        } catch (error) {
            console.error('Failed to post comment:', error);
        }
    };
    

    // const handleSubmit = async (e) => {
    // e.preventDefault();
    // if (!user) {
    //     alert('You must be logged in to post comments.');
    //     return;
    // }
    // try {
    //     const response = await axios.post('http://localhost:8082/api/postsongs/comment', {
    //     //spotifyUrl: featuredTrack.external_urls.spotify,
    //     postId: post._id,
    //     username: user.username,
    //     comment: post.comments,
        
    //     });
    //     console.log('Comment added:', response.data);
    //     setComment('');
    //     setRating(1);
    // } catch (error) {
    //     console.error('Failed to post comment:', error);
    // }
    // };
    
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
          <input class="community-input" type = "text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write a comment..." required />
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
          <button class="community-btn" type="submit">Post Comment and Rating</button>
        </form>

        
                    </div>
                )
            }

export default PostDetails