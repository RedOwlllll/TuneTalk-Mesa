import "./css/App.css";
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Friends from './pages/Friends';
import Community from './pages/Community';
import Account from './pages/Account';
import Login from "./pages/Login";
import { Navbar } from "./Navbar";
import Menu from "./pages/Menu";
import { UserProvider } from "./UserState";
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
    return (
      <div className="App">
        <UserProvider>
          <Navbar/> 
            <Routes>
              <Route path="/" element={<Menu />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/community" element={<Community />} />
              <Route path="/account" element={<Account />} />
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