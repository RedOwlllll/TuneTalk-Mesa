import React, { useState, useEffect } from 'react';
import { FaCheck, FaPlus } from 'react-icons/fa'; // FontAwesome icons
import '../../css/Community.css';
import { useUser } from "../../authentication/UserState";
import axios from "axios";

const CLIENT_ID = "a8c9857ace8449f290ed14c54c878e1f";
const CLIENT_SECRET = "c747a0da53124c4ba8bc12a0e88d859b";

function Country() {
    const [isFollowing, setIsFollowing] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    const [CountryPlaylists, setCountryPlaylists] = useState([]);
    const [user] = useUser(); 

    const handleFollowClick = async () => {
      if (!isFollowing){
        try {
            await axios.post(`http://localhost:8082/api/community/follow/${encodeURIComponent(user.email)}`, {
              community: 'country',
              followStatus: true
            });
            setIsFollowing(true);
        } catch (err) {
            console.error("Error updating follow status:", err);
        }
      } else {
        try {
          await axios.post(`http://localhost:8082/api/community/un-follow/${encodeURIComponent(user.email)}`, {
            community: 'country',
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
          setIsFollowing(response.data.Country); // assuming the response data structure matches your expectations
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
      // Function to fetch Country playlists using the access token
      const fetchCountryMusic = async () => {
        if (!accessToken) return;

        const response = await fetch('https://api.spotify.com/v1/browse/categories/Country/playlists', {
          headers: { 'Authorization': `Bearer ${accessToken}` },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCountryPlaylists(data.playlists.items);
      };

      fetchCountryMusic().catch(error => {
        console.error('Fetching Country playlists failed:', error);
      });
    }, [accessToken]);

    useEffect(() => {
      if (user.email) {
        fetchInitialFollow();
        fetchFollowStatus();
      }
    // eslint-disable-next-line
    }, [user.email]); // This effect depends on user.email

    return (
        <div className="container-page">
          <h1>Country Music</h1>
          <button onClick={handleFollowClick} className="follow-button">
            {isFollowing ? <><FaCheck /> Following</> : <><FaPlus /> Follow</>}
          </button>
          <div className="playlists-container">
            {CountryPlaylists.map((playlist) => (
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

export default Country;