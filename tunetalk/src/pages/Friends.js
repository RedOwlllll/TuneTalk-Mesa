// Friends.js
import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../UserState';

const Friends = () => {
    const [friendEmail, setFriendEmail] = useState('');
    const [message, setMessage] = useState('');
    const [user] = useUser();

    const handleAddFriend = async () => {
        if (!friendEmail) {
        setMessage('Please enter a valid email.');
        return;
        }

        console.log({
            requesterId: user._id, // Log the requesterId being sent
            recipientEmail: friendEmail,
        });

        try {
            const res = await axios.post('http://localhost:8082/api/addFriend', {
                requesterId: user._id, // Assuming user object contains _id
                recipientEmail: friendEmail, // The email of the user to add as a friend
            });

            if (res.data.status === 'ok') {
                setMessage('Friend request sent!');
            } else {
                setMessage(res.data.error);
            }
            } catch (error) {
            console.error('There was an error sending the friend request', error);
            setMessage('Failed to send friend request.');
        }
    };

    return (
        <div>
        <h2>Add a Friend</h2>
        <input
            value={friendEmail}
            onChange={(e) => setFriendEmail(e.target.value)}
            type="email"
            placeholder="Enter friend's email"
            required
        />
        <button onClick={handleAddFriend}>Add Friend</button>
        {message && <p>{message}</p>}
        </div>
    );
};

export { Friends };
