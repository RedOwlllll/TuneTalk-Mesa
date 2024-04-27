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
          </Routes>
      </UserProvider>
    </div>
  );
}