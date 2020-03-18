import { SET_CURRENT_USER, STUDENTS } from "./types";

export const initialState = {
  isAuthenticated: false,
  user: null,
  students: [
    {
      name: "",
      fatherName: "",
      DOB: "",
      sex: "",
      address: "",
      mobile: "",
      classes: "",
      fee: {
        total: 0,
        paid: 0
      }
    }
  ],
  student: {
    name: "",
    fatherName: "",
    DOB: "",
    dateOfAdmission: "",
    placeOfBirth: "",
    sex: "",
    nationality: "",
    address: "",
    telephone: "",
    mobile: "",
    classes: "",
    admissionFee: 0,
    fee: 0
  },
  teachers: [
    {
      name: "",
      fatherName: "",
      dateOfJoining: "",
      sex: "",
      address: "",
      mobile: "",
      subject: ""
    }
  ],
  teacher: {
    name: "",
    fatherName: "",
    DOB: "",
    dateOfJoining: "",
    placeOfBirth: "",
    sex: "",
    nationality: "",
    address: "",
    telephone: "",
    mobile: "",
    subject: ""
  },
  subjects: [
    {
      title: ""
    }
  ],
  classes: [
    {
      title: "",
      HOC: ""
    }
  ],
  sections: [
    {
      title: "",
      classes: "",
      subjects: ""
    }
  ],
  staff: [
    {
      name: "",
      fatherName: "",
      dateOfJoining: "",
      sex: "",
      address: "",
      mobile: "",
      role: ""
    }
  ],
  staffMember: {
    name: "",
    fatherName: "",
    DOB: "",
    dateOfJoining: "",
    placeOfBirth: "",
    sex: "",
    nationality: "",
    address: "",
    telephone: "",
    mobile: "",
    role: ""
  }
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
    case STUDENTS:
      console.log("STUDENTS", action);
      return {
        ...state,
        student: action.payload,
        loading: false
      };
    default:
      console.log("default");
      return state;
  }
};
