import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTracks } from "./trackSlice";
import { addTrackToPlaylist } from "../playlist/playlistSlice";
import { v4 as uuidv4 } from 'uuid';
import { Search } from '../search/Search';
import { IoIosAddCircleOutline, IoIosCheckmarkCircleOutline  } from "react-icons/io";

export function Tracklist () {
    const dispatch = useDispatch();
    const tracks = useSelector(selectTracks);
    const [ addFlash, setAddFlash ] = useState("");
    const [ tickOpacity, setTickOpacity] = useState(0);
    
    const addTrack = (track) => {
        const trackWithUID = {
            ...track,
            UID: uuidv4(),
        }
        dispatch(addTrackToPlaylist(trackWithUID));
        setAddFlash(track.id);
        setTickOpacity(1);
        setTimeout(() => {
            setTickOpacity(0);
        }, 500)
        setTimeout(() => {
            setAddFlash("");
            setTickOpacity(0);
        }, 1000)
    }

    return (
        <div className="box"  id="tracklist">
            <Search />
            <div className="tracklist">
            {tracks ? Object.values(tracks).map(track => (
                <div className="track" key={track.id} onClick={() => addTrack(track)}>
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
                        {addFlash === track.id ?
                            <IoIosCheckmarkCircleOutline style={{opacity: tickOpacity}} className="addSong" id="addSongTick" /> 
                        :
                            <IoIosAddCircleOutline className="addSong" />
                        }                    
                </div>                
            )) : null}
            </div>
        </div>
    )
}