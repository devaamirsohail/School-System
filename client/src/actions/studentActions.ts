import axios from "axios";

import {
  GET_ERRORS,
  SET_STUDENTS,
  SET_STUDENT,
  CLEAR_STUDENT,
  ENABLE_MODAL,
  STUDENTS_LOADING
} from "./types";

//Get All Students
export const getAllStudents = () => (dispatch: any) => {
  dispatch(setStudentsLoading());
  axios({
    method: "GET",
    url: `${process.env.REACT_APP_API}/api/student/all`
  })
    .then(res => {
      dispatch({
        type: SET_STUDENTS,
        payload: res.data
      });
    })
    .catch((err: any) => {
      console.log(err.response);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
//Get Single Student
export const getStudent = (id: string) => (dispatch: any) => {
  dispatch(clearCurrentStudent());
  axios({
    method: "GET",
    url: `${process.env.REACT_APP_API}/api/student?id=${id}`
  })
    .then(res => {
      dispatch({
        type: SET_STUDENT,
        payload: res.data
      });
    })
    .catch((err: any) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
//Update Student
export const updateStudent = (
  id: string,
  studentData: object,
  history: any
) => (dispatch: any) => {
  axios({
    method: "PUT",
    url: `${process.env.REACT_APP_API}/api/student?id=${id}`,
    data: studentData
  })
    .then(res => {
      dispatch(getAllStudents());
      dispatch(clearCurrentStudent());
      history.push("/students");
      dispatch({
        type: ENABLE_MODAL,
        payload: { message: "Student updated Successfully.", type: "warning" }
      });
    })
    .catch((err: any) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
//Add Student
export const addStudent = (studentData: any, history: any) => (
  dispatch: any
) => {
  axios({
    method: "POST",
    url: `${process.env.REACT_APP_API}/api/student/add`,
    data: studentData
  })
    .then(res => {
      dispatch(getAllStudents());
      history.push("/students");
    })
    .catch((err: any) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
//Delete Student
export const deleteStudent = (id: string) => (dispatch: any) => {
  axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_API}/api/student?id=${id}`
  })
    .then(res => {
      dispatch(getAllStudents());
      dispatch({
        type: ENABLE_MODAL,
        payload: { message: "Student deleted Successfully.", type: "success" }
      });
    })
    .catch((err: any) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
//Clear Student
export const clearCurrentStudent = () => {
  return {
    type: CLEAR_STUDENT
  };
};
//Students Loading
export const setStudentsLoading = () => {
  return {
    type: STUDENTS_LOADING
  };
};
