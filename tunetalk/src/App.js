import "./css/App.css";
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Friends from './pages/Friends';
import Community from './pages/Community';
import Account from './pages/Account';
import Login from "./pages/Login";
import { Navbar } from "./Navbar";

function App() {
    return (
      <div className="App">
        <Navbar/> 
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/community" element={<Community />} />
            <Route path="/account" element={<Account />} />
            <Route path="/login" element={<Login />} />
          </Routes>
      </div>
    );
}

export default App;