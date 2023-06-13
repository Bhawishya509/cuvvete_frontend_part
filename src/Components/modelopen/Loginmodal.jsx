import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { AiFillLock } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setvaluefalse, settrue } from "../../app/features/Checkinglogin";
import axios from "axios";
import "./Model.css";
const Loginmodal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleLoginData = async (e) => {
    e.preventDefault();

    let response = await axios.post("https://cuvvete-backend.onrender.com/Login", {
      email: loginData.email,
      password: loginData.password,
    });

    if (Object.keys(response.data).length === 0)
      alert("please write vaild email id password");
    else {
      dispatch(settrue(true));
      dispatch(setvaluefalse);
      onClose();
    }
    console.log(loginData);
  };

  if (!open) return null;
  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        <div className="modalLeft">
          <div>
            <h2>Log in to continue</h2>
            <div>
              <HiOutlineMail />
              <input
                className="inputField"
                name="email"
                placeholder="email"
                onChange={handleLoginChange}
              />
            </div>
            <div>
              <AiFillLock />
              <input
                className="inputField"
                name="password"
                placeholder="password"
                onChange={handleLoginChange}
              />
            </div>
            <button
              style={{ marginTop: "20px" }}
              onClick={handleLoginData}
              className="ButtonModal"
            >
              Log in
            </button>
          </div>
        </div>
        <div className="modalRight">
          <p className="closeBtn" onClick={onClose}>
            X
          </p>
          <div className="content">
            <h2>Feedback</h2>
            <p>Add your products and rate other items .....</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginmodal;
