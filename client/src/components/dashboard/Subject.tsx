import React, { useEffect, useState, useContext, useReducer } from "react";
import axios from "axios";
import { Alert } from "reactstrap";
//Helpers
import { getCookie } from "../../utils/common/helpers";

import { authReducer } from "../../context/authReducer";
import authContext from "../../context/authContext";
import Spinner from "../common/Spinner";

import SideBar from "../common/SideBar";
import Header from "../common/Header";
import Footer from "../common/Footer";

const Subject = () => {
  const context = useContext(authContext);
  const [state] = useReducer(authReducer, context);
  const [loading, setLoading] = useState(false);
  const [subjectTitle, setSubjectTitle] = useState({ title: "" });
  const [allSubjects, setAllSubjects] = useState(context.subjects);
  const { subjects } = context;
  const [visible, setVisible] = useState(false);
  const { title } = subjectTitle;
  const onDismiss = () => setVisible(false);
  const token = getCookie("token");
  useEffect(() => {
    setLoading(true);
    GetAllSubjects();
  }, []);
  const GetAllSubjects = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/api/subject/all`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        state.subjects = res.data;
        setAllSubjects(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSubjectTitle({ title: event.currentTarget.value });
  };
  const handleSubmit = () => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/api/subject/add`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: subjectTitle
    })
      .then((res: any) => {
        GetAllSubjects();
        setSubjectTitle({ title: "" });
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleDelete = (id: string) => {
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API}/api/subject?id=${id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        state.subjects = subjects.filter((subject: any) => subject._id !== id);
        setAllSubjects(state.subjects);
        setVisible(true);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const subjectTable = () => (
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
                        <h3 className="card-title">All Subjects</h3>
                        <div className="card-tools">
                          <div
                            className="input-group input-group-md"
                            style={{ width: 350 }}
                          >
                            <input
                              type="text"
                              name="table_search"
                              className="form-control float-right"
                              placeholder="Subject Title"
                              value={title}
                              onChange={handleChange}
                            />
                            <div className="input-group-append">
                              <button
                                type="submit"
                                className="btn  btn-success"
                                onClick={handleSubmit}
                              >
                                Add Subject
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* /.card-header */}
                      <div className="card-body table-responsive p-0">
                        <table className="table table-hover text-nowrap table-bordered">
                          <thead>
                            <tr>
                              <th>Index</th>
                              <th>Title</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {allSubjects.map((subject: any, index) => {
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{subject.title}</td>

                                  <td>
                                    <i
                                      onClick={() => handleDelete(subject._id)}
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
    <>
      <Header />
      <SideBar />
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Subjects</h1>
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
              <p>You have successfully deleted the subject</p>
            </Alert>
          </div>
          {/* /.container-fluid */}
        </div>
        {loading ? <Spinner /> : subjectTable()}
      </div>
      <Footer />
    </>
  );
};
export default Subject;
