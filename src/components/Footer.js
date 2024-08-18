import React from "react";
import { FaSpotify } from "react-icons/fa";
import './footer.css';


export function Footer () {
    return (
        <div className="footer">
            <p>Jamming created by<b> <a href="https://jonporterfolio.com/" target="_blank" rel="noreferrer" >Jon Porter</a></b></p>
            <div id="spotify">
                < FaSpotify />
                <p>Powered by Spotify</p>
            </div>
        </div>
    )
}