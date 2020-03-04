import React, { useEffect, useState, useContext, useReducer } from "react";
import axios from "axios";
import { Alert } from "reactstrap";
//Helpers
import { getCookie } from "../../utils/common/helpers";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

import { authReducer } from "../../context/authReducer";
import authContext from "../../context/authContext";
import Spinner from "../common/Spinner";

const Table = ({ history }: RouteComponentProps) => {
  const context = useContext(authContext);
  const [state] = useReducer(authReducer, context);
  const [loading, setLoading] = useState(false);
  const [allStudents, setAllStudents] = useState(context.students);
  const { students } = context;
  const [visible, setVisible] = useState(false);

  const onDismiss = () => setVisible(false);
  const token = getCookie("token");
  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/api/student/all`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        state.students = res.data;
        setAllStudents(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleEdit = (id: string) => {
    history.push(`/student/${id}`);
  };
  const handleDelete = (id: string) => {
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API}/api/student?id=${id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        state.students = students.filter((student: any) => student._id !== id);
        setAllStudents(state.students);
        setVisible(true);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const studentTable = () => (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body table-responsive p-0">
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">All Students</h3>
                        <div className="card-tools">
                          <div
                            className="input-group input-group-sm"
                            style={{ width: 150 }}
                          >
                            <Link
                              to="/addstudent"
                              type="button"
                              className="btn btn-block btn-primary"
                            >
                              Add New Student
                            </Link>
                          </div>
                        </div>
                      </div>
                      {/* /.card-header */}
                      <div className="card-body table-responsive p-0">
                        <table className="table table-hover text-nowrap table-bordered">
                          <thead>
                            <tr>
                              <th>Index</th>
                              <th>Name</th>
                              {/* <th>Father Name</th> */}
                              <th>Date of Birth</th>
                              <th>Gender</th>
                              <th>Mobile</th>
                              <th>Class</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {allStudents.map((student: any, index) => {
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{student.name}</td>
                                  {/* <td>{student.fatherName}</td> */}
                                  <td>{student.DOB}</td>
                                  <td>{student.sex}</td>
                                  <td>{student.mobile}</td>
                                  <td>{student.classes}</td>
                                  <td>
                                    <i
                                      onClick={() => handleEdit(student._id)}
                                      className="far fa-edit pr-2"
                                      style={{
                                        color: "#28a745",
                                        cursor: "pointer"
                                      }}
                                    ></i>
                                    <i
                                      onClick={() => handleDelete(student._id)}
                                      className="far fa-trash-alt"
                                      style={{
                                        color: "#dc3545",
                                        cursor: "pointer"
                                      }}
                                    ></i>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      {/* /.card-body */}
                    </div>
                    {/* /.card */}
                  </div>
                </div>
              </div>
              {/* /.card-body */}
            </div>
            {/* /.card */}
          </div>
        </div>
      </div>
      {/* /.container-fluid */}
    </section>
  );

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">Students</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Sudents</li>
              </ol>
            </div>
            {/* /.col */}
          </div>
          <Alert color="success" isOpen={visible} toggle={onDismiss}>
            <h4 className="alert-heading">Success</h4>
            <p>You have successfully deleted the student</p>
          </Alert>
        </div>
        {/* /.container-fluid */}
      </div>
      {loading ? <Spinner /> : studentTable()}
    </div>
  );
};
export default withRouter(Table);
