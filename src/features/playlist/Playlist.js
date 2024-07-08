import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPlaylistSongs, 
    removeTrackFromPlaylist, 
    setPlaylistName, 
    savePlaylist, 
    addSongsToPlaylist, 
    selectPlaylistName, 
    selectPlaylistId, 
    updatePlaylistName, 
    removeSongsFromPlaylist, 
    newPlaylist } from "./playlistSlice";
import { selectAccessToken, selectUserId } from "../authorisation/authorisationSlice";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { FaRegSave } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";


export function Playlist () {
    const [playlistNameInput, setPlaylistNameInput] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [hoverMessageVisible, setHoverMessageVisible] = useState(0);
    const [hoverMessage, setHoverMessage] = useState("");
    const [hoverPosition, setHoverPosition] = useState ({ x: 0, y: 0});
    
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
    }, [isSaving, playlistId, dispatch, accessToken]);

    const mouseEnterMessageSave = () => {
        setHoverMessageVisible(1);
        setHoverMessage("Save Playlist");
    };

    const mouseLeaveMessageSave = () => {
        setHoverMessageVisible(0);
        setHoverMessage("");
    }

    const mouseEnterMessageNew = () => {
        setHoverMessageVisible(1);
        setHoverMessage("New Playlist");
    };

    const mouseLeaveMessageNew = () => {
        setHoverMessageVisible(0);
        setHoverMessage("");
    }

    useEffect(() =>{
        const handleMouseMove = (event) => {
            setHoverPosition({  x: event.clientX, y: event.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);
    
    return (
        <div className="box">
            <div className="playlistNameBox">
                <input id="playlistName" type="text" placeholder="Playlist Name" onChange={onPlaylistNameChange} value={playlistNameInput}/>
                <GrPowerReset 
                    id="newPlaylistButton" 
                    className="playlistLogo" 
                    onClick={clickNewPlaylist}
                    onMouseEnter={mouseEnterMessageNew}
                    onMouseLeave={mouseLeaveMessageNew}
                />
                <FaRegSave 
                    id="savePlaylistButton" 
                    className="playlistLogo" 
                    onClick={uploadPlaylist} 
                    onMouseEnter={mouseEnterMessageSave}
                    onMouseLeave={mouseLeaveMessageSave}
                />
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
            <h4 className="hoverMessage" style={{opacity: hoverMessageVisible, top: hoverPosition.y + 10, left: hoverPosition.x - 100}}>{hoverMessage}</h4>
        </div>
    );
}
