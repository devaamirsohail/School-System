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
  }
};

export const authReducer = (state: any) => {
  return state;
};
