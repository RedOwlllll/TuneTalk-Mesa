import React from "react";
import "../css/App.css"; // NOTE: put 2 . ("..") since this file is in it's own folder too. 
// test API, two line below
import { useState, useEffect } from "react";
import {getTest} from "./../functions/test";

function Login() {
    // test API
    const [data, setData] = useState("Login");

    useEffect(() => {
        getTest()
            .then((res) => {
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
