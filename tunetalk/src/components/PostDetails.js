import "../css/App.css"; // NOTE: put 2 . ("..") since this file is in it's own folder too. 
import "../css/PostDetails.css";
import { handleCommentSubmit } from "../pages/Post";
import React, { useEffect, useState } from "react";
import { useUser } from "../authentication/UserState";

const PostDetails = ({post}) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [user] = useUser();

    const handleCommentSubmit = (e) => {

        e.preventDefault(); 

        const commentData = {
          text: newComment,
          user: user.username
        };

       
    };
    
    return (
        
        <div className="post-details">


            
            {/* <h4>Username: {post.postusername}</h4> */}
            <h4>Username: {post.postusername}</h4>
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
            <form onSubmit={(e) => handleCommentSubmit(e, user.username, newComment, setComments, setNewComment)}>
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
    )
}

export default PostDetails