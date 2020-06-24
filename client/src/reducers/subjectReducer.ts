import { SET_SUBJECTS, SUBJECTS_LOADING } from "../actions/types";

const initialState = {
  subjects: null,
  loading: false
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case SUBJECTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_SUBJECTS:
      return {
        ...state,
        subjects: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
