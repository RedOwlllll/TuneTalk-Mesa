import React, { useState } from 'react';
import '../css/StarRating.css'; // Ensure your CSS paths are correct

const StarRating = ({ onRating, postId }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRating = async (rate) => {
    setRating(rate);
    onRating(rate, postId);  // Pass the postId to the rating handler
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={star <= (hoverRating || rating) ? 'star on' : 'star off'}
          onClick={() => handleRating(star)}
          onMouseOver={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
        >
          &#9733;
        </button>
      ))}
    </div>
  );
};

export default StarRating;
