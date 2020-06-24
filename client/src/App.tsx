import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

//import component
import Login from "./components/auth/Login";
import Main from "./components/dashboard/Main";
import StudentForm from "./components/dashboard/Student/AddStudent";
import EditStudent from "./components/dashboard/Student/EditStudent";
import Student from "./components/dashboard/Student/Student";
import TeacherForm from "./components/dashboard/Teacher/AddTeacher";
import EditTeacher from "./components/dashboard/Teacher/EditTeacher";
import Teacher from "./components/dashboard/Teacher/Teacher";
import Subject from "./components/dashboard/Subject/Subject";
import Classes from "./components/dashboard/Classes/Classes";
import Section from "./components/dashboard/Section/Section";
import ModalAlert from "./components/dashboard/common/Modal";

import { getCookie } from "./utils/common/helpers";
import setAuthToken from "./utils/common/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

//Check for token
const token = getCookie("token");
const user: any = localStorage.getItem("user");
if (token) {
  //Decode token and get user info and expo
  const decoded: any = jwt_decode(token);
  setAuthToken(token);
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(JSON.parse(user)));
  //Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());
    //Redirect to Login
    window.location.href = "/";
  }
}

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Main} />
          <PrivateRoute exact path="/addstudent" component={StudentForm} />
          <PrivateRoute exact path="/students" component={Student} />
          <PrivateRoute exact path="/student/:id" component={EditStudent} />
          <PrivateRoute exact path="/addteacher" component={TeacherForm} />
          <PrivateRoute exact path="/teachers" component={Teacher} />
          <PrivateRoute exact path="/teacher/:id" component={EditTeacher} />
          <PrivateRoute exact path="/subjects" component={Subject} />
          <PrivateRoute exact path="/classes" component={Classes} />
          <PrivateRoute exact path="/section" component={Section} />
        </Switch>
        <ModalAlert />
      </Router>
    </Provider>
  );
};

export default App;
