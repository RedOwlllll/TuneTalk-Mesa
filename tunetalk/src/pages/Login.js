import React from "react";
import "../css/App.css"; // NOTE: put 2 . ("..") since this file is in it's own folder too. 

function Login() {
    return (
        <div className="home-page">
            <h1>Login</h1> 
        </div>
    );
}

export default Login;


/*

import React from "react"

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=8b945ef10ea24755b83ac50cede405a0&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login With Spotify
      </a>
    </div>
  )
}
*/