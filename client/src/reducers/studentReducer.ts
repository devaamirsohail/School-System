import {
  SET_STUDENTS,
  SET_STUDENT,
  CLEAR_STUDENT,
  STUDENTS_LOADING
} from "../actions/types";

const initialState = {
  student: null,
  students: null,
  loading: false
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case STUDENTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_STUDENTS:
      return {
        ...state,
        students: action.payload,
        loading: false
      };
    case SET_STUDENT:
      return {
        ...state,
        student: action.payload,
        loading: false
      };
    case CLEAR_STUDENT:
      return {
        ...state,
        student: null,
        loading: false
      };

    default:
      return state;
  }
}
