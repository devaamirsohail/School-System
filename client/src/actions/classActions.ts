import axios from "axios";

import {
  GET_ERRORS,
  SET_CLASSES,
  SET_CLASS,
  CLEAR_CLASS,
  CLASSES_LOADING,
  ENABLE_MODAL
} from "./types";

//Get All Classes
export const getAllClasses = () => (dispatch: any) => {
  dispatch(setClassesLoading());
  axios({
    method: "GET",
    url: `${process.env.REACT_APP_API}/api/class/all`
  })
    .then(res => {
      dispatch({
        type: SET_CLASSES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};
//Get Single Class
export const getClass = (id: string) => (dispatch: any) => {
  dispatch(clearCurrentClass());
  axios({
    method: "GET",
    url: `${process.env.REACT_APP_API}/api/class?id=${id}`
  })
    .then(res => {
      dispatch({
        type: SET_CLASS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};
//Update Class
export const updateClass = (id: string, classData: object) => (
  dispatch: any
) => {
  axios({
    method: "PUT",
    url: `${process.env.REACT_APP_API}/api/class?id=${id}`,

    data: classData
  })
    .then(res => {
      dispatch(getAllClasses());
      dispatch({
        type: ENABLE_MODAL,
        payload: { message: "Class Updated Successfully.", type: "success" }
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};
//Add Class
export const addClass = (classData: any) => (dispatch: any) => {
  axios({
    method: "POST",
    url: `${process.env.REACT_APP_API}/api/class/add`,

    data: classData
  })
    .then(res => {
      dispatch(getAllClasses());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};
//Delete Class
export const deleteClass = (id: string) => (dispatch: any) => {
  axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_API}/api/class?id=${id}`
  })
    .then(res => {
      dispatch(getAllClasses());
      dispatch({
        type: ENABLE_MODAL,
        payload: { message: "Class deleted Successfully.", type: "warning" }
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};
//Clear Class
export const clearCurrentClass = () => {
  return {
    type: CLEAR_CLASS
  };
};

//Classes Loading
export const setClassesLoading = () => {
  return {
    type: CLASSES_LOADING
  };
};
