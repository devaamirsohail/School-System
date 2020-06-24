import isEmpty from "../validation/is-empty";
import { SET_CURRENT_USER, LOADING } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: {}
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        loading: false
      };
    case LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
