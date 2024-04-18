import React, { useState } from 'react';
import '../css/StarRating.css'; // Ensure you have the CSS path correct for styling

const StarRating = ({ onRating }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    // Handles the click on the star
    const handleRating = (rate) => {
        setRating(rate);
        onRating(rate);
    };

    // Handles the mouse hover on the star
    const handleMouseOver = (rate) => {
        setHoverRating(rate);
    };

    // Handles the mouse leaving the star
    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    return (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    type="button"
                    key={star}
                    className={star <= (hoverRating || rating) ? 'star on' : 'star off'}
                    onClick={() => handleRating(star)}
                    onMouseOver={() => handleMouseOver(star)}
                    onMouseLeave={handleMouseLeave}
                >
                    &#9733;
                </button>
            ))}
        </div>
    );
};

export default StarRating;
