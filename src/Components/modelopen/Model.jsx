import React, {useState} from "react";
import {BsFillPersonFill} from 'react-icons/bs'
import {HiOutlineMail} from 'react-icons/hi'
import {BiMobile} from 'react-icons/bi'
import { AiFillLock } from 'react-icons/ai'
import { setvaluefalse,alldata_fetch_from_backend,settrue} from "../../app/features/Checkinglogin"
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import "./Model.css"
import Loginmodal from "./Loginmodal";
const Modal = ({ open, onClose, isLoginModal, isProductModal, isSignupModal }) => {
  const navi=useNavigate()
  const dispatch = useDispatch()
  let array_from_redux = useSelector((state) => state.checks.backend_data_fetch_array)
  const [signupData, setSignupData] = useState({name: '', email: '', mobile: '', password: ''});
  const [loginData, setLoginData] = useState({email: '', password: ''});
  const [productData, setProductData] = useState({company: '', category: '', logoUrl: '', productLink: '', description: '' });
  const [flag, setflag] = useState(false)
  const [openModal, setOpenModal] = useState(true);
  const [signupFlag, setSignupFlag] = useState(true)
  const handleSignupChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleProductChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value.trim()
    });
  };
  
  const handleSignupData = async(e) => {
    e.preventDefault()
   ;
    let response = await axios.post("https://cuvvete-backend.onrender.com/Register", {
      name: signupData.name,
      email: signupData.email,
      mobile: signupData.mobile,
      password: signupData.password,
    });

    if (Object.keys(response.data).length === 0)
      alert(
        " please write vaild data password length is greater then 6 and mobile length is equal to 10 "
      );
    else
    {
      dispatch(setvaluefalse())
      dispatch(settrue())
    
      }
  }

  const handleLoginData = async(e) => {
    e.preventDefault()
    let response = await axios.post("https://cuvvete-backend.onrender.com/Login", {
      email: loginData.email,
      password: loginData.password,
    });

    if (Object.keys(response.data).length === 0) alert("please write vaild email id password")
      
    else {
    
      dispatch(settrue(true));
      dispatch(setvaluefalse());
      
    }
    
  }

  const handleLProductData =async (e) => {
    e.preventDefault()
   
    if (productData.company.length > 2 && productData.description.length > 5
      && productData.logoUrl.length > 6 
    ) {
      let data = await axios.post("https://cuvvete-backend.onrender.com/add_product", {
        company: productData.company,
        category: productData.category,
        logoUrl: productData.logoUrl,
        productLink: productData.productLink,
        description: productData.description
      })
   
      array_from_redux = [data.data]
      dispatch(alldata_fetch_from_backend(array_from_redux))
    }
    else alert("please fill remaning data minimum char 5")
  }

  const closeHandler = () => {
    dispatch(setvaluefalse())
    setOpenModal(false);
    
}

  const login_Handler = (e) =>
  {
    setflag(true)
    setSignupFlag(false)
    }

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
          {isSignupModal && signupFlag &&
          <div>
          <h2>Signup to continue</h2>
            <div><BsFillPersonFill/><input type="text" className="inputField" name='name' placeholder="name" onChange={ handleSignupChange } /></div>
            <div><HiOutlineMail/><input type="email" className="inputField" name="email" placeholder="email" onChange={ handleSignupChange } /></div>
            <div><BiMobile/><input type="text" className="inputField" name="mobile" placeholder="mobile" onChange={ handleSignupChange } /></div>
            <div><AiFillLock/><input type="password" className="inputField" name="password" placeholder="password" onChange={ handleSignupChange } /></div>
            <p>Already have a account. <span onClick={login_Handler}>Log in</span></p>
            <button onClick={ handleSignupData } className="ButtonModal">Signup</button>
          </div>
          }
          {isLoginModal && 
          <div>
            <h2>Log in to continue</h2>
            <div><HiOutlineMail/><input className="inputField" name="email" placeholder="email" onChange={ handleLoginChange }/></div>
            <div><AiFillLock/><input className="inputField" name="password" placeholder="password" onChange={ handleLoginChange }/></div>
            <button style={{marginTop : '20px'}} onClick={ handleLoginData } className="ButtonModal">Log in</button>
          </div>
          }
          {isProductModal && 
          <div>
            <h2>Add your product</h2>
            <input className="inputField" name="company" placeholder="Name of the company" onChange={ handleProductChange } />
            <input className="inputField" name="category" placeholder="Category" onChange={ handleProductChange } />
           <input className="inputField" name="logoUrl" placeholder="Add logo url" onChange={ handleProductChange } />
            <input className="inputField" name="productLink" placeholder="Link of product" onChange={ handleProductChange } />
            <input className="inputField" name="description" placeholder="Add description" onChange={ handleProductChange } />
            <button style={{marginTop : '20px'}} onClick={ handleLProductData } className="ButtonModal">+Add</button>
          </div>
          }
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
      {flag && openModal && <Loginmodal open={true} onClose={closeHandler}/>}
    </div>
  );
};

export default Modal;
