import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "reactstrap";

import { withRouter, RouteComponentProps } from "react-router-dom";

import { getAllStudents, deleteStudent } from "../../../actions/studentActions";
import { getAllClasses } from "../../../actions/classActions";
import { getAllSections } from "../../../actions/sectionActions";

import Spinner from "../../common/Spinner";

import StudentTable from "./Table";

import SideBar from "../../common/SideBar";
import Header from "../../common/Header";
import Footer from "../../common/Footer";

const Main = ({ history }: RouteComponentProps) => {
  const { loading, students } = useSelector((state: any) => state.student);
  const { classes } = useSelector((state: any) => state.class);
  const { sections } = useSelector((state: any) => state.section);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  useEffect(() => {
    dispatch(getAllStudents());
    dispatch(getAllClasses());
    dispatch(getAllSections());
  }, []);

  //Delete Teacher
  const handleDelete = (id: string) => {
    dispatch(deleteStudent(id));
  };
  //Edit Teacher
  const handleEdit = (id: string) => {
    history.push(`/student/${id}`);
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
                <h1 className="m-0 text-dark">Students</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Students</li>
                </ol>
              </div>
            </div>
            <Alert color="success" isOpen={visible} toggle={onDismiss}>
              <h4 className="alert-heading">Success</h4>
              <p>You have successfully deleted the student</p>
            </Alert>
          </div>
        </div>
        {loading ||
        students === null ||
        classes === null ||
        sections === null ? (
          <Spinner />
        ) : (
          <StudentTable
            students={students}
            classes={classes}
            sections={sections}
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
