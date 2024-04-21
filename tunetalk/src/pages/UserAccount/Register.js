import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useUser } from "../../UserState";
import "../../css/App.css"; 
import axios from "axios";

export const Register = () => {
    
    /* State variables for the input types - useState hook will first get the user input then set that input into the second variable */
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [alertMessage, setAlertMessage] = useState(""); // Variable that stores message at the bottom of page depending on whether user input.
    const [user, setUser] = useUser();

    // Variables to store pattern regex for password and email (dont add semicolon)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()\-_=+{};:,<.>`~]{8,}$/
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ 

    // Vairiable to user import useNavigate 
    const navigate = useNavigate();

    // Function that handles what happens signup button is clicked.
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents page from reloading on empty 
        console.log(registerEmail, registerUsername, registerPassword);

        let incorrectMessage = "";

        // First check the pattern for password and email is correct before making API call 
        if (!emailRegex.test(registerEmail)) {
            incorrectMessage += "Invalid email address. \n" ;
        }

        if (!passwordRegex.test(registerPassword)) {
            incorrectMessage += "Password must contain a minimum of eight characters, at least one uppercase letter and one number.";
        } 

        if (incorrectMessage) {
            setAlertMessage(incorrectMessage);
            return;
        }

         // Connect to tunetalksignup api
        axios.post("http://localhost:8082/api/tunetalksignup", {
            email: registerEmail,
            username: registerUsername,
            password: registerPassword,
        })
            
        .then((res) => {
            const data = res.data;
            console.log(data, "userSignup");
            
            if (data.status === "ok") {
                setAlertMessage("You are now registered with TuneTalk!");
                setUser ({
                    isAuthenticated: true,
                    email: data.email, // Refer to email object directly (since the email is being registered it should not be in mongodb yet)
                    username: data.username // Likewise w/ username
                });
                console.log("user registration authenticated");
            } 
            else if (data.error === "email_exists") {
                setAlertMessage("Email is already in use. Please login instead.");
            } 
            else if (data.error === "username_exists") {
                setAlertMessage("Username is already in use. Please choose another.");
            }
        });  
    }

    // Navigates to home page once sign up is authenticated - SHOULD BE CHANGED TO SPOTIFY LOGIN LATER
    useEffect (() => {
        if (user.isAuthenticated) {
            navigate("/home"); 
        }
    });

    return (

        <div className="register-container">
            <br/>
            <form className="signup-form" onSubmit={handleSubmit}>
                <br/><h1>Create an account</h1>
                <p>Please enter your details to register</p>
                <br/>
                <input value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} id="registerEmail" placeholder="email@gmail.com *" required/><br/>
                <input value={registerUsername} onChange={(e) => setRegisterUsername (e.target.value)} id="setRegisterUsername" placeholder="Username *" required /><br/>
                <input value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} type="password" id="registerPassword" placeholder="******** *" required/><br/>
                <br/>
                <button type="submit">register</button>
                <div className= "required-text"> <br/> (* Required fields must be filled in to create an account)<br/> </div>
                <br/>
                { alertMessage && (
                    <div className="alert">{ alertMessage }</div>
                )} <br/>

                <button className="link-btn" type ="button" onClick={() => navigate('/account/login')}>Already have an account? Sign in here.</button><br/><br/>
            </form>
            <br/>
        </div>
    )
}