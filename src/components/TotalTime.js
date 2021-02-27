import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./TotalTime.css";
import spreadTime from "../util/spreadTime"
import { Unsubscribe } from "@material-ui/icons";
import {useDispatch} from "react-redux"
import { getAllQuestions } from "../features/Questions/questionSlice";

function TotalTime({show}) {
const dispatch=useDispatch()
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  const { totalTime } = useSelector((state) => state.question);
  console.log(totalTime);

  useEffect(() => {
    const totalTimeString = spreadTime(totalTime);
    const timeStringArray = totalTimeString.split(":");
    setTimerSeconds(+timeStringArray[2]);
    setTimerMinutes(+timeStringArray[1]);
    setTimerHours(+timeStringArray[0]);
  }, [totalTime]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (timerSeconds > 0) {
        setTimerSeconds((prevS) => prevS - 1);
      }
      if (timerSeconds === 0) {
        if (timerMinutes === 0) {
          if (timerHours === 0) {
            show();
            dispatch(getAllQuestions({
              totalQuestions:"",
            }))
            clearInterval(interval);
            

          } else {
            setTimerHours((prevH) => prevH - 1);
            setTimerMinutes(59);
            setTimerSeconds(59);
          }
        } else {
          setTimerMinutes((prevM) => prevM - 1);
          setTimerSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  });
  return (
    <section className="timer">
      <div className="">
        {/* Hours  */}
        <section className="">
          <p>{timerHours}</p>
          <p>
            <small>Hours</small>
          </p>
        </section>
        <span>:</span>

        {/* Minutes  */}
        <section className="">
          <p>{timerMinutes}</p>
          <p>
            <small>Mins</small>
          </p>
        </section>
        <span>:</span>

        {/* Seconds */}
        <section className="">
          <p>{timerSeconds}</p>
          <p>
            <small>Sec </small>
          </p>
        </section>
      </div>
    </section>
  );
}

export default TotalTime;
