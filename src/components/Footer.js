import React from "react";
import { FaSpotify } from "react-icons/fa";
import './footer.css';


export function Footer () {
    return (
        <div className="footer">
            <p>Jamming created by Jon Porter</p>
            <div id="spotify">
                < FaSpotify />
                <p>Powered by Spotify</p>
            </div>
        </div>
    )
}