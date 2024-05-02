import React, { useEffect, useState } from "react";
import "../css/App.css"; // NOTE: put 2 . ("..") since this file is in it's own folder too. 
import "../css/Post.css"; // NOTE: put 2 . ("..") since this file is in it's own folder too. 
import "../components/PostDetails";

import PostDetails from "../components/PostDetails";
import PostForm from "../components/PostForm";
import UserPost from "./UserPost";

export const Feed = () => {

    const [posts, setPosts] = useState(null)

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/posts/')
            const json = await response.json()

            if (response.ok) {
                setPosts(json)
            }
        }
    fetchPosts()


    }, []);

    return (
        <div className="feed-page">
            <h1>Feed</h1>

            <div className="song-display-form">
                <UserPost />

            </div>

            <div className="post-form">
                {/* <PostForm /> */}

            </div>
            

            <div className="posts">
                {posts && posts.map((post) => (
                    <PostDetails key={post._id} post={post} />
            
                ))}
            </div>
        </div>
        
    );
}