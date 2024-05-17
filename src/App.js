import './App.css';
import React, { useState, useEffect } from'react';
import SearchBar from './Components/SearchBar/SearchBar';
import SearchResults from './Components/SearchResults/SearchResults';
import Playlist from './Components/Playlist/Playlist';
import Login from './Components/Login/Login';
import { findTracks, userDetails, uploadPlaylist, addTracksToPlaylist } from './Components/Track/Findtrack.js';
import TrackList from './Components/Track/TrackList';
import PlaylistTracks from './Components/Playlist/PlaylistTracks';




const code = new URLSearchParams(window.location.search).get('code');
function App() {
  const [search, setSearch] = useState("")
  const [songList, setSongList] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await userDetails();
      setUserProfile(details);
    }
    fetchDetails();
  },[code]);
  
  useEffect(() => {
    const fetchTracks = async () => {
      if (search.trim() !== '') {
        const tracks = await findTracks(search);
        setSongList(tracks || []);
      }
    };

    fetchTracks();
  }, [search]);


  const onSearch = ({target}) => {
    setSearch(target.value);
  }

  const onPlaylistNameChange = ({target}) => {
    setPlaylistName(target.value);
  }

  const addSong = (track) => {
    if (!selectedTracks.some(selectedTrack => selectedTrack.id === track.id)) {
      setSelectedTracks(prev => [...prev, track]);
    }    
  }

  const removeSong = (track) => {
    setSelectedTracks(prev => prev.filter(t => !(t.id === track.id && t === track)));
  }

  let songsToUpload = "";
  function uploadSongs(){
    let songId = [];
    const spotifyTrack = "uris=spotify:track:"
    for (let i=0; i<selectedTracks.length; i++){
      songId.push(selectedTracks[i].id);
    }
    let songList = songId.join(',spotify:track:');
    songList = spotifyTrack + songList;
    console.log(songList);
    return songList;
  };


  const savePlaylist = async () => {
    
    const playlistId = await uploadPlaylist(playlistName, userProfile.id);
    alert(`Playlist ${playlistName} created`);
    songsToUpload = uploadSongs();
    console.log(songsToUpload);
    console.log(playlistId);
    await addTracksToPlaylist(playlistId, songsToUpload);
    console.log(playlistId);
  }


  

  
  return (
    <div className="App">
      <header className="App-header">
        <h1>ja<span class="highlight">mm</span>ing</h1>
      </header>

      {code ? (<>
        <br/>
        <h3>Hi</h3>
        <h2 id="userName">{userProfile.display_name}</h2>
        <h3>Let's make a playlist!</h3>
      <SearchBar onChange={onSearch}/>
      <div id="music">
        
          
          <div class="cont2">
            <SearchResults />
            <div class="container">
              {songList && songList.length > 0 && // Check if songList exists and is not empty
                    songList.map(song => (
                      <TrackList key={song.id} track={song} onClick={() => addSong(song)}/>
                  ))}
            </div>
          </div>
        
        <div class="cont2">
          <Playlist onChange={onPlaylistNameChange} onClick={savePlaylist}/>
          <div class="container">
            {selectedTracks && selectedTracks.length > 0 && // Check if songList exists and is not empty
                  selectedTracks.map(song => (
                    <PlaylistTracks key={song.id} track={song} onClick={() => removeSong(song)}/>
                  ))}
          </div>
        </div>
      </div></>) : (<Login />)}
    </div>
  );
}

export default App;
