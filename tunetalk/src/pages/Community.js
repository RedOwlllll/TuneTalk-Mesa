import React from "react";
import "../css/App.css"; // NOTE: put 2 . ("..") since this file is in it's own folder too. 
import '../css/Community.css';
import { Link } from 'react-router-dom';

export const Community = () => {
    return (
        <div className="container-page">
            <h1 className="community-title">Music Genres</h1>
            <div className="genre-grid">
                {['Pop', 'Kpop', 'Rock', 'RNB', 'Indie', 'Hiphop', 'Country', 'Electronic', 'Metal', 'Classical'].map(genre => (
                <Link to={`/${genre.toLowerCase()}`} key={genre} className="genre-card">
                    {genre}
                </Link>
                ))}
            </div> 
        </div>
    );
}