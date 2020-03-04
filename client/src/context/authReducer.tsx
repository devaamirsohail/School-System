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
      classes: ""
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
    classes: ""
  }
};

export const authReducer = (state: any) => {
  return state;
};
