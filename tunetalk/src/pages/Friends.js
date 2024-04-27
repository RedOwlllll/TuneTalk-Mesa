import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../UserState";  // Import useUser from your UserState

export const Friends = () => {
    const [email, setEmail] = useState("");
    const [friends, setFriends] = useState([]);
    const [error, setError] = useState("");
    const [user, setUser] = useUser();  // Get user from context

    // Function to handle sending friend requests
    const sendFriendRequest = async (recipientEmail) => {
        try {
            const response = await axios.post('http://localhost:8082/api/friends/request', {
                requesterEmail: user.email,  // Use email from context
                recipientEmail
            });
            alert('Friend request sent!');
        } catch (err) {
            setError(err.message);
        }
    };

    // Function to fetch list of friends using the logged-in user's email
    const fetchFriends = async () => {
        try {
            if (user.email) {  // Check if email is available
                const response = await axios.get(`http://localhost:8082/api/friends/list/${encodeURIComponent(user.email)}`);
                setFriends(response.data);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchFriends();
    }, [user.email]);  // Dependency on user.email

    return (
        <div className="friends-page">
            <h1>Friends</h1>
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter friend's email"
            />
            <button onClick={() => sendFriendRequest(email)}>Add Friend</button>

            <h2>My Friends</h2>
            {friends.map((friend, index) => (
                <div key={index}>
                    <p>{friend.requesterEmail === user.email ? friend.recipientEmail : friend.requesterEmail}</p>
                </div>
            ))}

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};