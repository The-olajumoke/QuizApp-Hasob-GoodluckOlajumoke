// swal("Are you sure you want to do this?", {
//   buttons: ["Oh noez!", true],
// });
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Header from "./Header";
import "./UserLandingPage.css";
import history from "../util/history";
import { logout } from "../features/user/userSlice";
import { getRequest } from "../util/fetch";

import {
  getAllQuestions,
  getQuizArray,
} from "../features/Questions/questionSlice";
import Spinner from "./Spinner";

function Landing() {
const dispatch = useDispatch()
  return (
    <div className="user">
      <Header
        title="Welcome to Quiz App"
        desc="Give me a description of the name and purpose of this Quiz"
      />{" "}
      <div className="user__body">
        <div className="user__color"></div>
        <div className="user__content">
            
          <button onClick={() =>history.push("/login")} className="logBtn">
            Sign Up
          </button>
          <button onClick={() =>history.push("/signup")} className="logBtn">
            Log In
          </button>

        </div>
      </div>
    </div>
  );
}

export default Landing;
