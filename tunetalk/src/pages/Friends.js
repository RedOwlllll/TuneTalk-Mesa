import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../UserState';

const Friends = () => {
    const [friendEmail, setFriendEmail] = useState('');
    const [message, setMessage] = useState('');
    const [user] = useUser();
    const [pendingRequests, setPendingRequests] = useState([]); // Define pendingRequests state

    // Define fetchPendingRequests function outside of useEffect
    const fetchPendingRequests = async () => {
        try {
            const res = await axios.get(`http://localhost:8082/api/addFriend/pending/${user.email}`);
            console.log(res.data.pendingRequests); // Log the pending requests data
            setPendingRequests(res.data.pendingRequests);
        } catch (error) {
            console.error('Error fetching pending friend requests:', error);
        }
    };

    useEffect(() => {
        if (user.email) {
            fetchPendingRequests(); // Fetch pending requests when component mounts
        }
    }, [user.email]); // Fetch pending requests when user email changes


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

    const handleAcceptFriend = async (requesterEmail) => {
        try {
            const res = await axios.post('http://localhost:8082/api/addFriend/accept', {
                requesterEmail: requesterEmail,
            });

            if (res.data.status === 'ok') {
                setMessage('Friend request accepted!');
                fetchPendingRequests();
            } else {
                setMessage(res.data.error);
            }
        } catch (error) {
            console.error('There was an error accepting the friend request', error);
            setMessage('Failed to accept friend request.');
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

        <h2>Pending Friend Requests</h2>
            <ul>
                {pendingRequests.map((request) => (
                    <li key={request._id}>
                        {request.requester.displayName}
                        <button onClick={() => handleAcceptFriend(request.requester)}>Accept</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { Friends };
