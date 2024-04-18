import React from "react";
import "../css/App.css"; // NOTE: put 2 . ("..") since this file is in it's own folder too. 
import { Link } from 'react-router-dom';

function Community() {
    return (
        <div className="community-page">
            <h1>Music Genres</h1>
            <ul>
                <li><Link to="/pop">Pop</Link></li>
                <li><Link to="/k-pop">K-pop</Link></li>
                <li><Link to="/rock">Rock</Link></li>
                <li><Link to="/rnb">R&B</Link></li>
                <li><Link to="/indie">Indie</Link></li>
                <li><Link to="/hip-hop">Hip-hop</Link></li>
                <li><Link to="/country">Country</Link></li>
                <li><Link to="/electronic">Electronic</Link></li>
                <li><Link to="/metal">Metal</Link></li>
                <li><Link to="/classical">Classical</Link></li>
            </ul>  
        </div>
    );
}

export default Community;