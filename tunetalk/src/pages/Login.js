import React from "react";
import "../css/App.css"; // NOTE: put 2 . ("..") since this file is in it's own folder too. 
import Post from "./Post";

export const Login = () => {
    return (
        <div className="home-page">
            <h1>Login</h1> 
            <Post />
        </div>
    );
}