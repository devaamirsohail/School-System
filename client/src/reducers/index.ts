import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import subjectReducer from "./subjectReducer";
import classReducer from "./classReducer";
import studentReducer from "./studentReducer";
import teacherReducer from "./teacherReducer";
import sectionReducer from "./sectionReducer";
import modalReducer from "./modalReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  student: studentReducer,
  teacher: teacherReducer,
  class: classReducer,
  subject: subjectReducer,
  section: sectionReducer,
  modal: modalReducer
});
