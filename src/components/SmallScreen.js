import React from "react";

export function SmallScreen ( {currentScreen, toggleScreen, ballPosition} ) {

    function onClick() {
        
        if (currentScreen === "Search for Tracks") {
            toggleScreen("Playlist");
        } else {
            toggleScreen("Search for Tracks");
        }
    }


    return (
        <div className="smallScreen">
            <div id="toggleBorder" onClick={onClick}>
                <div id="toggleBall" style={{left:ballPosition}}>

                </div>
            </div>
            <h2>{currentScreen}</h2>
        </div>
    )
}