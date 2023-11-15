import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from "./components/Login";
import Home from "./components/Mainpage";
import Nav from "./components/Nav";
import Signup from "./components/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePost from './components/Home';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login/>} /> 
          <Route path="/signup" element={<Signup/>} /> 
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
