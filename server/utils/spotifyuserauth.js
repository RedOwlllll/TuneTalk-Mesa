const axios = require('axios');

// Function to fetch user information
const getUserInfo = async (accessToken) => {
  try {
    // Make a GET request to the Spotify API
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    // Extract user information from the response
    const userInfo = {
      userId: response.data.id,
      displayName: response.data.display_name,
      email: response.data.email,
      profileImage: response.data.images.length > 0 ? response.data.images[0].url : null
    };

    return userInfo;
  } catch (error) {
    // Handle errors
    console.error('Error fetching user information:', error.response.data);
    throw new Error('Failed to fetch user information from Spotify API');
  }
};

// Example usage:
const accessToken = 'BQBiLAv4dp6zJcKEMC_rRl1eHTTRPghs9NdniVUeLOm51KbvFAbzNHAUuM05kzFAj2Q_rtxdE1BFEKWSymd9A_bFJmS5KLpUZ5XIO9uuYmFe3qdVbXbNAvKxZuLuyboMVLzEeCNcTnbRE8Z4eT2fLaIUATYmdNb3T9hvlk5m_hApf2i7X4ue5NwH1YOb&token_type=Bearer&expires_in=3600'; // Replace 'YOUR_ACCESS_TOKEN' with the actual access token
getUserInfo(accessToken)
  .then(userInfo => {
    console.log('User information:', userInfo);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });