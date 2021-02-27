import React, { useState } from "react";
import "./Register.css";
import FacebookIcon from "@material-ui/icons/Facebook";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import { postRequest } from "../util/fetch";
import {useDispatch} from "react-redux"
import {registerNewUser, RegisterUser} from "../features/user/userSlice"

function Register() {
    const dispatch=useDispatch();
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    //   Validation

    const { firstName, lastName, email, password, confirmPassword } = state;

    const data = {
      firstName,
      lastName,
      email,
      password,
      password_confirmation: confirmPassword,
    };
    
     dispatch(registerNewUser(data))
 
  };

  return (
    <form className="form" onSubmit={registerUser}>
      <div className="logo">Quiz APP</div>
      {/* TITLE */}
      <h2 className="form__title">Register</h2>
      {/* FISRT NAME  $ LAST NAME */}
      <div className="form__names">
        <input
          type="text"
          placeholder="enter Firstname"
          name="firstName"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="enter Lastname"
          name="lastName"
          onChange={handleChange}
        />
      </div>
      {/* EMAIL */}
      <input
        type="email"
        name="email"
        onChange={handleChange}
        placeholder="Enter Email..."
      />
      {/* PASWWORD */}
      <input
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="Password"
      />
      {/* CNFRIM PASSWORD */}
      <input
        type="password"
        name="confirmPassword"
        onChange={handleChange}
        placeholder="Confirm Password"
      />

      {/* BUTTONS
            CREATE ACCOUNT
          REGISTER WITH FACEBOOK*/}
      <button className="form__button createBtn">
        <ExitToAppIcon className="form__icon" />
        Create Account
      </button>

      <button className="form__button" type="submit">
        <FacebookIcon className="form__icon" />
        Register with Facebook
      </button>

      {/* LINKS */}
      <div className="links">
        <span className="mr-1">Already have an account?</span>
        <Link to="/login">
          <span>Log in</span>
        </Link>
      </div>
    </form>
  );
}

export default Register;
