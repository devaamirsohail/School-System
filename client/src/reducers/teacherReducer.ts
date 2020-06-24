import {
  SET_TEACHERS,
  SET_TEACHER,
  CLEAR_TEACHER,
  TEACHERS_LOADING
} from "../actions/types";

const initialState = {
  teacher: null,
  teachers: null,
  loading: false
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case TEACHERS_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_TEACHERS:
      return {
        ...state,
        teachers: action.payload,
        loading: false
      };
    case SET_TEACHER:
      return {
        ...state,
        teacher: action.payload,
        loading: false
      };
    case CLEAR_TEACHER:
      return {
        ...state,
        teacher: null,
        loading: false
      };

    default:
      return state;
  }
}
