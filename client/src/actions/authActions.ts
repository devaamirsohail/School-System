import axios from "axios";

import { authenticate, signout } from "../utils/common/helpers";

import { GET_ERRORS, CLEAR_ERRORS, SET_CURRENT_USER, LOADING } from "./types";

//Login - GET User
export const loginUser = (userData: any, history: any) => (dispatch: any) => {
  axios
    .post(`${process.env.REACT_APP_API}/api/login`, userData)
    .then(res => {
      //set token to local storage and cookie
      authenticate(res, () => {
        history.push("/dashboard");
      });
      const { user } = res.data;
      //set current user
      dispatch(setCurrentUser(user));
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Set Login User
export const setCurrentUser = (decoded: any) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => (dispatch: any) => {
  //remove token from local storage
  signout();
  //set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  dispatch(clearErrors());
};
//Set Loading state
export const setLoading = () => {
  return {
    type: LOADING
  };
};
//Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
