import React from "react";
import TuneTalkLogo from "../assets/TuneTalkLogoBlack.svg";
import { useNavigate } from "react-router-dom";
import "../css/App.css";

export const Menu = () => {
    const navigate = useNavigate();
    
    return (
        <div className="menu-page">
            <h1><img src={TuneTalkLogo} className="" alt="Tune Talk"/></h1> 
            <h2>Share your tunes with friends!</h2><br></br>
            <p>Every day at a different time, TuneTalk invites you to share what you are currently listening to on Spotify with your friends.<br/> 
            All your friends post at the same time, allowing you to create special bonds through music!
            </p>
            <br></br>
            <br/><button type = "submit" onClick={() => navigate('/account/login')}>Login to TuneTalk</button><br/><br/>
        </div>
    );
}