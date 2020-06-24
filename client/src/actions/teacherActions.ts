import axios from "axios";

import {
  GET_ERRORS,
  SET_TEACHERS,
  SET_TEACHER,
  CLEAR_TEACHER,
  ENABLE_MODAL,
  TEACHERS_LOADING
} from "./types";

//Get All Teachers
export const getAllTeachers = () => (dispatch: any) => {
  dispatch(setTeachersLoading());
  axios({
    method: "GET",
    url: `${process.env.REACT_APP_API}/api/teacher/all`
  })
    .then(res => {
      dispatch({
        type: SET_TEACHERS,
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
//Get Single Teacher
export const getTeacher = (id: string) => (dispatch: any) => {
  dispatch(clearCurrentTeacher());
  axios({
    method: "GET",
    url: `${process.env.REACT_APP_API}/api/teacher?id=${id}`
  })
    .then(res => {
      dispatch({
        type: SET_TEACHER,
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
//Update Teacher
export const updateTeacher = (
  id: string,
  teacherData: object,

  history: any
) => (dispatch: any) => {
  axios({
    method: "PUT",
    url: `${process.env.REACT_APP_API}/api/teacher?id=${id}`,

    data: teacherData
  })
    .then(res => {
      dispatch(getAllTeachers());
      dispatch(clearCurrentTeacher());
      history.push("/teachers");
      dispatch({
        type: ENABLE_MODAL,
        payload: { message: "Teacher Udated Successfully.", type: "success" }
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};
//Add Teacher
export const addTeacher = (teacherData: any, history: any) => (
  dispatch: any
) => {
  axios({
    method: "POST",
    url: `${process.env.REACT_APP_API}/api/teacher/add`,

    data: teacherData
  })
    .then(res => {
      dispatch(getAllTeachers());
      history.push("/teachers");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};
//Delete Teacher
export const deleteTeacher = (id: string) => (dispatch: any) => {
  axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_API}/api/teacher?id=${id}`
  })
    .then(res => {
      dispatch(getAllTeachers());
      dispatch({
        type: ENABLE_MODAL,
        payload: { message: "Teacher Deleted Successfully.", type: "warning" }
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};
//Clear Teacher
export const clearCurrentTeacher = () => {
  return {
    type: CLEAR_TEACHER
  };
};
//Teachers Loading
export const setTeachersLoading = () => {
  return {
    type: TEACHERS_LOADING
  };
};
