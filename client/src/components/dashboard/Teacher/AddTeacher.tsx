import React, { useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//Helpers
import { addTeacher } from "../../../actions/teacherActions";
import { getAllSubjects } from "../../../actions/subjectActions";

import SideBar from "../../common/SideBar";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import Spinner from "../../common/Spinner";
import TeacherForm from "./Form";

const AddTeacher = ({ history }: RouteComponentProps) => {
  const { subjects, loading } = useSelector((state: any) => state.subject);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSubjects());
  }, []);

  //Add New Teacher
  const handleSubmit = (teacherData: object) => {
    dispatch(addTeacher(teacherData, history));
  };

  return (
    <React.Fragment>
      <Header />
      <SideBar />
      {loading || subjects === null ? (
        <Spinner />
      ) : (
        <TeacherForm AddTeacher={handleSubmit} subjects={subjects} />
      )}
      <Footer />
    </React.Fragment>
  );
};
export default withRouter(AddTeacher);
