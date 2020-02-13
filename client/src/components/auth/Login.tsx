import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { History, LocationState } from "history";

import { authenticate, isAuth } from "../../utils/common/helpers";

import "./auth.scss";

interface LoginComponentProps {
  someOfYourOwnProps: any;
  history: History<LocationState>;
  someMorePropsIfNeedIt: any;
}

const Login = (props: LoginComponentProps) => {
  const [values, setValues] = useState({
    email: "",
    password: ""
  });
  const handleChange = (name: string) => (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [name]: event.currentTarget.value });
    console.log(values);
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
        console.log(res);
        authenticate(res, () => {
          isAuth()
            ? props.history.push("/landing")
            : props.history.push("/landing");
        });
        //history.push('/landing')
      })
      .catch(err => {
        console.log(err);
      });
  };
  const { email, password } = values;
  return (
    <div className="login">
      <div className="d-flex justify-content-center h-100">
        <div className="card">
          <div className="card-header text-center">
            <h2>Sign In</h2>
          </div>
          <div className="card-body">
            <form>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-user"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={handleChange("email")}
                />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-key"></i>
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange("password")}
                />
              </div>

              <div className="form-group">
                <input
                  type="submit"
                  value="Login"
                  className="btn float-center btn-block login_btn"
                  onClick={handleSubmit}
                />
              </div>
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center">
              <Link to="#">
                <b>Forgot your password?</b>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
