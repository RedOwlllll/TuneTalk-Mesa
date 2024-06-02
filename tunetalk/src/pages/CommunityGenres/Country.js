import React, { useState, useEffect } from 'react';
import { FaCheck, FaPlus } from 'react-icons/fa'; // FontAwesome icons
import '../../css/Community.css';
import { useUser } from "../../authentication/UserState";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown, faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';


const CLIENT_ID = "a8c9857ace8449f290ed14c54c878e1f";
const CLIENT_SECRET = "c747a0da53124c4ba8bc12a0e88d859b";

function Country() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [countryPlaylists, setCountryPlaylists] = useState([]);
  const [featuredTrack, setFeaturedTrack] = useState(null);  // State to store the featured track
  const [user] = useUser(); 
  const [followerCount, setFollowerCount] = useState(0);
  const [followers, setFollowers] = useState([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [previewURL, setPreviewURL] = useState('');
  

  const toggleVisibility = () => setIsVisible(!isVisible); // Collapse comment box

  const handleFollowClick = async () => {
    if (!isFollowing){
      try {
          await axios.post(`http://localhost:8082/api/community/follow/${encodeURIComponent(user.username)}`, {
            community: 'country',
            followStatus: true
          });
          setIsFollowing(true);
      } catch (err) {
          console.error("Error updating follow status:", err);
      }
    } else {
      try {
        await axios.post(`http://localhost:8082/api/community/un-follow/${encodeURIComponent(user.username)}`, {
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
      const response = await axios.get(`http://localhost:8082/api/community/status/${encodeURIComponent(user.username)}`);
      setIsFollowing(response.data.country);
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

  const fetchComments = async (spotifyUrl) => {
    try {
      const response = await axios.get(`http://localhost:8082/api/songs/comments/${encodeURIComponent(spotifyUrl)}`);
      setComments(response.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    // Function to fetch Country playlists using the access token
    const fetchCountryMusic = async () => {
      if (!accessToken) return;

      const response = await fetch('https://api.spotify.com/v1/browse/categories/country/playlists', {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCountryPlaylists(data.playlists.items);
    };

    fetchCountryMusic().catch(error => {
      console.error('Fetching country playlists failed:', error);
    });
  }, [accessToken]);

  useEffect(() => {
    const fetchFeaturedTrack = async () => {
      if (!accessToken || countryPlaylists.length === 0) return;

      const chosenPlaylist = countryPlaylists[0];

      const tracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${chosenPlaylist.id}/tracks`, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });

      if (!tracksResponse.ok) {
        throw new Error(`HTTP error! status: ${tracksResponse.status}`);
      }

      const tracksData = await tracksResponse.json();
      if (tracksData.items.length > 0) {
        const featuredTrack = tracksData.items[1].track; // Simplistically choosing the first track (NOTE: changed to 1 because the song set at 0, the previewURL was set to null at the time - max)
        setFeaturedTrack(featuredTrack);
        setPreviewURL(featuredTrack.preview_url); // Set the preview URL in the state
      }
    };

    fetchFeaturedTrack().catch(error => {
      console.error('Fetching featured track failed:', error);
    });
  }, [accessToken, countryPlaylists]);

  useEffect(() => {
    if (user.username) {
    fetchInitialFollow();
    fetchFollowStatus();
    }
  }, [user.username]); // This effect depends on user.username

  useEffect(() => {
    const communityName = 'country'; 

    const fetchFollowerCount = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/community/${communityName}/followers/count`);
        setFollowerCount(response.data.count);
      } catch (error) {
        console.error("Error fetching follower count:", error);
      }
    };

    const fetchFollowers = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/community/${communityName}/followers`);
        setFollowers(response.data);
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };

    fetchFollowerCount();
    fetchFollowers();
  }, []);

  useEffect(() => {
    // Post the featured track to your backend
    const postFeaturedTrack = async () => {
      if (!featuredTrack) return;

      await axios.post('http://localhost:8082/api/songs', {
        spotifyUrl: featuredTrack.external_urls.spotify,
        previewURL: previewURL // PASS PREVIEWURL (set in fetchFeaturedTrack)

      }).then(response => {
        console.log('Song added:', response.data);
        console.log(featuredTrack); // Check if previewURL is present
      }).catch(error => {
        if (error.response && error.response.status === 409) {
          console.log('Song already exists.');
        } else {
          console.error('Error posting featured track:', error);
        }
      });
    };

    postFeaturedTrack();
  }, [featuredTrack, previewURL]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('You must be logged in to post comments.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8082/api/songs/comment', {
        spotifyUrl: featuredTrack.external_urls.spotify,
        username: user.username,
        comment,
        rating
      });
      console.log('Comment added:', response.data);
      setComment('');
      setRating(1);
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };

  // Handle star click
  const handleRating = (rate) => {
    setRating(rate);
    // Update class for each star
    const stars = document.querySelectorAll('.rating i');
    stars.forEach((star, idx) => {
      if (idx < rate) {
        star.classList.remove('far');
        star.classList.add('fas');
      } else {
        star.classList.remove('fas');
        star.classList.add('far');
      }
    });
  };

  function StarRating({ rating }) {
    const totalStars = 5;
    let stars = [];

    // Create filled stars up to the rating
    for (let i = 1; i <= totalStars; i++) {
      if (i <= rating) {
        stars.push(<i key={i} className="fas fa-star" style={{ color: '#ffc107' }}></i>);
      } else if (i > rating && i - 1 < rating) {
        // Handle half star for fractions
        stars.push(<i key={i} className="fas fa-star-half-alt" style={{ color: '#ffc107' }}></i>);
      } else {
        stars.push(<i key={i} className="far fa-star" style={{ color: '#ffc107' }}></i>);
      }
    }

    return <div>{stars}</div>;
  }

  useEffect(() => {
    if (featuredTrack) {
      fetchComments(featuredTrack.external_urls.spotify);
    }
  }, [featuredTrack]);

  useEffect(() => {
    if (comments.length > 0) {
      const totalRating = comments.reduce((acc, comment) => acc + comment.rating, 0);
      const averageRating = totalRating / comments.length;
      setAverageRating(Math.round(averageRating * 2) / 2); // Rounds to nearest 0.5
    } else {
      setAverageRating(0);
    }
  }, [comments]);

  return (
    <div className="container-page">
      <div className="follow-container">
        <h1>Country Music</h1>
        <button onClick={handleFollowClick} className="follow-button">
          {isFollowing ? <><FaCheck /> Following</> : <><FaPlus /> Follow</>}
        </button>
        <div className="follower-info">
          <span className="follower-count" onClick={() => setShowFollowers(true)}>
            {followerCount} followers
          </span>
        </div>
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
                <div>
                  <br></br>
                  <a href={featuredTrack.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="spotify-play-button">
                    Listen on Spotify
                  </a>
                  <br></br><br></br>
                  {previewURL && (
                    <audio controls src={previewURL}>
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </div>
              </div>
            </div>
          )}
        <h4 className="community-h4">Comment and rate the song</h4>
        <form onSubmit={handleSubmit}>
          <input class="community-input" type = "text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write a comment..." required />
          <div className="rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <label key={star}>
                  <input
                    type="radio"
                    name="rating"
                    value={star}
                    onClick={() => handleRating(star)}
                  />
                  <i className={star <= rating ? 'fas fa-star' : 'far fa-star'}></i>
                </label>
              ))}
            </div>
          <button class="community-btn" type="submit">Post Comment and Rating</button>
        </form>
      </div>
      <div className="community-comments-container">
        <div className= "toggleText" onClick={toggleVisibility} style={{ cursor: 'pointer' }}>
        <strong>{comment.username}</strong> <h5>Tap to {isVisible ? 'hide' : 'view'} comment <FontAwesomeIcon icon={isVisible ? faChevronCircleDown : faChevronCircleDown} className={`icon ${isVisible ? 'up' : 'down'}`} /></h5>
        </div>
        <div className={`collapsible-content ${isVisible ? 'open' : ''}`}>
          {isVisible && (
          <div>
            <h4 className="community-h4">Average Rating: <StarRating rating={averageRating} /></h4>
            {comments.map((comment, index) => (
            <div key={index} className="comment">
              <p><strong>{comment.username}</strong></p><StarRating rating={comment.rating} /> : <span>{comment.body}</span>
            </div>
            ))}
          </div>
          )}
        </div>
      </div>
      <div className="playlists-container">
          {countryPlaylists.map((playlist) => (
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