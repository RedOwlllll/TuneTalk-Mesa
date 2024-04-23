import "./css/App.css";
import { Route, Routes } from "react-router-dom";
//import { useState } from "react";
import { UserProvider } from "./UserState";
import { Navbar } from "./Navbar";
import { Menu } from "./pages/Menu";
import { Home } from './pages/Home';
import { Friends } from './pages/Friends';
import { Community } from './pages/Community';
import { Login } from "./pages/Login";
import { Register } from './pages/UserAccount/Register'; // Adjusted path
import { SpotifyLogin } from './pages/UserAccount/SpotifyLogin'; // Adjusted path

//import genre
import Pop from './pages/genres/Pop';
import Rock from './pages/genres/Rock';
import Country from './pages/genres/Country';
import Electronic from './pages/genres/Electronic';
import Hiphop from './pages/genres/Hiphop';
import Indie from './pages/genres/Indie';
import Kpop from './pages/genres/Kpop';
import Metal from './pages/genres/Metal';
import RNB from './pages/genres/RNB';
import Classical from './pages/genres/Classical';

function App() {

    //const [userAccount, setUserAccount] = useState(""); // State to hold authenticated user's email
    const loggedIn = window.localStorage.getItem("isLoggedIn");
    console.log(loggedIn, "login");

    return (
      <div className="App">
        <UserProvider>
          <Navbar /> 
            <Routes>
              <Route path="/" element={<Menu />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/account/login" element={<Login />} />
              <Route path="/account/register" element={<Register />} />
              <Route path="/account/spotify" element={<SpotifyLogin />} />
              <Route path="/home" element={<Home />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/community" element={<Community />} />
              <Route path="/login" element={<Login />} />
              <Route path="/pop" element={<Pop />} />
              <Route path="/rock" element={<Rock />} />
              <Route path="/Country" element={<Country />} />
              <Route path="/Electronic" element={<Electronic />} />
              <Route path="/Hiphop" element={<Hiphop />} />
              <Route path="/Indie" element={<Indie />} />
              <Route path="/Kpop" element={<Kpop />} />
              <Route path="/Metal" element={<Metal />} />
              <Route path="/RNB" element={<RNB />} />
              <Route path="/Classical" element={<Classical />} />
            </Routes>
        </UserProvider>
      </div>
    );
}

export default App;