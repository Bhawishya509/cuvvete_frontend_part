import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Components/login/Login.jsx";
import Signup from "../Components/signup/Signup.jsx";
import Home from "../Components/homepage/Homepage.jsx";
const Routess = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default Routess;
