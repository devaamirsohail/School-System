import React, { useEffect, useState, useContext, useReducer } from "react";
import axios from "axios";
import { Alert } from "reactstrap";
import Select from "react-select";
import { Link } from "react-router-dom";

//Helpers

import { authReducer } from "../../../context/authReducer";
import authContext from "../../../context/authContext";

import SideBar from "../../common/SideBar";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import Spinner from "../../common/Spinner";

const Timetable = () => {
  const context = useContext(authContext);
  const [state] = useReducer(authReducer, context);
  const [loading, setLoading] = useState(false);
  const [subjectTitle, setSubjectTitle] = useState({ title: "" });
  const [allSubjects, setAllSubjects] = useState(context.subjects);
  const [allTeachers, setAllTeachers] = useState(context.teachers);
  const [allSections, setAllSections] = useState(context.sections);
  const [allClasses, setAllClasses] = useState(context.classes);

  const { subjects } = context;
  const [visible, setVisible] = useState(false);
  const { title } = subjectTitle;
  const [currentPage, setCurrentPage] = useState(1);
  const [subjectPerPage, setSubjectPerPage] = useState(10);
  const onDismiss = () => setVisible(false);
  useEffect(() => {
    setLoading(true);
    GetAllSubjects();
    GetAllSections();
    GetAllTeachers();
    GetAllClasses();
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
  //Get All Sections
  const GetAllSections = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/api/section/all`
    })
      .then(res => {
        state.sections = res.data;
        setAllSections(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };
  //Get All Classes
  const GetAllClasses = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/api/class/all`
    })
      .then(res => {
        state.classes = res.data;
        setAllClasses(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };
  //Get All Teachers
  const GetAllTeachers = () => {
    setLoading(true);
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/api/teacher/all`
    })
      .then(res => {
        state.teachers = res.data;
        setAllTeachers(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };
  // Class Dataset for select
  const teacherOptions = allTeachers.map((val: any) => ({
    value: val._id,
    label: val.name
  }));

  const handleChange = (name: string) => (
    event: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    console.log([name], event.currentTarget.value);
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
                        <h3 className="card-title">Timetable</h3>
                        <div className="card-tools">
                          <div
                            className="input-group input-group-sm"
                            style={{ width: 150 }}
                          >
                            <button
                              type="submit"
                              className="btn btn-block btn-success"
                            >
                              Update Timetable
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* /.card-header */}
                      <div className="card-body table-responsive p-0">
                        <table
                          style={{ width: "1500px" }}
                          className="table table-hover text-nowrap table-bordered"
                        >
                          <thead>
                            <tr>
                              <th></th>
                              <th>Period 1</th>
                              <th>Period 2</th>
                              <th>Period 3</th>
                              <th>Period 4</th>
                              <th>Period 5</th>
                              <th>Period 6</th>
                              <th>Period 7</th>
                              <th>Period 8</th>
                            </tr>
                          </thead>
                          <tbody>
                            {allSections.map((section: any, index: any) => (
                              <tr key={index}>
                                <th>
                                  {section.title} (
                                  {allClasses.map((aClass: any) =>
                                    aClass._id === section.classes
                                      ? aClass.title
                                      : null
                                  )}
                                  )
                                </th>
                                <td>
                                  <label>Teacher:</label>
                                  <select
                                    onChange={handleChange("teacher")}
                                    className="form-control"
                                  >
                                    <option>Select</option>
                                    {allTeachers.map(
                                      (teacher: any, index: any) => (
                                        <option key={index} value={teacher._id}>
                                          {teacher.name}
                                        </option>
                                      )
                                    )}
                                  </select>
                                  <label>Subject:</label>
                                  <select
                                    onChange={handleChange("subject")}
                                    className="form-control"
                                  >
                                    <option>Select</option>
                                    {section.subjects.length &&
                                      section.subjects.map(
                                        (subject: any, index: any) => (
                                          <option key={index} value={subject}>
                                            {subject}
                                          </option>
                                        )
                                      )}
                                  </select>
                                </td>
                                <td>
                                  <label>Teacher:</label>
                                  <select
                                    onChange={handleChange("teacher")}
                                    className="form-control"
                                  >
                                    <option>Select</option>
                                    {allTeachers.map(
                                      (teacher: any, index: any) => (
                                        <option key={index} value={teacher._id}>
                                          {teacher.name}
                                        </option>
                                      )
                                    )}
                                  </select>
                                  <label>Subject:</label>
                                  <select
                                    onChange={handleChange("subject")}
                                    className="form-control"
                                  >
                                    <option>Select</option>
                                    {section.subjects.length &&
                                      section.subjects.map(
                                        (subject: any, index: any) => (
                                          <option key={index} value={subject}>
                                            {subject}
                                          </option>
                                        )
                                      )}
                                  </select>
                                </td>
                                <td>
                                  <label>Teacher:</label>
                                  <select
                                    onChange={handleChange("teacher")}
                                    className="form-control"
                                  >
                                    <option>Select</option>
                                    {allTeachers.map(
                                      (teacher: any, index: any) => (
                                        <option key={index} value={teacher._id}>
                                          {teacher.name}
                                        </option>
                                      )
                                    )}
                                  </select>
                                  <label>Subject:</label>
                                  <select
                                    onChange={handleChange("subject")}
                                    className="form-control"
                                  >
                                    <option>Select</option>
                                    {section.subjects.length &&
                                      section.subjects.map(
                                        (subject: any, index: any) => (
                                          <option key={index} value={subject}>
                                            {subject}
                                          </option>
                                        )
                                      )}
                                  </select>
                                </td>
                                <td>
                                  <label>Teacher:</label>
                                  <select
                                    onChange={handleChange("teacher")}
                                    className="form-control"
                                  >
                                    <option>Select</option>
                                    {allTeachers.map(
                                      (teacher: any, index: any) => (
                                        <option key={index} value={teacher._id}>
                                          {teacher.name}
                                        </option>
                                      )
                                    )}
                                  </select>
                                  <label>Subject:</label>
                                  <select
                                    onChange={handleChange("subject")}
                                    className="form-control"
                                  >
                                    <option>Select</option>
                                    {section.subjects.length &&
                                      section.subjects.map(
                                        (subject: any, index: any) => (
                                          <option key={index} value={subject}>
                                            {subject}
                                          </option>
                                        )
                                      )}
                                  </select>
                                </td>
                                <td>
                                  <label>Teacher:</label>
                                  <select
                                    onChange={handleChange("teacher")}
                                    className="form-control"
                                  >
                                    <option>Select</option>
                                    {allTeachers.map(
                                      (teacher: any, index: any) => (
                                        <option key={index} value={teacher._id}>
                                          {teacher.name}
                                        </option>
                                      )
                                    )}
                                  </select>
                                  <label>Subject:</label>
                                  <select
                                    onChange={handleChange("subject")}
                                    className="form-control"
                                  >
                                    <option>Select</option>
                                    {section.subjects.length &&
                                      section.subjects.map(
                                        (subject: any, index: any) => (
                                          <option key={index} value={subject}>
                                            {subject}
                                          </option>
                                        )
                                      )}
                                  </select>
                                </td>
                                <td>
                                  <label>Teacher:</label>
                                  <select
                                    onChange={handleChange("teacher")}
                                    className="form-control"
                                  >
                                    <option>Select</option>
                                    {allTeachers.map(
                                      (teacher: any, index: any) => (
                                        <option key={index} value={teacher._id}>
                                          {teacher.name}
                                        </option>
                                      )
                                    )}
                                  </select>
                                  <label>Subject:</label>
                                  <select
                                    onChange={handleChange("subject")}
                                    className="form-control"
                                  >
                                    <option>Select</option>
                                    {section.subjects.length &&
                                      section.subjects.map(
                                        (subject: any, index: any) => (
                                          <option key={index} value={subject}>
                                            {subject}
                                          </option>
                                        )
                                      )}
                                  </select>
                                </td>
                                <td>
                                  <label>Teacher:</label>
                                  <select
                                    onChange={handleChange("teacher")}
                                    className="form-control"
                                  >
                                    <option>Select</option>
                                    {allTeachers.map(
                                      (teacher: any, index: any) => (
                                        <option key={index} value={teacher._id}>
                                          {teacher.name}
                                        </option>
                                      )
                                    )}
                                  </select>
                                  <label>Subject:</label>
                                  <select
                                    onChange={handleChange("subject")}
                                    className="form-control"
                                  >
                                    <option>Select</option>
                                    {section.subjects.length &&
                                      section.subjects.map(
                                        (subject: any, index: any) => (
                                          <option key={index} value={subject}>
                                            {subject}
                                          </option>
                                        )
                                      )}
                                  </select>
                                </td>
                                <td>
                                  <label>Teacher:</label>
                                  <select
                                    onChange={handleChange("teacher")}
                                    className="form-control"
                                  >
                                    <option>Select</option>
                                    {allTeachers.map(
                                      (teacher: any, index: any) => (
                                        <option key={index} value={teacher._id}>
                                          {teacher.name}
                                        </option>
                                      )
                                    )}
                                  </select>
                                  <label>Subject:</label>
                                  <select
                                    onChange={handleChange("subject")}
                                    className="form-control"
                                  >
                                    <option>Select</option>
                                    {section.subjects.length &&
                                      section.subjects.map(
                                        (subject: any, index: any) => (
                                          <option key={index} value={subject}>
                                            {subject}
                                          </option>
                                        )
                                      )}
                                  </select>
                                </td>
                              </tr>
                            ))}
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
                <h1 className="m-0 text-dark">Timetable</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Timetable</li>
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
export default Timetable;
