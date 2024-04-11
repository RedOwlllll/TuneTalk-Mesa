import React from "react";
import "../css/App.css"; // NOTE: put 2 . ("..") since this file is in it's own folder too. 
// test server
import { useState, useEffect } from "react";
import {getTest} from "./functions/test";

function Login() {
    const [data, setData] = useState("Login");

    useEffect(() => {
        getTest()
            .them((res) => {
            setData(res.message);
            })
            .catch(err => console.log(err));
    }, []);
    
    return (
        <div className="home-page">
            <h1>Login</h1> 
            
        </div>
    );
}

export default Login;
