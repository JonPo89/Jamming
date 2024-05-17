import React from 'react';
import './Login.css';

//client_id is the id given to me by spotify
const clientId = "61e18bba3548432886c834ad9f732266";
//redirect_uri is the url that will be our website
const redirect_uri = "http://localhost:3000/";
//scope is the things that we are getting permissions for
const scope = [
    "user-read-email",
    "playlist-modify-private",
    "playlist-modify-public",
    "playlist-read-private",
    "user-read-private",
    "user-library-modify",
    "user-read-playback-state",
    "user-modify-playback-state"
 ];


 

 export const resources = [
    clientId,
    redirect_uri
 ]

const auth_url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirect_uri}&scope=${scope.join("%20")}`;

function Login() {
    return (
        <div id="loginButton">
            <a href={auth_url}>
                <h2>Login with Spotify</h2>
            </a>
        </div>
    );

};


export default Login;