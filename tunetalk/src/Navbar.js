import React, { useState } from "react";
import "./css/Navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false); // State variable that handles whether the menu is opened or closed. 

    return (
        <nav>
        <Link to="/" className="title">
            Tune Talk
        </Link>
        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>
            {/* NavLinks, which allow the user to navigate to different pages in the navbar */}
            <li><NavLink to="/register">Register</NavLink></li>
            <li><NavLink to="/home">Home</NavLink></li>
            <li><NavLink to="/friends">Friends</NavLink></li>
            <li><NavLink to="/community">Community</NavLink></li>
            <li><NavLink to="/account">Acccount</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
        </ul>
        </nav>
    );
}