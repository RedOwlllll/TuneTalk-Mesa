import "./css/App.css";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./authentication/UserState";
import { Navbar } from "./Navbar";
import { Menu } from "./pages/Menu";
import { Login } from "./pages/UserAccount/Login";
import { Register } from "./pages/UserAccount/Register";
import { SpotifyLogin } from "./pages/UserAccount/SpotifyLogin";
import { Home } from "./pages/Home";
import { Friends } from './pages/Friends';
import { Community } from './pages/Community';

export const App = () => {
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
          </Routes>
      </UserProvider>
    </div>
  );
}