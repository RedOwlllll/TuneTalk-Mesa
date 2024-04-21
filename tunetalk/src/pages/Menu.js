import React from "react";
import TuneTalkLogo from "../assets/TuneTalkLogoBlack.svg";
import { useNavigate } from "react-router-dom";
import "../css/App.css";

function Menu() {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            <h1><img src={TuneTalkLogo} className="" alt="Tune Talk"/></h1> 
            <h2>Share your tunes with friends!</h2><br></br>
            <p>Every day at a different time, TuneTalk invites you to share what you are currently listening to on Spotify with your friends.<br/> 
            All your friends post at the same time, allowing you to create special bonds through music!
            </p>

            <br></br>
            <button type="submit" onClick={() => navigate('/home')}>Login to Spotify </button>
        </div>
    );
}

export default Menu;