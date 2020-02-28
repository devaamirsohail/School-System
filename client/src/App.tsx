import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";

import { isAuth } from "./utils/common/helpers";
import PrivateRoute from "./components/common/PrivateRoute";

//import component
import Login from "./components/auth/Login";
import Main from "./components/dashboard/Main";
import AddStudent from "./components/dashboard/AddStudent";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Main} />
        <PrivateRoute exact path="/addstudent" component={AddStudent} />
      </Switch>
    </Router>
  );
};

export default App;
