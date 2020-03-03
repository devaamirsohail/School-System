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
  ]
};

export const authReducer = (state: any) => {
  return state;
};
