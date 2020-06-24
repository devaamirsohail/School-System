import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "reactstrap";

//Helpers
import { withRouter, RouteComponentProps } from "react-router-dom";
import { getAllTeachers, deleteTeacher } from "../../../actions/teacherActions";
import { getAllSubjects } from "../../../actions/subjectActions";

import Spinner from "../../common/Spinner";

import TeacherTable from "./Table";

import SideBar from "../../common/SideBar";
import Header from "../../common/Header";
import Footer from "../../common/Footer";

const Main = ({ history }: RouteComponentProps) => {
  const { loading, teachers } = useSelector((state: any) => state.teacher);
  const { subjects } = useSelector((state: any) => state.subject);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  useEffect(() => {
    dispatch(getAllTeachers());
    dispatch(getAllSubjects());
  }, []);

  //Delete Teacher
  const handleDelete = (id: string) => {
    dispatch(deleteTeacher(id));
  };
  //Edit Teacher
  const handleEdit = (id: string) => {
    history.push(`/teacher/${id}`);
  };

  return (
    <React.Fragment>
      <Header />
      <SideBar />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Teachers</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Teachers</li>
                </ol>
              </div>
            </div>
            <Alert color="success" isOpen={visible} toggle={onDismiss}>
              <h4 className="alert-heading">Success</h4>
              <p>You have successfully deleted the teacher</p>
            </Alert>
          </div>
        </div>
        {loading || teachers === null || subjects === null ? (
          <Spinner />
        ) : (
          <TeacherTable
            teachers={teachers}
            subjects={subjects}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      </div>

      <Footer />
    </React.Fragment>
  );
};
export default withRouter(Main);
