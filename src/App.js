import Navbar from './Components/Header/Navbar';
import About from './Components/Pages/About'
import Home from './Components/Pages/Home'
import Contact from './Components/Pages/Contact'
import NotFound from './Components/Pages/NotFound'
import Profile from './Components/Pages/Profile'
import SignUp from './Components/Pages/SignUp'
import { Routes, Route, Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import Card from './Components/Pages/Card';
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="profile" element={<Profile />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="/cart/:id" element={<Card />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </>
  );
}

export default App;
