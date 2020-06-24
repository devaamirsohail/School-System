import {
  SET_CLASSES,
  SET_CLASS,
  CLEAR_CLASS,
  CLASSES_LOADING
} from "../actions/types";

const initialState = {
  singleClass: null,
  classes: null,
  loading: false
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case CLASSES_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_CLASSES:
      return {
        ...state,
        classes: action.payload,
        loading: false
      };
    case SET_CLASS:
      return {
        ...state,
        singleClass: action.payload,
        loading: false
      };
    case CLEAR_CLASS:
      return {
        ...state,
        singleClass: null,
        loading: false
      };
    default:
      return state;
  }
}
