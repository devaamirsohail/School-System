import React, { useEffect, useState, useContext, useReducer } from "react";
import axios from "axios";
import { Alert } from "reactstrap";
import Select from "react-select";

//Helpers
import { getCookie } from "../../utils/common/helpers";

import { authReducer } from "../../context/authReducer";
import authContext from "../../context/authContext";
import Pagination from "./common/Pagination";

import SideBar from "../common/SideBar";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Spinner from "../common/Spinner";

const Classes = () => {
  const context = useContext(authContext);
  const [state] = useReducer(authReducer, context);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [classData, setClassData] = useState({
    title: "",
    HOC: ""
  });
  const [updateId, setUpdateId] = useState("");

  const { title, HOC } = classData;
  const [allClasses, setAllClasses] = useState(context.classes);
  const [allTeachers, setAllTeachers] = useState(context.teachers);
  const { classes } = context;
  const [currentPage, setCurrentPage] = useState(1);
  const [subjectPerPage, setClassPerPage] = useState(10);
  const [visible, setVisible] = useState(false);
  //Remove Alert
  const onDismiss = () => setVisible(false);
  const token = getCookie("token");
  useEffect(() => {
    setLoading(true);
    GetAllClasses();
    GetAllTeachers();
  }, []);
  //Get All Classes
  const GetAllClasses = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/api/class/all`,
      headers: {
        Authorization: `Bearer ${token}`
      }
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
      url: `${process.env.REACT_APP_API}/api/teacher/all`,
      headers: {
        Authorization: `Bearer ${token}`
      }
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

  const handleChange = (name: string) => (
    event: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setClassData({ ...classData, [name]: event.currentTarget.value });
  };
  const handleChangeSelect = (name: string) => (event: any) => {
    console.log(event);

    setClassData({ ...classData, [name]: event.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    showEditForm ? updateClass() : addNewClass();
  };
  //Add New Class
  const addNewClass = () => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/api/class/add`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: classData
    })
      .then((res: any) => {
        GetAllClasses();
        setClassData({ title: "", HOC: "" });
        setShowForm(!showForm);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  // Update Class
  const updateClass = () => {
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/api/class?id=${updateId}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: classData
    })
      .then((res: any) => {
        GetAllClasses();
        setClassData({ title: "", HOC: "" });
        setUpdateId("");
        setShowEditForm(!showEditForm);
        setShowForm(!showForm);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  //Delete Class
  const handleDelete = (id: string) => {
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API}/api/class?id=${id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        state.classes = classes.filter((val: any) => val._id !== id);
        setAllClasses(state.classes);
        setVisible(true);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  // Show Edit Form
  const handleEdit = (id: string) => {
    setShowForm(true);
    setShowEditForm(true);
    allClasses.forEach((val: any) => {
      if (val._id === id) {
        setClassData({ title: val.title, HOC: val.HOC });
        setUpdateId(val._id);
      }
    });
  };
  // Class Dataset for select
  const teacherOptions = allTeachers.map((val: any) => ({
    value: val._id,
    label: val.name
  }));
  //Sorting Ascending
  const handleAscSorting = (str: string) => {
    let ascSortedClass = [...allClasses];
    ascSortedClass.sort((a: any, b: any) => {
      if (a[str].toLowerCase() < b[str].toLowerCase()) return -1;
      if (a[str].toLowerCase() > b[str].toLowerCase()) return 1;
      return 0;
    });
    setAllClasses(ascSortedClass);
  };
  //Sorting Descending
  const handleDesSorting = (str: string) => {
    let desSortedClass = [...allClasses];
    desSortedClass.sort((a: any, b: any) => {
      if (a[str].toLowerCase() < b[str].toLowerCase()) return 1;
      if (a[str].toLowerCase() > b[str].toLowerCase()) return -1;
      return 0;
    });
    setAllClasses(desSortedClass);
  };
  //Pagination
  //Get Current Class
  const indexOfLastClass = currentPage * subjectPerPage;
  const indexOfFirstClass = indexOfLastClass - subjectPerPage;
  const currentClasses = allClasses.slice(indexOfFirstClass, indexOfLastClass);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Class Form
  const addClassForm = () => (
    <section className="content">
      <div className="container-fluid">
        {/* general form elements */}
        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">Teacher Form</h3>
          </div>
          {/* /.card-header */}
          {/* form start */}
          <form role="form">
            <div className="card-body">
              <div className="row">
                {/* left column */}
                <div className="form-group col-md-4">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    value={title}
                    onChange={handleChange("title")}
                  />
                </div>

                <div className="form-group col-md-4">
                  <label>Head of Class:</label>

                  <Select
                    //defaultValue={classOptions}
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable
                    isSearchable
                    name="color"
                    options={teacherOptions}
                    onChange={handleChangeSelect("HOC")}
                  />
                </div>
              </div>
            </div>
            {/* /.card-body */}
            <div className="card-footer">
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-success"
              >
                {showEditForm ? "Update Class" : "Add Class"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* /.container-fluid */}
    </section>
  );
  // Class Table
  const classTable = () => (
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
                        <h3 className="card-title">All Classes</h3>
                        <div className="card-tools">
                          {showEditForm ? (
                            <div
                              className="input-group input-group-sm"
                              style={{ width: 150 }}
                            >
                              <button
                                type="submit"
                                className="btn btn-block btn-primary"
                                onClick={() => {
                                  setShowForm(!showForm);
                                  setShowEditForm(!showEditForm);
                                  setClassData({ title: "", HOC: "" });
                                }}
                              >
                                Hide Update Form
                              </button>
                            </div>
                          ) : (
                            <div
                              className="input-group input-group-sm"
                              style={{ width: 150 }}
                            >
                              <button
                                type="submit"
                                className="btn btn-block btn-primary"
                                onClick={() => {
                                  setShowForm(!showForm);
                                  setClassData({ title: "", HOC: "" });
                                }}
                              >
                                {showForm ? "Hide Form" : "Add New Class"}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* /.card-header */}
                      <div className="card-body table-responsive p-0">
                        <table className="table table-hover text-nowrap table-bordered">
                          <thead>
                            <tr>
                              <th>Index</th>
                              <th>
                                Title{" "}
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
                              <th>Head Of Class</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentClasses.map((val: any, index) => {
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{val.title}</td>

                                  {allTeachers.map((teacher: any) =>
                                    teacher._id === val.HOC ? (
                                      <td key={teacher._id}>{teacher.name}</td>
                                    ) : null
                                  )}

                                  <td>
                                    <i
                                      onClick={() => handleEdit(val._id)}
                                      className="far fa-edit pr-2"
                                      style={{
                                        color: "#28a745",
                                        cursor: "pointer"
                                      }}
                                    ></i>
                                    <i
                                      onClick={() => handleDelete(val._id)}
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
                              Showing {indexOfFirstClass + 1} to{" "}
                              {indexOfLastClass > allClasses.length
                                ? allClasses.length
                                : indexOfLastClass}{" "}
                              of {allClasses.length} entries
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-7">
                            <Pagination
                              postsPerPage={subjectPerPage}
                              totalPosts={allClasses.length}
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
                <h1 className="m-0 text-dark">Classes</h1>
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
              <p>You have successfully deleted the class</p>
            </Alert>
          </div>
          {/* /.container-fluid */}
        </div>
        {showForm ? addClassForm() : null}
        {loading ? <Spinner /> : classTable()}
      </div>
      <Footer />
    </>
  );
};
export default Classes;
