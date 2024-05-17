import React, { useState } from 'react';
import './Playlist.css';

function Playlist(props) {
    const [playlistName, setPlaylistName] = useState("Playlist")

    return (

            <div class="heading">
                <input
                type="text"
                name="playlistName"
                id="playlistName"
                placeholder="Enter Playlist Name"
                onChange={props.onChange}
                />
                <button id="savePlaylist" onClick={props.onClick}>Save</button>
            </div>

    )
}


export default Playlist;