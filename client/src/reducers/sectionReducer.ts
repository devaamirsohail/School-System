import {
  SET_SECTIONS,
  SET_SECTION,
  CLEAR_SECTION,
  SECTIONS_LOADING
} from "../actions/types";

const initialState = {
  Section: null,
  sections: null,
  loading: false
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case SECTIONS_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_SECTIONS:
      return {
        ...state,
        sections: action.payload,
        loading: false
      };
    case SET_SECTION:
      return {
        ...state,
        Section: action.payload,
        loading: false
      };
    case CLEAR_SECTION:
      return {
        ...state,
        Section: null,
        loading: false
      };
    default:
      return state;
  }
}
