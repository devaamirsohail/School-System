import React, { useEffect, useState, useContext, useReducer } from "react";
import axios from "axios";
import { Alert } from "reactstrap";
//Helpers

import { authReducer } from "../../context/authReducer";
import authContext from "../../context/authContext";
import Pagination from "./common/Pagination";

import SideBar from "../common/SideBar";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Spinner from "../common/Spinner";

const Subject = () => {
  const context = useContext(authContext);
  const [state] = useReducer(authReducer, context);
  const [loading, setLoading] = useState(false);
  const [subjectTitle, setSubjectTitle] = useState({ title: "" });
  const [allSubjects, setAllSubjects] = useState(context.subjects);
  const { subjects } = context;
  const [visible, setVisible] = useState(false);
  const { title } = subjectTitle;
  const [currentPage, setCurrentPage] = useState(1);
  const [subjectPerPage, setSubjectPerPage] = useState(10);
  const onDismiss = () => setVisible(false);
  useEffect(() => {
    setLoading(true);
    GetAllSubjects();
  }, []);
  //Get All Subject
  const GetAllSubjects = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/api/subject/all`
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
  // Add Subject
  const handleSubmit = () => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/api/subject/add`,

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
  //Delete Subject
  const handleDelete = (id: string) => {
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API}/api/subject?id=${id}`
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
  //Sorting Ascending
  const handleAscSorting = (str: string) => {
    let ascSortedSubject = [...allSubjects];
    ascSortedSubject.sort((a: any, b: any) => {
      if (a[str].toLowerCase() < b[str].toLowerCase()) return -1;
      if (a[str].toLowerCase() > b[str].toLowerCase()) return 1;
      return 0;
    });
    setAllSubjects(ascSortedSubject);
  };
  //Sorting Descending
  const handleDesSorting = (str: string) => {
    let desSortedSubject = [...allSubjects];
    desSortedSubject.sort((a: any, b: any) => {
      if (a[str].toLowerCase() < b[str].toLowerCase()) return 1;
      if (a[str].toLowerCase() > b[str].toLowerCase()) return -1;
      return 0;
    });
    setAllSubjects(desSortedSubject);
  };
  //Pagination
  //Get Current Subject
  const indexOfLastSubject = currentPage * subjectPerPage;
  const indexOfFirstSubject = indexOfLastSubject - subjectPerPage;
  const currentSubjects = allSubjects.slice(
    indexOfFirstSubject,
    indexOfLastSubject
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  // Subject Table
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
                              <th>
                                Title
                                <i
                                  onClick={() => handleAscSorting("title")}
                                  className="fas fa-arrow-up fa-xs float-right"
                                  style={{
                                    cursor: "pointer"
                                  }}
                                />
                                <i
                                  onClick={() => handleDesSorting("title")}
                                  className="fas fa-arrow-down fa-xs float-right"
                                  style={{
                                    cursor: "pointer"
                                  }}
                                />
                              </th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentSubjects.map((subject: any, index) => {
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
                      <div className="card-footer ">
                        <div className="row">
                          <div className="col-sm-12 col-md-5">
                            <div className="dataTables_info">
                              Showing {indexOfFirstSubject + 1} to{" "}
                              {indexOfLastSubject > allSubjects.length
                                ? allSubjects.length
                                : indexOfLastSubject}{" "}
                              of {allSubjects.length} entries
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-7">
                            <Pagination
                              postsPerPage={subjectPerPage}
                              totalPosts={allSubjects.length}
                              paginate={paginate}
                            />
                          </div>
                        </div>
                      </div>
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
