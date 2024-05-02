import React, { useState, useEffect } from 'react';
import { FaCheck, FaPlus } from 'react-icons/fa'; // FontAwesome icons
import '../../css/Community.css';

const CLIENT_ID = "a8c9857ace8449f290ed14c54c878e1f";
const CLIENT_SECRET = "c747a0da53124c4ba8bc12a0e88d859b";

function Electronic() {
    const [isFollowing, setIsFollowing] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    const [ElectronicPlaylists, setElectronicPlaylists] = useState([]);
    const [randomTrack, setRandomTrack] = useState(null);


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
        // Function to fetch Electronic playlists using the access token
        const fetchElectronicMusic = async () => {
            if (!accessToken) return;

            const response = await fetch('https://api.spotify.com/v1/browse/categories/Electronic/playlists', {
                headers: { 'Authorization': `Bearer ${accessToken}` },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setElectronicPlaylists(data.playlists.items);

            if (data.playlists.items.length > 0) {
              const playlistId = data.playlists.items[0].id;
              const tracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                  headers: { 'Authorization': `Bearer ${accessToken}` },
              });
              const tracksData = await tracksResponse.json();
              if (tracksData.items.length > 0) {
                  const randomIndex = Math.floor(Math.random() * tracksData.items.length);
                  setRandomTrack(tracksData.items[randomIndex].track);
              }
          }
        };

        fetchElectronicMusic().catch(error => {
            console.error('Fetching Electronic playlists failed:', error);
        });
    }, [accessToken]); // This effect depends on the accessToken state

    const handleFollowClick = () => {
        setIsFollowing(!isFollowing);
    };

    return (
        <div className="container-page">
          <h1>Electronic Music</h1>
          <button onClick={handleFollowClick} className="follow-button">
            {isFollowing ? <><FaCheck /> Following</> : <><FaPlus /> Follow</>}
          </button>
          {randomTrack && (
            <div className="featured-track-container">
                <h2>Todays Featured Track: </h2>
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
            {ElectronicPlaylists.map((playlist) => (
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

export default Electronic;