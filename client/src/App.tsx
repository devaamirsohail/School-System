import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";

import PrivateRoute from "./components/common/PrivateRoute";

//import component
import Login from "./components/auth/Login";
import Main from "./components/dashboard/Main";
import StudentForm from "./components/dashboard/Student/StudentForm";
import EditStudent from "./components/dashboard/Student/EditStudent";
import Student from "./components/dashboard/Student/Student";
import TeacherForm from "./components/dashboard/Teacher/TeacherForm";
import EditTeacher from "./components/dashboard/Teacher/EditTeacher";
import Teacher from "./components/dashboard/Teacher/Teacher";

const App: React.FC = () => {
  return (
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
      </Switch>
    </Router>
  );
};

export default App;
