import React, { useState } from "react";
import "./css/App.css";
import "./css/Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import TuneTalkLogo from "./assets/TuneTalkTextWhite.svg";
import { useUser } from "./authentication/UserState";
import AccountLogo from "./assets/AccountLogo.svg";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false); // State variable that handles whether the menu is opened or closed. 
    const userContext = useUser(); // Passing import of the UserState class into a new variable
    const [user, setUserState] = userContext;
    const [buttonOpen, setButtonOpen] = useState(false); // State variable for the accounts dropdown menu.
    const navigate = useNavigate();
  
    // Function to handle user logout and initializing the state of the user
    const handleLogout = () => {
        setUserState({
            email: undefined, 
            username: undefined,
            password: undefined,
            spotifyAccount: undefined,
            isAuthenticated: false, 
        });
        localStorage.removeItem("user");
        navigate("/");
    };

    // Function to toggle hamburger menu
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Function to close hamburger menu
    const closeMenu = () => {
        setMenuOpen(false);
    };

    // For dropdown menu for the account page
    const toggleDropdown = () => {
        setButtonOpen(!buttonOpen);
    };
    
    return (
        <nav>
            <Link to ="/"><img src={TuneTalkLogo} className="account-logo" onClick={closeMenu} alt="TuneTalk"/></Link>
            <div className="menu" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? "open" : ""}>
                {/* NavLinks, which allow the user to navigate to different pages in the navbar */}
                
                {!user?.isAuthenticated ? (
                    // First displays menu and login navlinks for when user is not logged in / authenticated
                    <>
                        <li><NavLink to="/menu">Menu</NavLink></li>
                        
                        <li>
                            <div className="account-dropdown">
                                <button className="account-button" onClick={toggleDropdown}>
                                <h3 className="account-image"> 
                                    <img src={AccountLogo} className="account-logo" alt="Account" />
                                </h3>
                                </button>
                                <div className="dropdown-content">
                                <NavLink to="/account/login" className="dropdown-link"><h4>Login</h4></NavLink>
                                <NavLink to="/account/register" className="dropdown-link"><h4>Register</h4></NavLink>
                                </div>
                            </div>
                        </li>
                    </>
                ) : (
                    // Otherwise, if user is logged in, the navlinks below will appear instead. 
                    <>
                        
                        <li><NavLink to="/feed">Feed</NavLink></li>
                        <li><NavLink to="/friends">Friends</NavLink></li>
                        <li><NavLink to="/community">Community</NavLink></li>
                        {user.isAuthenticated && (
                            <li>
                                <div className="account-dropdown">
                                    <button className="account-button" onClick={toggleDropdown}>
                                        <h3 className="account-image"> 
                                        <img src={AccountLogo} className="account-logo" alt="Account" />
                                        </h3>
                                    </button>
                                    <div className="dropdown-content">
                                        <NavLink to="/account/user" className="dropdown-link">
                                        <div>
                                            {/* Will display both the user email and username in one div/navlink */}
                                            Email: {user.email} <br/> Username: {user.username} <br/> Spotify: {user.spotifyAccount}
                                        </div>
                                        </NavLink>
                                        <center><button className="logout-btn" onClick={handleLogout}><h4>Log Out</h4></button></center>
                                    </div>
                                </div>
                            </li>
                        )}
                    </>
                )}
            </ul>
        </nav>
    );
}