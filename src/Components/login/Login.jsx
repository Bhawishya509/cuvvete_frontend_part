import { useState, useEffect } from "react";
import logincss from "./login.module.css";
import { HiOutlineMail } from "react-icons/hi";
import { MdLock } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../nav/Nav";
import { useDispatch } from "react-redux";
import {
  setsignup,
  settrue,
  setvaluefalse,
} from "../../app/features/Checkinglogin";
const Login = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [collectdata, setcollectdata] = useState({
    email: "",
    password: "",
  });
  // const [flag, setFlag] = useState(false)
  // const [penModal, setOpenModal] = useState(true);

  const changes = (e) => {
    const { name, value } = e.target;
    setcollectdata((old_data) => {
      return { ...old_data, [name]: value };
    });
  };

  const sumbit = async (e) => {
    e.preventDefault();
    let response = await axios.post("https://cuvvete-backend.onrender.com/Login", {
      email: collectdata.email,
      password: collectdata.password,
    });

    if (Object.keys(response.data).length === 0)
      alert("please write vaild email id password");
    else {
      dispatch(settrue(true));
      dispatch(setvaluefalse());
      nav("/");
    }
  };
  const handelSignUp = () => {
    dispatch(setvaluefalse());
    dispatch(setsignup(true));
    dispatch(setsignup);
    nav("/");
  };
  useEffect(() => {}, []);

  return (
    <>
      <Nav />
      <div className={logincss.modalBackground}>
        <main className={logincss.modalContainer}>
          <div className={logincss.body}>
            <form className={logincss.form} method="post" onSubmit={sumbit}>
              <section className={logincss.input_icon1_main_block1}>
                <HiOutlineMail className={logincss.icon1} />
                <input
                  type="text"
                  className={logincss.input1}
                  placeholder="Email"
                  value={collectdata.email}
                  name="email"
                  onChange={changes}
                />
              </section>
              <section className={logincss.input_icon2_main_block2}>
                <MdLock className={logincss.icon2} />
                <input
                  type="password"
                  className={logincss.input2}
                  placeholder="Password"
                  value={collectdata.password}
                  name="password"
                  onChange={changes}
                />
              </section>

              <section className={logincss.link_main_block}>
                <div className={logincss.donthavetext}>
                  Don’t have an account?
                </div>
                <div className={logincss.signup} onClick={handelSignUp}>
                  Sign up
                </div>
              </section>
              <div className={logincss.footer}>
                <button className={logincss.button} id="cancelBtn">
                  Log in
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Login;
