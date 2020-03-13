import React, { useReducer, useEffect } from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import App from "./App";
import jwt_decode from "jwt-decode";

// Reducers
import { authReducer, initialState } from "./context/authReducer";
// Contexts
import { Provider as AuthProvider } from "./context/authContext";
//Helpers
import { getCookie, signout } from "./utils/common/helpers";

const Index = () => {
  const [state] = useReducer(authReducer, initialState);
  //   const [state] = useAut hState;
  const token = getCookie("token");
  const user = JSON.parse(localStorage.getItem("user")!);

  useEffect(() => {
    if (token) {
      const decoded: any = jwt_decode(token);
      //Check for expired token
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        //Logout user
        //Redirect to Login
        <Redirect to="/" /> && signout();
        state.isAuthenticated = false;
        state.user = {};
      } else {
        state.isAuthenticated = true;
        state.user = user;
      }
    } else {
      signout();
    }
  }, []);

  return (
    <AuthProvider value={initialState}>
      <App />;
    </AuthProvider>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
