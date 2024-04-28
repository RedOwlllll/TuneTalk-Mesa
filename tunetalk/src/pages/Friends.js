import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../authentication/UserState";
import '../css/Friends.css';

export const Friends = () => {
    const [email, setEmail] = useState("");
    const [friends, setFriends] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
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

    const fetchFriends = async () => {
        try {
            const friendsResponse = await axios.get(`http://localhost:8082/api/friends/list/${encodeURIComponent(user.email)}`);
            setFriends(friendsResponse.data);

            const requestsResponse = await axios.get(`http://localhost:8082/api/friends/requests/${encodeURIComponent(user.email)}`);
            setPendingRequests(requestsResponse.data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleResponse = async (friendId, status) => {
        try {
            await axios.put('http://localhost:8082/api/friends/response', { friendId, status });
            fetchFriends(); // Refresh friends list and pending requests
        } catch (err) {
            setError(err.message);
        }
    };

    const removeFriend = async (friendEmail) => {
        try {
            await axios.delete('http://localhost:8082/api/friends/remove', {
                data: {
                    userId: user.email,
                    friendId: friendEmail
                }
            });
            fetchFriends(); // Refresh the friends list
            alert('Friend removed');
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchFriends();
    }, [user.email]);  // Dependency on user.email

    return (
        <section className="friends-page">
            <h1>Friends</h1>
            <div className="add-friend">
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter friend's email"
                />
                <button onClick={() => sendFriendRequest(email)}>Add Friend</button>
            </div>

            {error && <div className="error">{error}</div>}

            <section className="requests-list">
                <h2>Pending Friend Requests</h2>
                {pendingRequests.map((request, index) => (
                    <div key={index} className="friend-request">
                        <p>{request.requesterEmail}</p>
                        <button onClick={() => handleResponse(request._id, 'accepted')}>Accept</button>
                        <button onClick={() => handleResponse(request._id, 'declined')}>Decline</button>
                    </div>
                ))}
            </section>

            <section className="friends-list">
                <h2>My Friends</h2>
                {friends.map((friend, index) => (
                    <div key={index} className="friend">
                        <p>{friend.requesterEmail === user.email ? friend.recipientEmail : friend.requesterEmail}</p>
                        <button onClick={() => removeFriend(friend.requesterEmail === user.email ? friend.recipientEmail : friend.requesterEmail)}>Remove Friend</button>
                    </div>
                ))}
            </section>
        </section>
    );
};