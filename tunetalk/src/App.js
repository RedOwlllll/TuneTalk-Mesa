import "./css/App.css";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Register } from "./pages/Register";
import { Home } from './pages/Home';
import { Friends } from './pages/Friends';
import { Community } from './pages/Community';
import { Account } from './pages/Account';
import { Login } from "./pages/Login";
import { UserProvider } from "./UserState";

function App() {
    return (
      <div className="App">
        <UserProvider>
          <Navbar/> 
            <Routes>
              <Route path="/" element={<Register />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/community" element={<Community />} />
              <Route path="/account" element={<Account />} />
              <Route path="/login" element={<Login />} />
            </Routes>
        </UserProvider>
      </div>
    );
}

export default App;