// swal("Are you sure you want to do this?", {
//   buttons: ["Oh noez!", true],
// });
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Header from "./Header";
import history from "../util/history";
import "./Landing.css";


function Landing() {
const dispatch = useDispatch()
  return (
    <div className="user">
      <Header
        title="Welcome to Quiz App"
        desc="Test your Knowledge on various areas.....are you up to the task?"
      />{" "}
      <div className="user__body">
        <div className="user__color"></div>
        <div className="user__content">
          <h4 className="landing__text">
            At Quiz App you answer various questions based on your selected
            options.
            <h5>Click on the "Sign up" button to create an account</h5>
            <h5>Click on the "Log in" button to start your quiz</h5>
          </h4>
          <div className="d-flex w-100">
            <button
              className="landingBtn"
              onClick={() => history.push("/login")}
            >
              Log In
            </button>
            <button
              className="landingBtn"
              onClick={() => history.push("/signup")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
