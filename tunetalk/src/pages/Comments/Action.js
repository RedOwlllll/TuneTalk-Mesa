import React from "react";

/* Function that handles when an element is clicked */
export const Action = ({ handleClick, type, className }) => {
    return (
        <div className={className} onClick={handleClick}>
        {type}
        </div>
    );
};