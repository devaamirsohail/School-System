import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";

//import component
import Login from "./components/auth/Login";
import Main from "./components/dashboard/Main";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Main} />
      </Switch>
    </Router>
  );
};

export default App;
