import React, { useState, useEffect } from "react";
import Header from "./Header";
import "./Question.css";
import { useDispatch, useSelector } from "react-redux";
import TotalTime from "./TotalTime";

import store from "../app/store";
import Spinner from "./Spinner";
import dummy from "../util/dummy";
import { getAllQuestions } from "../features/Questions/questionSlice";
import { postRequest } from "../util/fetch";
import {getResult} from "../features/Questions/questionSlice"
import { logout } from "../features/user/userSlice";

function Question(props) {
  const { loading, totalQuestions,title,description } = useSelector((state) => state.question);

  const [questionArray, setQuestionArray] = useState();
  const [userAnswers, setUserAnswers] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    const getQuiz = () => {
     
    };

  }, []);

  const [selectedAnswerId, setSelectedAnswerId] = useState();
  const handleOnchange = (e, question) => {
    const selectedAnswer=+e.target.id
    const { id: questionId } = question;

    const questionIndex = userAnswers.findIndex(
      (userAnswer) => userAnswer.questionId === questionId
    );

    if (questionIndex !== -1) {
      userAnswers[questionIndex].selectedAnswer = selectedAnswer;
    } else {
      setUserAnswers([...userAnswers, { questionId, selectedAnswer }]);
    }

  };


  const handleSubmit =(e) => {
    console.log(userAnswers);
    const data = {
      userAnswers,
      quizId:1,
    };
    console.log(data)
    dispatch(getResult(data))
   };
  return totalQuestions.length === 0 ? (
    <Spinner />
  ) : (
    <div className="testing">
      <Header
        title={title}
        desc={description}
      />

      {/* TIMER */}
      <TotalTime show={handleSubmit} />

      <div className="allQuestions">
        {totalQuestions?
          totalQuestions.map((eachQuestion) => (
            <div key={eachQuestion.id} className="question__body">
              <div className="question__color"></div>

              <div
                id={eachQuestion.id}
                className="question"
                // value={selectedAnswerId}
              >
                <div className="question__title">
                  <div className="d-flex align-items-center border-bottom border-dark">
                    <h5>{eachQuestion.question}</h5>
                  </div>
                </div>

                <div
                  className="question__options mt-3"
                  // value={selectedAnswerId}
                >
                  {eachQuestion.answers.map((answer) => {
                    return (
                      <div
                        key={answer.id}
                        className=" w-100  d-flex mt-1 align-items-center justify-content-base"
                      >
                        <input
                          onChange={(e) => handleOnchange(e, eachQuestion)}
                          type="radio"
                          name={eachQuestion.id}
                          id={answer.id}
                          value={answer.answer}
                        />
                        <label className="h5 m-0">{answer.answer}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )):(
        <Spinner/>)
        }
      </div>

      <div className="question__links">
        <button onClick={() =>{
          dispatch(logout())
        }}>Log Out</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default Question;
