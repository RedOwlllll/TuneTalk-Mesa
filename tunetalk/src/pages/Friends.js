import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../authentication/UserState";
import '../css/Friends.css';

export const Friends = () => {
    const [friends, setFriends] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [error, setError] = useState("");
    const [user] = useUser();  // Get user from context
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    // Function to handle sending friend requests
    const sendFriendRequest = async (recipientUsername) => {
        if (recipientUsername === user.username || recipientUsername.toLowerCase() === user.username.toLowerCase()) {
            alert("You cannot add yourself as a friend. Go get a life :)");  // Set an error state to display a message
            return;  // Stop further execution
        }

        try {
            const response = await axios.post('http://localhost:8082/api/friends/request', {
                requesterUsername: user.username,  // Use Username from context
                recipientUsername
            });
            if (response.status === 201) {
                alert('Friend request sent!');
            }
        } catch (err) {
            if (err.response && err.response.status === 409) {
                alert('You already made a request or you are already friend with this user');
            } else {
                setError(err.message);
            }
        }
    };

    const fetchFriends = async () => {
        try {
            const friendsResponse = await axios.get(`http://localhost:8082/api/friends/list/${encodeURIComponent(user.username)}`);
            setFriends(friendsResponse.data);

            const requestsResponse = await axios.get(`http://localhost:8082/api/friends/requests/${encodeURIComponent(user.username)}`);
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

    const removeFriend = async (friendUsername) => {
        try {
            await axios.delete('http://localhost:8082/api/friends/remove', {
                data: {
                    userId: user.username,
                    friendId: friendUsername
                }
            });
            fetchFriends(); // Refresh the friends list
            alert('Friend removed');
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchSearchResults = async () => {
        if (searchTerm.trim() !== "") {
            try {
                const response = await axios.get(`http://localhost:8082/api/friends/search/${encodeURIComponent(searchTerm)}`);
                setSearchResults(response.data);
            } catch (err) {
                setError(err.message);
            }
        } else {
            setSearchResults([]); // Clear results if search term is empty
        }
    };

    useEffect(() => {
        fetchFriends();
    }, [user.username]);  // Dependency on user.username

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchSearchResults();
        }, 300); // Delay for 300ms to reduce excessive API calls
    
        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    return (
        <div className="friends-page">
            <h1 className="friends-title">Friends</h1>
            <section className="friends-list">
                <h2>My Friends</h2>
                {friends.map((friend, index) => (
                    <div key={index} className="friend">
                        <p>{friend.requesterUsername === user.username ? friend.recipientUsername : friend.requesterUsername}</p>
                        <button onClick={() => removeFriend(friend.requesterUsername === user.username ? friend.recipientUsername : friend.requesterUsername)}>Remove Friend</button>
                    </div>
                ))}
            </section>
            <div className="add-friend">
                <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for friends"
                />
                <div>
                    {searchResults.map((user, index) => (
                    <div key={index} className="search-result">
                        <p>{user.username}</p>
                        <button onClick={() => sendFriendRequest(user.username)}>Add Friend</button>
                    </div>
                    ))}
                </div>              
            </div>
            <section className="requests-list">
                <h2>Pending Friend Requests</h2>
                {pendingRequests.map((request, index) => (
                    <div key={index} className="friend-request">
                        <p>{request.requesterUsername}</p>
                        <button onClick={() => handleResponse(request._id, 'accepted')}>Accept</button>
                        <button onClick={() => handleResponse(request._id, 'declined')}>Decline</button>
                    </div>
                ))}
            </section>
        </div>
    );
};