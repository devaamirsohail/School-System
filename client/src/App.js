import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";

//import component
import Login from "./components/auth/Login";
import Landing from "./components/common/Landing";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/landing" component={Landing} />
      </Switch>
    </Router>
  );
}

export default App;
