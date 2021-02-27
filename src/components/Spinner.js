import React from 'react'
import CircularProgress from "@material-ui/core/CircularProgress";
import "./Spinner.css"
import { purple } from "@material-ui/core/colors";

function Spinner() {
    return (
      <div className="spinnerCont">
        <CircularProgress style={{ color: purple[500] }} className="spinner" />
      </div>
    );
}

export default Spinner
