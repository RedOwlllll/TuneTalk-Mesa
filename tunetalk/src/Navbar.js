import React, { useState } from "react";
import "./css/Navbar.css";
import { Link, NavLink } from "react-router-dom";
import TuneTalkLogo from "./assets/TuneTalkTextWhite.svg";
import { useUser } from "./UserState";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false); // State variable that handles whether the menu is opened or closed. 
    const userContext =useUser(); // Passing import of the UserState class into a new variable
    const [user, setUserState] = userContext;
    const navigate = useNavigate();

    // Function to handle user logout
    const handleLogout = () => {
        setUserState({
        isAuthenticated: false, 
        spotifyLogin: undefined, 
        password: undefined,
        });
        navigate("/menu");
    };
    
    return (
        <nav>
        <Link to ="/"><img src={TuneTalkLogo} className="" alt="Tune Talk"/></Link>
        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>
            {/* NavLinks, which allow the user to navigate to different pages in the navbar */}
            
            {!user.isAuthenticated ? (
                // First displays menu and login navlinks for when user is not logged in / authenticated
                <>
                    <li><NavLink to="/menu">Menu</NavLink></li>
                    <li><NavLink to="/login">Login</NavLink></li>
                </>
            ) : (
                // Otherwise, if user is logged in, the navlinks below will appear instead. 
                <>
                    <li><NavLink to="/home">Home</NavLink></li>
                    <li><NavLink to="/friends">Friends</NavLink></li>
                    <li><NavLink to="/community">Community</NavLink></li>
                    <li><NavLink to="/account">Account</NavLink></li>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </>
                
            )}
            
        </ul>
        </nav>
    );
}