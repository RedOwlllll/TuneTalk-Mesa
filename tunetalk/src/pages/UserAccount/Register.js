import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useUser } from "../../authentication/UserState";
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
    const usernameRegex = /^[a-zA-Z0-9]{1,15}$/ // Removed underscore and full stop for simplicity
    
    // Vairiable to user import useNavigate 
    const navigate = useNavigate();

    // Function that handles what happens signup button is clicked.
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents page from reloading on empty 
        console.log(registerEmail, registerUsername, registerPassword);

        let incorrectMessage = "";

        // Check the pattern regex for email, username and password is correct before making API call 
        if (!emailRegex.test(registerEmail)) {
            incorrectMessage += "Invalid email address. (Ensure there are no spaces in your email address.) \n" ;
        }
        
        if(!usernameRegex.test(registerUsername)) {
            incorrectMessage += "Invalid username. (Ensure there are no spaces or special characters in your email address.) \n";
        }

        if (!passwordRegex.test(registerPassword)) {
            incorrectMessage += "Password must contain a minimum of eight characters, at least one uppercase letter and one number.\n";
        } 

        if (incorrectMessage) {
            setAlertMessage(incorrectMessage);
            return;
        }

         // Connect to tunetalksignup api
        axios.post("http://localhost:8082/api/tunetalkregister", {
            email: registerEmail,
            username: registerUsername,
            password: registerPassword,
        })
        .then((res) => {
            const data = res.data;
            console.log(data, "userRegister");
            
            if (data.status === "ok") {
                setAlertMessage("You are now registered with TuneTalk!");
                setUser ({
                    email: data.email, // Refer to email object directly (since the email is being registered it should not be in mongodb yet)
                    username: data.username, // Likewise w/ username
                    // isAuthenticated: true - commented out so that when on the register page, protected routes are still protected (they need to connect to spotify).
                });
                console.log("user registration authenticated in TuneTalk");
            } 
            else if (data.error === "email_exists") {
                setAlertMessage("Email is registered already. Please login instead or choose another email.");
            } 
            else if (data.error === "username_exists") {
                setAlertMessage("Username is registered already. Please login instead or choose another username.");
            }
        });  
    }

    // When user email and username is ok, will prompt them to the spotify account page
    useEffect (() => {
        if (user.email && user.username) {
            navigate("/account/spotify"); 
        }
    });

    return (
        <div className="register-container">
            <br/>
            <form className="register-form" onSubmit={handleSubmit}>
                <br/><h1>Create an account</h1>
                <h4>Please enter the required fields below to register.</h4><br/><br/>
                <label>Email:</label><br/>
                <input value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} id="registerEmail" placeholder="email@gmail.com *" required/><br/>
                <label>Username:</label><br/>
                <input value={registerUsername} onChange={(e) => setRegisterUsername (e.target.value)} id="setRegisterUsername" placeholder="username *" required /><br/>
                <label>Password:</label><br/>
                <input value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} type="password" id="registerPassword" placeholder="*********" required/><br/>
                <br/>
                <button type="submit">register</button>
                <br/><br/>
                { alertMessage && (
                    <div className="alert">{ alertMessage }</div>
                )} <br/>
                <button className="link-btn" type ="button" onClick={() => navigate('/account/login')}>Already have an account? Sign in here.</button><br/><br/>
            </form>
            <br/>
        </div>
    )
}