import { useState, useContext, useEffect } from "react";
import { context } from "../ContextApi/context"
import TopCircle from "../../Images/Ellipse-31.png"
import BottomCircle from "../../Images/Ellipse-32.png"
import Dots from "../../Images/Dots-Group.png"

const Signup = () => {
  const { signUpUser } = useContext(context);
  const [isSubmit, setIsSubmit] = useState(false)
  const [formErrors, setFormErrors] = useState({});
  const [userdata, setuserdata] = useState({
    email: "",
    password: "",
    confirmPass: ""
  })
  const handlechnge = (e) => {
    const { name, value } = e.target;
    setuserdata({ ...userdata, [name]: value })
  }
  const handlesubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(userdata));
    setIsSubmit(true);


  }
  useEffect(() => {
    console.log(formErrors)
    if (Object.keys(formErrors).length == 0 && isSubmit) {
      signUpUser(userdata)
    }
  }, [formErrors])
  const validate = (values) => {
    const error = {};
    const regex_email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i
    if (!values.email) {
      error.email = "*email is required"
    }
    else if (!regex_email.test(values.email)) {
      error.email = "*email is invalid"
    }
    if (values.password.length < 6) {
      error.password = "*Password must contain atleast 6 letters"
    }
    else if (values.password.length > 16) {
      error.password = "*Password must contain less than 16 letters"
    }
    if (values.confirmPass !== values.password) {
      error.confirmPass = "*password doesnot match"
    }
    return error;
  }
  return (
    <>
      <div className="white-container">
        <img src={TopCircle} alt="" className="top-circle" />
        <div className="signIn-container">
          <img src={Dots} alt="" className="dots-1" />
          <div className="signIn-header">
            <h4>Logo</h4>
            <p>Create New Account</p>
          </div>
          <form method="POST"
            className="signIn-form"
            onSubmit={handlesubmit}>
            <div className="email">
              <input
                className="email-input"
                type="text"
                name="email"
                placeholder="Mail ID"
                onChange={handlechnge} />
            </div>
            <p className="errors" style={{ color: "red" }}>{formErrors.email}</p>
            <div className="password" style={{ position: "relative" }}>
              <input
                className="password-input"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handlechnge} />
            </div>
            <p className="errors" style={{ color: "red" }}>{formErrors.password}</p>
            <div className="password" style={{ position: "relative" }}>
              <input
                className="password-input"
                type="text"
                name="confirmPass"
                placeholder="Confirm Password"
                onChange={handlechnge} />
            </div>
            <p className="errors" style={{ color: "red" }}>{formErrors.confirmPass}</p>
            <button className="button-1">Sign Up</button>
          </form>
          <img src={Dots} alt="" className="dots-2" />
        </div>
        <img src={BottomCircle} alt="" className="bottom-circle" />
      </div>

    </>
  )
}
export default Signup;