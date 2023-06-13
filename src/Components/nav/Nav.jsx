import { useState, useEffect } from "react";
import navcss from "./Nav.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setfalse, setvaluefalse } from "../../app/features/Checkinglogin";
import { NavLink, useNavigate } from "react-router-dom";

const Nav = () => {
  const navi = useNavigate();
  const count = useSelector((state) => state.checks.value);
  //fetch data from redux tool kit
  const [checking, setchecking] = useState(count); // its set count if count is true or
  const dispatch = useDispatch();

  const logout = (e) => {
    setchecking(false);
    dispatch(setvaluefalse(false));
    dispatch(setfalse(false));
    navi("/");
  };
  const navis = () => {
    setchecking(false);
    dispatch(setvaluefalse());
    dispatch(setfalse(false));
    navi("/Signup");
  };

  useEffect(() => {}, []);
  return (
    <>
      <nav className={navcss.navbar_main_block}>
        <NavLink className={navcss.feedback} to="/">
          Feedback
        </NavLink>

        {checking ? (
          <section className={navcss.photo_icon_main_block}>
            <div className={navcss.logout} onClick={logout}>
              Log out
            </div>
            <div className={navcss.hello}> Hello!</div>
            <img
              className={navcss.image}
              src="https://www.mangopeopleshop.com/cdn/shop/files/pretty-pink-plush-teddy-bear-toy-186_1200x1200.jpg?v=1683302290"
              alt=""
              srcSet=""
            />
          </section>
        ) : (
          <section className={navcss.login_signup_main_block}>
            <NavLink className={navcss.login} to="/Login">
              Log in
            </NavLink>
            <button className={navcss.signup} onClick={navis}>
              {" "}
              Sign up
            </button>
          </section>
        )}
      </nav>
    </>
  );
};

export default Nav;
