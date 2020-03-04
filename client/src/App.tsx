import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";

import PrivateRoute from "./components/common/PrivateRoute";

//import component
import Login from "./components/auth/Login";
import Main from "./components/dashboard/Main";
import StudentForm from "./components/dashboard/StudentForm";
import EditStudent from "./components/dashboard/EditStudent";
import Student from "./components/dashboard/Student";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Main} />
        <PrivateRoute exact path="/addstudent" component={StudentForm} />
        <PrivateRoute exact path="/students" component={Student} />
        <PrivateRoute exact path="/student/:id" component={EditStudent} />
      </Switch>
    </Router>
  );
};

export default App;
