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
import { ProtectedRoute } from "./authentication/ProtectedRoute";

//import genre
import Pop from './pages/CommunityGenres/Pop';
import Rock from './pages/CommunityGenres/Rock';
import Country from './pages/CommunityGenres/Country';
import Electro from './pages/CommunityGenres/Electro';
import Hiphop from './pages/CommunityGenres/Hiphop';
import Indie from './pages/CommunityGenres/Indie';
import Kpop from './pages/CommunityGenres/Kpop';
import Metal from './pages/CommunityGenres/Metal';
import RNB from './pages/CommunityGenres/RNB';
import Classical from './pages/CommunityGenres/Classical';


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
            {/* Protected routes */}
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/friends" element={<ProtectedRoute><Friends /></ProtectedRoute>} />
            <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
            <Route path="/community/pop" element={<ProtectedRoute><Pop /></ProtectedRoute>} />
            <Route path="/community/rock" element={<ProtectedRoute><Rock /></ProtectedRoute>} />
            <Route path="/community/country" element={<ProtectedRoute><Country /></ProtectedRoute>} />
            <Route path="/community/electro" element={<ProtectedRoute><Electro /></ProtectedRoute>} />
            <Route path="/community/hiphop" element={<ProtectedRoute><Hiphop /></ProtectedRoute>} />
            <Route path="/community/indie" element={<ProtectedRoute><Indie /></ProtectedRoute>} />
            <Route path="/community/kpop" element={<ProtectedRoute><Kpop /></ProtectedRoute>} />
            <Route path="/community/metal" element={<ProtectedRoute><Metal /></ProtectedRoute>} />
            <Route path="/community/rnb" element={<ProtectedRoute><RNB /></ProtectedRoute>} />
            <Route path="/community/classical" element={<ProtectedRoute><Classical /></ProtectedRoute>} />
          </Routes>
      </UserProvider>
    </div>
  );
}