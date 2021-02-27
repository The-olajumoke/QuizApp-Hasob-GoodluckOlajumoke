import React, { useState } from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { postRequest } from "../util/fetch";
import {sendQuestion} from "../features/Questions/questionSlice"
import Header from "./Header";
import "./UserLandingPage.css";
import "./QuizMaster.css";
import "./Modal.css";
import { useDispatch } from "react-redux";
import { QuestionAnswer,DoneAll,DeleteForever,LibraryAdd,AlarmAdd, ArrowBack } from "@material-ui/icons";

function QuizMaster() {
const dispatch = useDispatch()
  // STATES
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [showTimerModal, setShowTimerModal] = useState(false);

const [state, setState] = useState({
  hours: "",
  minutes: "",
  seconds: "",
});
  const [options, setOptions] = useState([]);
  const [textInputValue, setTextInputValue] = useState("");
  const [question, setQuestion] = useState("");
  const [radioValue, setRadioValue]=useState('')
  
  //   FUNCTIONS
  function openAnswerModal() {
    setShowAnswerModal((prev) => !prev);
  }
  function openTimerModal() {
    setShowTimerModal((prev) => !prev);
  }
  const handleQuestion = (e) => {
    setQuestion(e.target.value);
    // setQuestion("");
  };
  const handleOptionsInput =(e)=>{
      setTextInputValue(e.target.value)
  }
  const handleSettingOption =(e) =>{
      if((e.keyCode==="13" || e.key==="Enter") && e.target.value!=="" && options.length <4){
          e.preventDefault();
          setOptions((prev) =>[...prev,textInputValue])
          setTextInputValue("")
      }
  }
  
const handleChange = ({ target: { name, value } }) => {
  if (name === "hours") {
    setState({ ...state, [name]: value * 3600000 });
  }
  if (name === "minutes") {
    setState({ ...state, [name]: value * 60000 });
  }
  if (name === "seconds") {
    setState({ ...state, [name]: value * 1000 });
  }

};


  function maxLengthCheck(object) {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  }


     const time = state.hours + state.minutes + state.seconds;
     const eachQuestion = [question, options, radioValue, time];

     const answers = options.map((option) => ({
       answer: `${option}`,
       correct: radioValue === option,
     }));

     const data = {
       question: question,
       answers,
       time,
     };

  const postQuestion=(e)=>{
      e.preventDefault();
 setShowTimerModal((prev) => !prev);
  dispatch(sendQuestion(data))
 }
 

  return (
    <div className="user">
      <Header
        title="Quiz Name"
        desc="Give me a description of the name and purpose of this Quiz"
      />
      <div className="user__body">
        <div className="user__color"></div>
        <div className="user__content quiz__content">
          {/* Input field  QUESTION*/}
          <div className="quiz__question">
            <input
              type="text"
              placeholder="input Question"
              onChange={handleQuestion}
              name="question"
            />
          </div>
          {/* INPUT FIELD oPTIONS */}
          <div className="quiz__question">
            <input
              type="text"
              placeholder="input Answers"
              onChange={handleOptionsInput}
              name="question"
              onKeyUp={handleSettingOption}
              value={textInputValue}
            />
          </div>
          <div className="w-100 quiz__options">
            {options.map((option, i) => (
              <div
                key={i}
                className="d-flex mt-2 align-items-center justify-content-start"
              >
                <p className="m-0">option{i + 1}:</p>
                <h5
                  className="w-50"
                  value={option}
                  placeholder="option 1"
                  name="option1"
                >
                  {option}
                </h5>
              </div>
            ))}
          </div>

          <div className="quiz__icons">
            <div className="icon">
              <DoneAll onClick={openAnswerModal} />

              {/*///// ANSWER MODAL */}
              {showAnswerModal ? (
                <div className="icon__modal">
                  <div className="modal__title">
                    <div className="d-flex align-items-center border-bottom border-dark">
                      <DoneAll className="modal__icon" />
                      <h5>Choose correct answer</h5>
                    </div>
                  </div>
                  <div className="modal__options mt-3">
                    {options.map((option, i) => (
                      <div className="  d-flex mt-2 align-items-center justify-content-base text-dark">
                        <input
                          type="radio"
                          name="option"
                          id="1"
                          value={option}
                          onClick={() => setRadioValue(option)}
                        />
                        <h5 className="h5 ">{option}</h5>
                      </div>
                    ))}
                  </div>
                  <div className="modal__btnCont">
                    <button
                      onClick={() => setShowAnswerModal((prev) => !prev)}
                      className="modal__btn"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : null}

              <p>Answer</p>
            </div>
            <div className="icon">
              <QuestionAnswer />

              <p>Copy</p>
            </div>
            <div className="icon">
              <LibraryAdd />
              <p>Add </p>
            </div>
            <div className="icon">
              <DeleteForever />
              <p>Trash</p>
            </div>
            <div className="icon">
              <AlarmAdd onClick={openTimerModal} />
              <p>Timer</p>

              {showTimerModal ? (
                <div className="icon__modal">
                  <div className="modal__title">
                    <div className="d-flex align-items-center border-bottom border-dark">
                      <AlarmAdd className="modal__icon" />
                      <h5>Set Timer</h5>
                    </div>
                  </div>
                  <div className="modal__options timer__options ">
                    <div className="timer__names">
                      <p>Hours</p>:<p>Minutes</p>:<p>Seconds</p>
                    </div>
                    <div className="timer__inputs">
                      <input
                        type="tel"
                        name="hours"
                        min="0"
                        max="24"
                        id=""
                        placeholder="00"
                        maxLength="2"
                        onInput={maxLengthCheck}
                        onChange={handleChange}
                      />
                      <input
                        type="tel"
                        name="minutes"
                        min="0"
                        max="60"
                        id=""
                        placeholder="00"
                        maxLength="2"
                        onInput={maxLengthCheck}
                        onChange={handleChange}
                      />

                      <input
                        type="tel"
                        name="seconds"
                        min="0"
                        max="60"
                        id=""
                        placeholder="00"
                        maxLength="2"
                        onInput={maxLengthCheck}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-end mt-5">
                    <button
                      onClick={postQuestion}
                      className="answer__btn px-5 "
                    >
                      Set
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizMaster;

