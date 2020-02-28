import { SET_CURRENT_USER } from "./types";

export const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false
};

export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      console.log("SET_CURRENT_USER", action);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false
      };
    default:
      console.log("default");
      return state;
  }
};
