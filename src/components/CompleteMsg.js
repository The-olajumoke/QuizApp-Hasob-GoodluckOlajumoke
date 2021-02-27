import React from 'react'
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "./CompleteMsg.css"
import {useSelector} from "react-redux"
import { DoneAll } from '@material-ui/icons';
function CompleteMsg() {
  const {score,numberOfQuestion} = useSelector((state) => state.question);

    return (
      <div className="cover">
        <div className="completeMsg">
          <DoneAll className="completeMsg__icon" />
          <h2>Submitted!</h2>
          <h4>You answered correctly: </h4>
          <h4>{score} / {numberOfQuestion}</h4>
        </div>
      </div>
    );
}

export default CompleteMsg
