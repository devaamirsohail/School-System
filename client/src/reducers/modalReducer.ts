import { ENABLE_MODAL, DISABLE_MODAL } from "../actions/types";

const initialState = {
  show: false,
  message: "",
  type: ""
};

const modalReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ENABLE_MODAL:
      return {
        ...state,
        show: true,
        message: action.payload.message,
        type: action.payload.type
      };
    case DISABLE_MODAL:
      return {
        ...state,
        show: false,
        message: "",
        type: ""
      };
    default:
      return state;
  }
};
export default modalReducer;
