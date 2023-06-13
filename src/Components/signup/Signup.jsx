import { useState, useEffect } from "react";
import signupcss from "./Signup.module.css";
import { HiOutlineMail } from "react-icons/hi";
import { MdLock } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineMobile } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setlogin, settrue, setvaluefalse} from "../../app/features/Checkinglogin";
import axios from "axios";
import Nav from "../nav/Nav";
const Signup = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [collectdatas, setcollectdata] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const changes = (e) => {
    const { name, value } = e.target;
    setcollectdata((old_data) => {
      return { ...old_data, [name]: value };
    });
  };

  const sumbit = async (e) => {
    e.preventDefault();
    let response = await axios.post("https://cuvvete-backend.onrender.com/Register", {
      name: collectdatas.name,
      email: collectdatas.email,
      mobile: collectdatas.mobile,
      password: collectdatas.password,
    });

    if (Object.keys(response.data).length === 0)
      alert(
        " please write vaild data password length is greater then 6 and mobile length is equal to 10 "
      );
    else
    {
      dispatch(setvaluefalse())
      dispatch(settrue())
      nav("/")
      }
  };

  const handelSignUp = () => {
    dispatch(setlogin());

    nav("/");
  };

  useEffect(() => {}, []);
  return (
    <>
      <Nav />
      <div className={signupcss.modalBackground}>
        <main className={signupcss.modalContainer}>
          <div className={signupcss.body}>
            <form className={signupcss.form} method="post" onSubmit={sumbit}>
              <section className={signupcss.input_icon1_main_block1}>
                <BsFillPersonFill className={signupcss.icon1} />
                <input
                  type="text"
                  className={signupcss.input1}
                  placeholder="Name"
                  value={collectdatas.name}
                  name="name"
                  onChange={changes}
                />
              </section>

              <section className={signupcss.input_icon2_main_block2}>
                <HiOutlineMail className={signupcss.icon2} />
                <input
                  type="email"
                  className={signupcss.input2}
                  placeholder="Email"
                  value={collectdatas.email}
                  name="email"
                  onChange={changes}
                />
              </section>

              <section className={signupcss.input_icon3_main_block3}>
                <AiOutlineMobile className={signupcss.icon3} />
                <input
                  type="number"
                  className={signupcss.input3}
                  placeholder="Mobile"
                  value={collectdatas.mobile}
                  name="mobile"
                  onChange={changes}
                />
              </section>

              <section className={signupcss.input_icon4_main_block4}>
                <MdLock className={signupcss.icon4} />
                <input
                  type="password"
                  className={signupcss.input4}
                  placeholder="Password"
                  value={collectdatas.password}
                  name="password"
                  onChange={changes}
                />
              </section>

              <section className={signupcss.link_main_block}>
                <div className={signupcss.donthavetext}>
                  Already have an account?
                </div>
                <div className={signupcss.signup} onClick={handelSignUp}>
                  Log in
                </div>
              </section>
              <div className={signupcss.footer}>
                <button
                  className={signupcss.button}
                  id="cancelBtn"
                  type="sumbit"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Signup;
