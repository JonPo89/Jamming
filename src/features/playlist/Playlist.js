import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPlaylistSongs, removeTrackFromPlaylist, setPlaylistName, savePlaylist, addSongsToPlaylist, selectPlaylistName, selectPlaylistId, updatePlaylistName, removeSongsFromPlaylist, newPlaylist } from "./playlistSlice";
import { selectAccessToken, selectUserId } from "../authorisation/authorisationSlice";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { FaRegSave } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";


export function Playlist () {
    const [playlistNameInput, setPlaylistNameInput] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    
    const dispatch = useDispatch();
    
    const accessToken = useSelector(selectAccessToken);
    const userId = useSelector(selectUserId);
    const playlistSavedName = useSelector(selectPlaylistName);
    const playlistId = useSelector(selectPlaylistId);


    const playlistSongs = useSelector(selectPlaylistSongs);
    
    const clickNewPlaylist = () => {
        dispatch(newPlaylist());
        alert("Let's start again!")
    }
    const removeTrack = (track) => {
        dispatch(removeTrackFromPlaylist( track ));
    }

    const onPlaylistNameChange = (e) => {
        setPlaylistNameInput(e.target.value);
    }

    const uploadPlaylist = () => {
        if (playlistNameInput) {
            if (!playlistId) {
                dispatch(setPlaylistName(playlistNameInput));
                dispatch(savePlaylist({accessToken: accessToken, userId: userId}));
                alert(`Playlist ${playlistSavedName} has been saved!`);
            } else {
                dispatch(setPlaylistName(playlistNameInput));
                dispatch(updatePlaylistName({accessToken: accessToken}));
                dispatch(removeSongsFromPlaylist({accessToken: accessToken}))
                alert(`Playlist ${playlistSavedName} has been updated!`);
            }
            setIsSaving(true);
        } else {
            alert("Please enter a Playlist Name");
        }
    }

    useEffect(() => {
        if (isSaving && playlistId) {
            dispatch(addSongsToPlaylist({accessToken: accessToken}));
            setIsSaving(false);
            
        }
    })
    
    return (
        <div className="box">
            <div className="playlistNameBox">
                <input id="playlistName" type="text" placeholder="Playlist Name" onChange={onPlaylistNameChange} value={playlistNameInput}/>
                <GrPowerReset id="resetButton" className="playlistLogo" onClick={clickNewPlaylist}/>
                <FaRegSave id="newPlaylist" className="playlistLogo" onClick={uploadPlaylist} />
            </div>
            <div className="tracklist">
                {playlistSongs ? Object.values(playlistSongs).map(track => (
                    <div className="track" key={track.id} onClick={() => removeTrack(track.UID)}>
                        <img className="albumArt" src={track.albumArt[0].url} alt={`${track.songName} album art`} />     
                        <div className="trackDetails" >
                            <h4 className="trackName">{track.songName}</h4>  
                            <div className="artists">
                                {track.songArtists.map(artist => (
                                    <h5 className="artist">{artist}</h5>
                                ))}
                            </div>
                            <h5 className="album">{track.album}</h5>
                        </div>
                        <IoIosRemoveCircleOutline className="addSong" />
                    </div>                
            )) : null}
            </div>
        </div>
    );
}
