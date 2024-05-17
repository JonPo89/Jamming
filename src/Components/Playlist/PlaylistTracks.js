import React from 'react';

function PlaylistTracks(props) {

    return (
        <div class="trackBox" onClick={props.onClick} value={props.track.id}>
            <div id="searchResults" class="listContainer">
                <h3 class="track">{props.track.name}</h3>
                <h4 class="track">{props.track.artists[0].name} | {props.track.album.name}</h4>
            </div>
        </div>
    )
}

export default PlaylistTracks;