import axios from "axios";

import {
  GET_ERRORS,
  SET_SECTIONS,
  SET_SECTION,
  CLEAR_SECTION,
  SECTIONS_LOADING,
  ENABLE_MODAL
} from "./types";

//Get All Sections
export const getAllSections = () => (dispatch: any) => {
  dispatch(setSectionsLoading());
  axios({
    method: "GET",
    url: `${process.env.REACT_APP_API}/api/section/all`
  })
    .then(res => {
      dispatch({
        type: SET_SECTIONS,
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
//Get Single Section
export const getSection = (id: string) => (dispatch: any) => {
  dispatch(clearCurrentSection());
  axios({
    method: "GET",
    url: `${process.env.REACT_APP_API}/api/section?id=${id}`
  })
    .then(res => {
      dispatch({
        type: SET_SECTION,
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
//Update Section
export const updateSection = (id: string, sectionData: object) => (
  dispatch: any
) => {
  axios({
    method: "PUT",
    url: `${process.env.REACT_APP_API}/api/section?id=${id}`,

    data: sectionData
  })
    .then(res => {
      dispatch(getAllSections());
      dispatch({
        type: ENABLE_MODAL,
        payload: { message: "Section updated Successfully.", type: "success" }
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};
//Add Section
export const addSection = (sectionData: any) => (dispatch: any) => {
  axios({
    method: "POST",
    url: `${process.env.REACT_APP_API}/api/section/add`,

    data: sectionData
  })
    .then(res => {
      dispatch(getAllSections());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};
//Delete Section
export const deleteSection = (id: string) => (dispatch: any) => {
  axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_API}/api/section?id=${id}`
  })
    .then(res => {
      dispatch(getAllSections());
      dispatch({
        type: ENABLE_MODAL,
        payload: { message: "Section deleted Successfully.", type: "warning" }
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};
//Clear Section
export const clearCurrentSection = () => {
  return {
    type: CLEAR_SECTION
  };
};

//Sections Loading
export const setSectionsLoading = () => {
  return {
    type: SECTIONS_LOADING
  };
};
