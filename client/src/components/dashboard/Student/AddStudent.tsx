import React, { useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//Actions
import { addStudent } from "../../../actions/studentActions";
import { getAllClasses } from "../../../actions/classActions";
import { getAllSections } from "../../../actions/sectionActions";

import SideBar from "../../common/SideBar";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import Spinner from "../../common/Spinner";
import StudentForm from "./Form";

const AddStudent = ({ history }: RouteComponentProps) => {
  const { classes, loading } = useSelector((state: any) => state.class);
  const { sections } = useSelector((state: any) => state.section);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllClasses());
    dispatch(getAllSections());
  }, []);

  //Add New Student
  const handleSubmit = (studentData: object) => {
    dispatch(addStudent(studentData, history));
  };

  return (
    <React.Fragment>
      <Header />
      <SideBar />
      {loading || classes === null || sections === null ? (
        <Spinner />
      ) : (
        <StudentForm
          AddStudent={handleSubmit}
          allClasses={classes}
          sections={sections}
        />
      )}
      <Footer />
    </React.Fragment>
  );
};
export default withRouter(AddStudent);
