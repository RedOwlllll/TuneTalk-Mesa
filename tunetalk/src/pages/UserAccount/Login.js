import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useUser } from "../../UserState";
import axios from "axios"; 
import "../../css/App.css";


export const Login = () => {

    const [userLogin, setUserLogin] = useState(""); // Will accept either login or sign up
    const [loginPassword, setLoginPassword] = useState("");
    const [alertMessage, setAlertMessage] = useState(""); // Variable that stores message at the bottom of page depending on whether user input.
    const [user, setUser] = useUser();

    // Variable for email pattern regex
    //const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    // Vairiable to store import useNavigate 
    const navigate = useNavigate();

    // Function that handles what happens login button is clicked.
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        console.log(userLogin, loginPassword);

        // Connect to tunetalklogin api to see whether the input matches in mongodb
        axios.post("http://localhost:8082/api/tunetalklogin", {
            userLogin: userLogin,
            password: loginPassword,
        })
            
        .then((res) => {
            const data = res.data;
            console.log(data, "userLogin"); // when the user is logged in creates a variable called userLogin and sets the value to true
            
            if (data.status === "ok") {
                setAlertMessage("Logged in successfully!");
                setUser ({
                    isAuthenticated: true,
                    email: data.user.email,
                    username: data.user.username
                });
                console.log("user login authenticated");
                
                navigate('/home'); // Will redirect user to the home page. SHOULD BE CHANGED TO SPOTIFY LOGIN LATER
                
                function showNotification() {
                    const notification = new Notification("!TIME TO TUNE IN!", {
                        body: "CLICK ON THIS TO POST YOUR CURRENT OR RECENTLY PLAYED SONG OR ELSE!!"
                    });

                    notification.onclick = function(event) {
                        event.preventDefault(); //prevents the browser from focusing on the Notifications related tab
                        navigate('/friends'); //Should linked to the posting site when merged later
                        window.focus(); // Brings the focus to the newly opened tab
                        if (notification)
                        {
                            notification.close();
                        }
                    }
                }

                //Generates a randome time (in ms) within the day
                const randomTimeGenerator = Math.floor(Math.random() * 24 * 60 * 60 * 1000);
                console.log(randomTimeGenerator); //To test the randomTimeGenerator
                setTimeout(() =>{
                    if(Notification.permission === "granted") 
                    {
                        showNotification(); //Show notifition when random time is generated
                    }
                    else if (Notification.permission !== "denied") 
                    {
                        Notification.requestPermission().then(permission => { //Request permission to show notification
                            if(permission === "granted") 
                            {
                                showNotification();
                            }
                        });
                    }
                }, randomTimeGenerator);
                
                // ****TO USE FOR DEMONSTRATION****
                // if(Notification.permission === "granted")
                // {
                //     showNotification();
                // }
                // else if(Notification.permission !== "denied")
                // {
                //     Notification.requestPermission().then(permission => {
                //         if(permission === "granted")
                //         {
                //             showNotification();
                //         }
                //     });
                // }
            } 
            else if (data.error === "user_not_found") {
                setAlertMessage("User not found. Please check your email address or username again.");
            } 
            else if (data.error === "incorrect_password") {
                setAlertMessage("Incorrect password. Please check password again.");
            } 
            else {
                setAlertMessage("Cannot login. Please check details again.");
            }
        });
    }

    useEffect (() => {
        if (user.isAuthenticated) {
            navigate("/home"); // When user is authenticated, will open the home page. SHOULD BE CHANGED TO SPOTIFY LOGIN LATER
        }
    });

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1>Welcome back</h1>
                <p>Please enter your details to sign in</p><br/>
                <input value={userLogin} onChange={(e) => setUserLogin(e.target.value)} id="userLogin" placeholder="email@gmail.com or username" required/><br/>
                <input value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} type="password" id="loginPassword" placeholder="********" required/>
                <br/>
                <br/><button type="submit">Log In</button><br/>
                <br/>
                { alertMessage && (
                    <div className="alert">{ alertMessage }</div>
                )} <br/>
                <button className="link-btn" type ="button" onClick={() => navigate('/account/register')}>Don't have an account with TuneTalk? Register here.</button><br/>
            </form>
        </div>  
    )
}