import React from "react";
import './SignIn.css';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useState, useContext, useEffect } from "react";
import { context } from "../ContextApi/context"
import { useNavigate } from "react-router-dom"
import TopCircle from "../../Images/Ellipse-31.png"
import BottomCircle from "../../Images/Ellipse-32.png"
import Dots from "../../Images/Dots-Group.png"


const SignIn = () => {
    const navigate = useNavigate()
    const { signInUser } = useContext(context);
    const [userDetailes, setUserDetailes] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({})
    const [submit, setsubmit] = useState(false);
    const [eyeClick, setEyeClick] = useState(false);
    const [passwordtype, setPasswordtype] = useState("password");

    const handleEyeClick = () => {
        setEyeClick(false)
        if (eyeClick) {
            setPasswordtype("text")
        }
        else {
            setPasswordtype("password")
            setEyeClick(true)
        }

    }
    const handleChange = (e) => {
        setUserDetailes({ ...userDetailes, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(userDetailes));
        setsubmit(true);
    }
    useEffect(() => {
        console.log(errors)
        if (Object.keys(errors).length == 0 && submit) {
            signInUser(userDetailes)
        }
    }, [errors])
    const validate = (values) => {
        const error = {};
        const regex_email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i
        if (!values.email) {
            error.email = "*email is required"
        }
        else if (!regex_email.test(values.email)) {
            error.email = "*email is invalid"
        }
        if (!values.password) {
            error.password = "*password is required"
        }
        return error
    }


    return (
        <div className="white-container">
            <img src={TopCircle} alt="" className="top-circle" />
            <div className="signIn-container">
                <img src={Dots} alt="" className="dots-1" />
                <div className="signIn-header">
                    <h4>Logo</h4>
                    <p>Enter your credentials to access your account</p>
                </div>
                <form className="signIn-form" method="POST" onSubmit={handleSubmit}>
                    <div className="email">
                        <input
                            className="email-input"
                            type="text"
                            name="email"
                            placeholder="Mail ID"
                            onChange={handleChange}
                        />
                        <p style={{ color: "red" }}>{errors.email}</p>
                    </div>

                    <div className="password">
                        <input className="password-input"
                            type={passwordtype}
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                        />
                        {
                            (eyeClick) ? <AiFillEye className="eye" onClick={handleEyeClick} /> : <AiFillEyeInvisible className="eye" onClick={handleEyeClick} />
                        }
                    </div>
                    <p style={{ color: "red" }}>{errors.password}</p>
                    <button className="button-1">Sign In</button>
                </form>
                <button className="button-2" onClick={() => navigate('/register')}>Sign Up</button>
                <img src={Dots} alt="" className="dots-2" />
            </div>
            <img src={BottomCircle} alt="" className="bottom-circle" />
        </div>
    )
}


export default SignIn;