import axios from "axios";

const axios = require("axios");

const savePlaylist = async (name, userId) =>{
    const data = {
        name: name,
        description: "",
        public: false
      };
    
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      };
    
      try {
        const response = await axios.post(
          `https://api.spotify.com/v1/users/${userId}/playlists`,
          data,
          config
        );
        console.log('Playlist created:', response.data);
      } catch (error) {
        console.error('Error creating playlist:', error);
      }
};
