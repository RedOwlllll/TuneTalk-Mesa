import React from "react";
import "../css/App.css"; // NOTE: put 2 . ("..") since this file is in it's own folder too. 
import PostingButton from "../functions/PostingButton";

export const Home = () => {
    return (
        <div className="home">
            <div className="posting-feature-bar">
                <PostingButton id='posting-button-sequence'/>
            </div>
            <div className="home-page">
                <h1>Home</h1> 
            
            </div>      
        </div>
        
    );
}
