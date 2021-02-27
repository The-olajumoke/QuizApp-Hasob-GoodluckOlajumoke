import React, { useState } from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import { postRequest } from "../util/fetch";
import setAuthorizationToken from "../util/setAuthorizationToken";
import history from "../util/history"
import { loginExistingUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";



function Login() {
   const dispatch = useDispatch()
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };

  const confirmUser = async (e) => {
    e.preventDefault();
    const { email, password } = state;
    const data = { email, password };

    dispatch(loginExistingUser(data))

  };

  return (
    <form className="form" onSubmit={confirmUser}>
      <div className="logo">
      Quiz APP
      </div>
      <h2>Login</h2>


      <input
        type="email"
        name="email"
        onChange={handleChange}
        placeholder="Email Address.."
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
      />
      <button className="form__button createBtn" type="submit">
        <ExitToAppIcon className="form__icon" />
        Log In
      </button>
      <div className="links">
        <span className="mr-2">Don't have an account?</span>
        <Link to="/signup">
          <span>Sign in</span>
        </Link>
      </div>
    </form>
  );
}

export default Login;
