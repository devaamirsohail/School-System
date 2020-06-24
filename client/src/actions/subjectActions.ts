import axios from "axios";

import {
  GET_ERRORS,
  SET_SUBJECTS,
  SUBJECTS_LOADING,
  ENABLE_MODAL
} from "./types";

//Get All Subjects
export const getAllSubjects = () => (dispatch: any) => {
  dispatch(setSubjectsLoading());
  axios({
    method: "GET",
    url: `${process.env.REACT_APP_API}/api/subject/all`
  })
    .then(res => {
      dispatch({
        type: SET_SUBJECTS,
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

//Add Subject
export const addSubjects = (subjectData: object) => (dispatch: any) => {
  axios({
    method: "POST",
    url: `${process.env.REACT_APP_API}/api/subject/add`,

    data: subjectData
  })
    .then(res => {
      dispatch(getAllSubjects());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
//Add Subject
export const deleteSubjects = (id: string) => (dispatch: any) => {
  axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_API}/api/subject?id=${id}`
  })
    .then(res => {
      dispatch(getAllSubjects());
      dispatch({
        type: ENABLE_MODAL,
        payload: { message: "Subject Deleted Successfully.", type: "warning" }
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Subjects Loading
export const setSubjectsLoading = () => {
  return {
    type: SUBJECTS_LOADING
  };
};
