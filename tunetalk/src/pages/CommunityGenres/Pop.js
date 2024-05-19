import React, { useState, useEffect } from 'react';
import { FaCheck, FaPlus } from 'react-icons/fa'; // FontAwesome icons
import '../../css/Community.css';
import { useUser } from "../../authentication/UserState";
import axios from "axios";

const CLIENT_ID = "a8c9857ace8449f290ed14c54c878e1f";
const CLIENT_SECRET = "c747a0da53124c4ba8bc12a0e88d859b";

function Pop() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [popPlaylists, setPopPlaylists] = useState([]);
  const [featuredTrack, setFeaturedTrack] = useState(null);  // State to store the featured track
  const [user] = useUser(); 
  const [followerCount, setFollowerCount] = useState(0);
  const [followers, setFollowers] = useState([]);
  const [showFollowers, setShowFollowers] = useState(false);

  const handleFollowClick = async () => {
    if (!isFollowing){
      try {
          await axios.post(`http://localhost:8082/api/community/follow/${encodeURIComponent(user.username)}`, {
            community: 'pop',
            followStatus: true
          });
          setIsFollowing(true);
      } catch (err) {
          console.error("Error updating follow status:", err);
      }
    } else {
      try {
        await axios.post(`http://localhost:8082/api/community/un-follow/${encodeURIComponent(user.username)}`, {
          community: 'pop',
          followStatus: false
        });
        setIsFollowing(false);
      } catch (err) {
        console.error("Error updating un-follow status:", err);
      }
    }
  };

  const fetchFollowStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:8082/api/community/status/${encodeURIComponent(user.username)}`);
      setIsFollowing(response.data.pop);
    } catch (err) {
      console.error("Error fetching follow status:", err);
    }
  };

  const fetchInitialFollow = async () => {
    try {
        await axios.post(`http://localhost:8082/api/community/initiate-follows/${encodeURIComponent(user.username)}`);
    } catch (err) {
        console.error("Error initializing follow record:", err);
    }
  };

  useEffect(() => {
    // Function to retrieve the access token
    const getAccessToken = async () => {
      const authParameters = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
      };

      const response = await fetch('https://accounts.spotify.com/api/token', authParameters);
      const data = await response.json();
      setAccessToken(data.access_token);
    };

    getAccessToken();
  }, []);

  useEffect(() => {
    // Function to fetch Pop playlists using the access token
    const fetchPopMusic = async () => {
      if (!accessToken) return;

      const response = await fetch('https://api.spotify.com/v1/browse/categories/pop/playlists', {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPopPlaylists(data.playlists.items);
    };

    fetchPopMusic().catch(error => {
      console.error('Fetching pop playlists failed:', error);
    });
  }, [accessToken]);

  useEffect(() => {
    const fetchFeaturedTrack = async () => {
      if (!accessToken || popPlaylists.length === 0) return;

      const chosenPlaylist = popPlaylists[0];

      const tracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${chosenPlaylist.id}/tracks`, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });

      if (!tracksResponse.ok) {
        throw new Error(`HTTP error! status: ${tracksResponse.status}`);
      }

      const tracksData = await tracksResponse.json();
      if (tracksData.items.length > 0) {
        const featuredTrack = tracksData.items[0].track; // Simplistically choosing the first track
        setFeaturedTrack(featuredTrack);
      }
    };

    fetchFeaturedTrack().catch(error => {
      console.error('Fetching featured track failed:', error);
    });
  }, [accessToken, popPlaylists]);

  useEffect(() => {
    if (user.username) {
    fetchInitialFollow();
    fetchFollowStatus();
    }
  }, [user.username]); // This effect depends on user.username

  useEffect(() => {
    
    const fetchFollowerCount = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/community/followers/count');
        setFollowerCount(response.data.count);
      } catch (error) {
        console.error("Error fetching follower count:", error);
      }
    };
    const fetchFollowers = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/community/followers');
        console.log("test22");
        setFollowers(response.data);
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };

    fetchFollowerCount();
    fetchFollowers();
  }, []);

  function FollowerListModal({ followers, onClose }) {
    return (
        <div className="follower-modal">
            <h2>Followers</h2>
            <ul>
                {followers.map((follower, index) => (
                    <li key={index}>{follower.username}</li>
                ))}
            </ul>
            <button onClick={onClose}>Close</button>
        </div>
    );
  }

  return (
    <div className="container-page">
      <h1>Pop Music</h1>
      <button onClick={handleFollowClick} className="follow-button">
        {isFollowing ? <><FaCheck /> Following</> : <><FaPlus /> Follow</>}
      </button>
      <div className="follower-info">
            <span className="follower-count" onClick={() => setShowFollowers(true)}>
                {followerCount} followers
            </span>
      </div>
      {showFollowers && <FollowerListModal followers={followers} onClose={() => setShowFollowers(false)} />}
      <div className="featured-track-container">
        <h2>Todays Featured Track</h2>
          {featuredTrack && (
            <div className="track-card">
              <img src={featuredTrack.album.images[0].url} alt={featuredTrack.name} className="track-image" />
              <div className="track-info">
                <div className="track-title">{featuredTrack.name}</div>
                <div className="track-artist">{featuredTrack.artists.map(artist => artist.name).join(', ')}</div>
              </div>
            </div>
          )}
      </div>
      <div className="playlists-container">
          {popPlaylists.map((playlist) => (
            <div key={playlist.id} className="playlist-card">
                <img src={playlist.images[0].url} alt={playlist.name} className="playlist-image" />
                <div className="playlist-info">
                    <h3>{playlist.name}</h3>
                    <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="playlist-link">Listen on Spotify</a>
                </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Pop;