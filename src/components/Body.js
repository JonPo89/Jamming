import React, {useState, useEffect} from 'react';
import { Playlist } from '../features/playlist/Playlist';
import { Tracklist } from '../features/tracklist/Tracklist';
import './track.css';
import './body.css';
import { SmallScreen } from './SmallScreen';

export function Body () {
    const [currentScreen, setCurrentScreen] = useState("Search for Tracks");
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 800);
    const [ballPosition, setBallPosition] = useState("0");

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 800);
        };
        

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (currentScreen === "Search for Tracks") {
            setBallPosition("0");
        } else {
            setBallPosition("1.5rem");
        }
    }, [currentScreen]);

    return (
        <div className="body">
            {isSmallScreen ? (
                <>
                    <SmallScreen currentScreen={currentScreen} toggleScreen={setCurrentScreen} ballPosition={ballPosition}/>
                    {currentScreen === "Search for Tracks" ?
                    
                    <Tracklist /> : <Playlist />
                    }
                </>
            ) : (
                <>
                    <Tracklist />
                    <Playlist />
                </>
            )}            
        </div>
    )
}