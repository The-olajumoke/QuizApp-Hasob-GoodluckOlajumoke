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

function UserLandingPage(props) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const getQuiz = () => {
    setIsLoading(true);
    dispatch(getQuizArray());
    // setIsLoading(false)
  };
  return (
    <div className="user">
      <Header
        title="Quiz Name"
        desc="Give me a description of the name and purpose of this Quiz"
      />{" "}
      <div className="user__body">
        <div className="user__color"></div>
        <div className="user__content">
          {isLoading ? (
            // <p>Loading...</p>
            <Spinner />
          ) : (
            <h2 onClick={getQuiz}>Start Quiz</h2>
          )}
          <div className="">
            <p>This is a timed quiz consisting of various questions </p>
            <p>
              You are required to complete the quiz within 10 minutes before the
              page time off if you fail to complete the quiz before the allote
              dtime , thereby ending the quiz abruptly and endering your attempt
              invalid.
            </p>
          </div>
          <p>
            When you are ready, click on the "start quiz" button and commence
            quiz. goodluck
          </p>
          <button onClick={() => dispatch(logout())} className="logBtn">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserLandingPage;
