import React, { useState, useEffect } from 'react';
import { FaCheck, FaPlus } from 'react-icons/fa'; // FontAwesome icons
import '../../css/Community.css';
import { useUser } from "../../authentication/UserState";
import axios from "axios";

const CLIENT_ID = "a8c9857ace8449f290ed14c54c878e1f";
const CLIENT_SECRET = "c747a0da53124c4ba8bc12a0e88d859b";

function Kpop() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [KpopPlaylists, setKpopPlaylists] = useState([]);
  const [randomTrack, setRandomTrack] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyTexts, setReplyTexts] = useState({});
  const username = localStorage.getItem("userlogin");
  const [editStatus, setEditStatus] = useState({});
  const [editTexts, setEditTexts] = useState({});
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [editReplyText, setEditReplyText] = useState({});
    const [user] = useUser(); 

    const handleFollowClick = async () => {
      if (!isFollowing){
        try {
            await axios.post(`http://localhost:8082/api/community/follow/${encodeURIComponent(user.email)}`, {
              community: 'kpop',
              followStatus: true
            });
            setIsFollowing(true);
        } catch (err) {
            console.error("Error updating follow status:", err);
        }
      } else {
        try {
          await axios.post(`http://localhost:8082/api/community/un-follow/${encodeURIComponent(user.email)}`, {
            community: 'kpop',
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
          setIsFollowing(response.data.Kpop); // assuming the response data structure matches your expectations
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
      // Function to fetch Kpop playlists using the access token
      const fetchKpopMusic = async () => {
        if (!accessToken) return;

        const response = await fetch('https://api.spotify.com/v1/browse/categories/Kpop/playlists', {
          headers: { 'Authorization': `Bearer ${accessToken}` },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

      const data = await response.json();
      setKpopPlaylists(data.playlists.items);

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

      fetchKpopMusic().catch(error => {
        console.error('Fetching Kpop playlists failed:', error);
      });
    }, [accessToken]);

    useEffect(() => {
      if (user.email) {
        fetchInitialFollow();
        fetchFollowStatus();
      }
    // eslint-disable-next-line
    }, [user.email]); // This effect depends on user.email

    // ALL BLAKES CODE
//sets the new comments
const handleCommentSubmit = (e) => {
  e.preventDefault();

  const newCommentToAdd = {
    id: comments.length + 1,
    username: username,
    body: newComment,
    date: new Date(),
    replies: []
  };

  setComments([...comments, newCommentToAdd]);
  setNewComment('');
};

//sets the new replies
const handleReplySubmit = async (commentId, e) => {
  e.preventDefault();
  addReplyToComment(commentId, replyTexts[commentId]);
  setReplyTexts({ ...replyTexts, [commentId]: '' });
};

//adds the reply to the parent comment
const addReplyToComment = (commentId, replyText) => {
  const updatedComments = comments.map(comment => {
    if (comment.id === commentId) {
      const newReply = {
        id: comment.replies.length + 1,
        username: username,
        body: replyText,
        date: new Date()
      };
      return { ...comment, replies: [...comment.replies, newReply] };
    }
    return comment;
  });
  setComments(updatedComments);
};


// Start editing a comment
const handleEdit = (id) => {
  setEditStatus({ ...editStatus, [id]: true });
  setEditTexts({ ...editTexts, [id]: comments.find(comment => comment.id === id).body });
};

// Cancel editing
const handleCancel = (id) => {
  setEditStatus({ ...editStatus, [id]: false });
};

// Save the edited comment
const handleSave = (id) => {
  const updatedComments = comments.map(comment => {
    if (comment.id === id) {
      return { ...comment, body: editTexts[id] };
    }
    return comment;
  });
  setComments(updatedComments);
  setEditStatus({ ...editStatus, [id]: false });
};

const startEditReply = (replyId, currentText) => {
  setEditingReplyId(replyId);
  setEditReplyText({ ...editReplyText, [replyId]: currentText });
};

const saveReplyChanges = (replyId) => {
  const updatedComments = comments.map(comment => {
    if (comment.id === replyId) {
      const updatedReplies = comment.replies.map(reply => {
        if (reply.id === replyId) {
          return { ...reply, body: editReplyText[replyId] };
        }
        return reply;
      });
      return { ...comment, replies: updatedReplies };
    }
    return comment;
  });
  setComments(updatedComments);
  setEditingReplyId(null);
  setEditReplyText({});
};

return (
  <div className="container-page">
    <h1>Kpop Music</h1>
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
        <div className="comments-container">
          {comments.map(comment => (
            <div key={comment.id} className="comment-box">
              {editStatus[comment.id] ? (
                <>
                  <input
                    value={editTexts[comment.id]}
                    onChange={(e) => setEditTexts({ ...editTexts, [comment.id]: e.target.value })}
                  />
                  <button onClick={() => handleSave(comment.id)}>Save</button>
                  <button onClick={() => handleCancel(comment.id)}>Cancel</button>
                </>
              ) : (
                <>
                  <div className="comment-header">
                    <strong>{comment.username}</strong>
                    <p>{comment.body}</p>
                    <small>{new Date(comment.date).toLocaleString()}</small>
                    <button className="comment-edit-button" onClick={() => handleEdit(comment.id)}>Edit</button>
                  </div>
                  {comment.replies && comment.replies.map(reply => (
                    <div key={reply.id} className="reply-box">
                      <div className="reply-content">
                        <strong>{reply.username}</strong>
                        {editingReplyId === reply.id ? (
                          <input
                            type="text"
                            value={editReplyText[reply.id] || reply.body}
                            onChange={(e) => setEditReplyText({ ...editReplyText, [reply.id]: e.target.value })}
                          />
                        ) : (
                          <p>{reply.body}</p>
                        )}
                        <small>{new Date(reply.date).toLocaleString()}</small>
                        <button className="comment-edit-button" onClick={() => startEditReply(reply.id, reply.body)}>Edit</button>
                        {editingReplyId === reply.id && (
                          <button onClick={() => saveReplyChanges(reply.id)}>Save</button>
                        )}
                      </div>
                    </div>
                  ))}
                  <form onSubmit={(e) => handleReplySubmit(comment.id, e)}>
                    <input
                      type="text"
                      placeholder="Reply..."
                      value={replyTexts[comment.id] || ''}
                      onChange={(e) => setReplyTexts({ ...replyTexts, [comment.id]: e.target.value })}
                    />
                    <button type="submit">Reply</button>
                  </form>
                </>
              )}
            </div>
          ))}
        </div>
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            className="comment-input"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit" className="submit-comment">Comment</button>
        </form>
      </div>

    )}
    <div className="playlists-container">
      {KpopPlaylists.map((playlist) => (
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

export default Kpop;
