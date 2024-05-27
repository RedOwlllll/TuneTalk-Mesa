import React from "react";
import '../css/Community.css';
import { Link } from 'react-router-dom';

export const Community = () => {
    return (
        <div className="container-page">
            <h1 className="community-title">Communities!</h1>
            <div className="community-description">
                <p>Discover and join communities centered around your favourite music genres.<br/>
                Engage with fellow music enthusiasts and explore curated Spotify playlists tailored to each community. <br></br>
                Plus, be sure to check out the top song of the week!</p><br></br>
            </div>
            <div className="genre-grid">
                {['Pop', 'Kpop', 'Rock', 'RNB', 'Indie', 'Hiphop', 'Country', 'Electronic', 'Metal', 'Classical'].map(genre => (
                <Link to={`/community/${genre.toLowerCase()}`} key={genre} className="genre-card">
                    {genre}
                </Link>
                ))}
            </div> 
        </div>
    );
}