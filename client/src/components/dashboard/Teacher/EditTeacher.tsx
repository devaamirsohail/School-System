import React, { useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//Helpers
import { getTeacher, updateTeacher } from "../../../actions/teacherActions";
import { getAllSubjects } from "../../../actions/subjectActions";

import SideBar from "../../common/SideBar";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import Spinner from "../../common/Spinner";
import TeacherForm from "./EditForm";

type TParams = { id: string };
const EditTeacher = ({ history, match }: RouteComponentProps<TParams>) => {
  const { subjects } = useSelector((state: any) => state.subject);
  const { teacher, loading } = useSelector((state: any) => state.teacher);
  const dispatch = useDispatch();
  const id = match.params.id;
  useEffect(() => {
    dispatch(getTeacher(id));
    dispatch(getAllSubjects());
  }, []);

  //Add New Teacher
  const handleSubmit = (teacherData: object) => {
    dispatch(updateTeacher(id, teacherData, history));
  };

  return (
    <React.Fragment>
      <Header />
      <SideBar />
      {loading || subjects === null || teacher === null ? (
        <Spinner />
      ) : (
        <TeacherForm
          AddTeacher={handleSubmit}
          subjects={subjects}
          teacher={teacher}
        />
      )}
      <Footer />
    </React.Fragment>
  );
};
export default withRouter(EditTeacher);
