import React, { useState } from "react";
import { Counter } from "./features/counter/Counter";
import "bootstrap/dist/css/bootstrap.min.css";
import { Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import CompleteMsg from "./components/CompleteMsg";
import UserLandingPage from "./components/UserLandingPage";
import QuizMaster from "./components/QuizMaster";
import Question from "./components/Question";
import history from "./util/history"
import TotalTime from "./components/TotalTime";





function App() {


  return (
    <Router history={history}>
      <div className="app">
        <Switch>
          {/* <CompleteMsg/> */}
          <Route path="/" exact component={Question}/>

          <Route path="/login" component={Login} />
          <Route path="/signup" component={Register}/>
          <Route path="/userPage" component={UserLandingPage} />
          <Route path="/setQuiz" component={QuizMaster}/>
          <Route path="/userLanding" component={UserLandingPage} />
          <Route path="/completeMsg" component={CompleteMsg} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
