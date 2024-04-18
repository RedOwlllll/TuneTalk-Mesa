import React, { useState } from 'react';
import { FaCheck, FaPlus } from 'react-icons/fa'; // FontAwesome icons
import '../../css/Community.css';

function Classical() {
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollowClick = () => {
        setIsFollowing(!isFollowing);
    };

    return (
        <div className="container-page">
            <h1>Classical Music</h1>
            <button onClick={handleFollowClick} className="follow-button">
                {isFollowing ? <><FaCheck /> Following</> : <><FaPlus /> Follow</>}
            </button>
        </div>
    );
}

export default Classical;