import React, { useState, useEffect } from 'react';
import { FaCheck, FaPlus } from 'react-icons/fa';
import '../../css/Community.css';
import { useUser } from "../../authentication/UserState";
import axios from "axios";

const CLIENT_ID = "a8c9857ace8449f290ed14c54c878e1f";
const CLIENT_SECRET = "c747a0da53124c4ba8bc12a0e88d859b";

function Pop() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [popPlaylists, setPopPlaylists] = useState([]);
  const [user] = useUser(); 

  const [randomTrack, setRandomTrack] = useState(null);

  const handleFollowClick = async () => {
    if (!isFollowing){
      try {
          await axios.post(`http://localhost:8082/api/community/follow/${encodeURIComponent(user.email)}`, {
            community: 'pop',
            followStatus: true
          });
          setIsFollowing(true);
      } catch (err) {
          console.error("Error updating follow status:", err);
      }
    } else {
      try {
        await axios.post(`http://localhost:8082/api/community/un-follow/${encodeURIComponent(user.email)}`, {
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
        const response = await axios.get(`http://localhost:8082/api/community/status/${encodeURIComponent(user.email)}`);
        setIsFollowing(response.data.pop);
    } catch (err) {
        console.error("Error fetching follow status:", err);
    }
  };

  const fetchInitialFollow = async () => {
    try {
        await axios.post(`http://localhost:8082/api/community/initiate-follows/${encodeURIComponent(user.email)}`);
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
    
      const playlistResponse = await fetch('https://api.spotify.com/v1/browse/categories/pop/playlists', {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
    
      if (!playlistResponse.ok) {
        throw new Error(`HTTP error! status: ${playlistResponse.status}`);
      }
    
      const data = await playlistResponse.json();
      if (!data.playlists || !data.playlists.items.length) {
        console.log("No playlists found or unexpected data structure:", data);
        return; // Early return if no playlists are found or data structure is not as expected
      }
      const playlistId = data.playlists.items[0].id;
    
      const trackResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
    
      if (!trackResponse.ok) {
        throw new Error(`HTTP error! status: ${trackResponse.status}`);
      }
    
      setPopPlaylists(data.playlists.items);
      const trackData = await trackResponse.json();
      setRandomTrack(trackData.tracks.items);
    };
  
    fetchPopMusic().catch(error => {
      console.error('Fetching pop playlists & track failed:', error);
    });
  }, [accessToken]);

  

  useEffect(() => {
    if (user.email) {
      fetchInitialFollow();
      fetchFollowStatus();
    }
  }, [user.email]);

  // displaying song of the day

  return (
      <div className="container-page">
        <h1>Pop Music</h1>
        <button onClick={handleFollowClick} className="follow-button">
          {isFollowing ? <><FaCheck /> Following</> : <><FaPlus /> Follow</>}
        </button>
        {randomTrack && (
          <div className="featured-track-container">
            <h2>Todays Featured Track:</h2>
            <div className="track-card">
              <img src={randomTrack.album.images[0].url} alt={randomTrack.name} className="track-image" />
              <div className="track-info">
                <p className="track-title">{randomTrack.name}</p>
                <p className="track-artist">by {randomTrack.artists.map(artist => artist.name).join(', ')}</p>
              </div>
            </div> 
          </div>
        )}
        
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