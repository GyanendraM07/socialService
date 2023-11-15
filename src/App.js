import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Fetch from "./components/Fetch";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Mainpage from "./components/Mainpage";
import Nav from "./components/Nav";
import './components/Login.css';
import Posts from "./components/Posts";
import Home from "./components/Home"
import Profile from "./components/Profile";
function App() {
  return (
    <>

      <BrowserRouter>
        {/* <Nav /> */}
        <Mainpage />
        <Routes>
          {/* <Route path="/signup" element={<Signup/>} />  */}
          <Route path="/showpost" element={<Home/>} /> 
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Routes>
          
        </Routes>
      </BrowserRouter>


      {/* <BrowserRouter>
    <Nav/>
      <Routes>
        <Route path="/mainpage" index element={<Mainpage />} />
        <Route path="/signpage" index element={<Signup />} />
        <Route path="/homepage" index element={<Home />} />
      </Routes>
    </BrowserRouter> */}
    </>
  );
}

export default App;
