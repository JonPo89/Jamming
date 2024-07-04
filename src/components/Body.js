import React from 'react';
import { Playlist } from '../features/playlist/Playlist';
import { Tracklist } from '../features/tracklist/Tracklist';
import './track.css';
import './body.css';

export function Body () {

    return (
        <div className="body">
            <Tracklist />
            <Playlist />
        </div>
    )
}