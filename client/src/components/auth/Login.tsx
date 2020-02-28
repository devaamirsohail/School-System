import React, { useState, useReducer, useContext } from "react";
import axios from "axios";

import { History, LocationState } from "history";

import { authenticate, isAuth } from "../../utils/common/helpers";
import authContext from "../../context/authContext";
import { authReducer, initialState } from "../../context/authReducer";
import { SET_CURRENT_USER } from "../../context/types";
import { Redirect } from "react-router-dom";

interface LoginComponentProps {
  history: History<LocationState>;
}

const Login = (props: LoginComponentProps) => {
  const [values, setValues] = useState({
    email: "test@test.com",
    password: "123456"
  });
  const [state, dispatch] = useReducer(authReducer, initialState);

  const handleChange = (name: string) => (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [name]: event.currentTarget.value });
  };
  const handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const userData = {
      email,
      password
    };
    axios
      .post(`${process.env.REACT_APP_API}/api/login`, userData)
      .then(res => {
        dispatch({
          type: SET_CURRENT_USER,
          payload: res.data.user
        });

        authenticate(res, () => {
          isAuth() ? props.history.push("/dashboard") : props.history.push("/");
        });
        //history.push('/landing')
      })
      .catch(err => {
        console.log(err);
      });
  };
  const { email, password } = values;
  const signinForm = () => (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <a href="../../index2.html">
            <b>School</b>System
          </a>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <form>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={handleChange("email")}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange("password")}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <input
                  type="submit"
                  value="Login"
                  className="btn float-center btn-block btn-primary"
                  onClick={handleSubmit}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  const renderFinal = isAuth() ? <Redirect to="/dashboard" /> : signinForm();

  return <React.Fragment>{renderFinal}</React.Fragment>;
};

export default Login;
