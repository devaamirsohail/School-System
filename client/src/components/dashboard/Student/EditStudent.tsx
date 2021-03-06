import React, { useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//Helpers
import { getStudent, updateStudent } from "../../../actions/studentActions";
import { getAllClasses } from "../../../actions/classActions";

import SideBar from "../../common/SideBar";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import Spinner from "../../common/Spinner";
import StudentForm from "./EditForm";

type TParams = { id: string };
const EditStudent = ({ history, match }: RouteComponentProps<TParams>) => {
  const { classes } = useSelector((state: any) => state.class);
  const { student, loading } = useSelector((state: any) => state.student);
  const dispatch = useDispatch();
  const id = match.params.id;
  useEffect(() => {
    dispatch(getStudent(id));
    dispatch(getAllClasses());
  }, []);

  //Add New Student
  const handleSubmit = (studentData: object) => {
    dispatch(updateStudent(id, studentData, history));
  };

  return (
    <React.Fragment>
      <Header />
      <SideBar />
      {loading || classes === null || student === null ? (
        <Spinner />
      ) : (
        <StudentForm
          AddStudent={handleSubmit}
          allClasses={classes}
          student={student}
        />
      )}
      <Footer />
    </React.Fragment>
  );
};
export default withRouter(EditStudent);
