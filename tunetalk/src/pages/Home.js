import React from "react";
import "../css/App.css"; // NOTE: put 2 . ("..") since this file is in it's own folder too. 
import { CommentsLayout } from "./Comments/CommentsLayout";

export const Home = () => {
    return (
        <div className="home-page">
            <h1>Home</h1> 
            <CommentsLayout /> {/* Call the comments class */}
        </div>
    );
}