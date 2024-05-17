import getAccessToken from '../AccessToken/AccessToken';
import axios from "axios";

let accessToken = await getAccessToken();

export const findTracks= async (searchInput) => {
    if (!accessToken){
        accessToken = await getAccessToken();
        console.log(accessToken);
    };
    
    const url = "https://api.spotify.com/v1/search?";
    const urlToFetch = url + "q=" + searchInput + "&type=track";
    try{
        const response = await fetch(urlToFetch, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (response.ok){
            const jsonResponse = await response.json();
            let tracks = jsonResponse.tracks.items;
            return tracks;
        }
    }catch (err){
        console.log(err);
    }
    
}

const getUserDetails = async () =>{

    try {
        const response = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
            
          });
        
        
        if (response.ok) {
            const jsonResponse = await response.json();

            return jsonResponse;
        }

    }catch (err){
        console.log(err);
    }
};

export const userDetails = async () => {
    let response = await getUserDetails();

    return response;
};



export const uploadPlaylist = async (playlistName, userId) =>{
    const data = {
        name: playlistName,
        description: "",
        public: true
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
        console.log(response.data.id);
        let playlistId = response.data.id;
        return playlistId;
      } catch (error) {
        console.error('Error creating playlist:', error);
      }
};

export const addTracksToPlaylist = async (playlistId, trackUri) => {
    const data = {
        uris: trackUri.split(','),
        position: 0
    };
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await axios.post(
            `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            data,
            config
        );
        console.log('Tracks added to playlist:', response.data);

    }catch (err){
        console.log('Error creating playlist:', err);
    }
}