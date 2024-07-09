import React, {useState, useEffect} from "react";
import './header.css';
import { selectUserName } from "../features/authorisation/authorisationSlice";
import { useSelector } from "react-redux";
import { SmallScreen } from "./SmallScreen";

export function Header () {
    const [ rotate, setRotate ] = useState(0);
    const username = useSelector(selectUserName);

    useEffect(() => {
        const interval = setInterval(() => {
            setRotate(rotate + 1);
        }, 10);
        return () => clearInterval(interval);
    })
    
    
    return (
        <div className="header">
            <p id="userGreeting">Hi {username ? <span className="bold">{username}</span> : null}</p>
            <div id="logo">
                <h3 className="logo">ja<div className="spinLogo" style={{rotate:`${rotate}deg`}}>mmm</div>ing</h3>
            </div>
            <div className="backHome"><p>Let's make a playlist!</p></div>
        </div>
    );
}