import React, { useEffect, useState, useContext, useReducer } from "react";
import axios from "axios";
import { Alert } from "reactstrap";
import Select from "react-select";

//Helpers
import { getCookie } from "../../../utils/common/helpers";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

import { authReducer } from "../../../context/authReducer";
import authContext from "../../../context/authContext";
import Spinner from "../../common/Spinner";
import Pagination from "../common/Pagination";

const StudentTable = ({ history }: RouteComponentProps) => {
  const context = useContext(authContext);
  const [state] = useReducer(authReducer, context);
  const [loading, setLoading] = useState(false);
  const [allStudents, setAllStudents] = useState(context.students);
  const [allClasses, setAllClasses] = useState(context.classes);
  const { students } = context;
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentPerPage, setStudentPerPage] = useState(10);

  // Remove Alert
  const onDismiss = () => setVisible(false);
  const token = getCookie("token");

  useEffect(() => {
    setLoading(true);
    GetAllStudents();
    GetAllClasses();
  }, []);
  //Get All Students
  const GetAllStudents = () => {
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
        setLoading(false);
        console.log(err);
      });
  };
  //Get All Classes
  const GetAllClasses = () => {
    setLoading(true);
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
  //Class dataset for select
  const classOptions = allClasses.map((val: any) => ({
    value: val.title,
    label: val.title
  }));
  //Gender dataset for select
  const genderOptions = [
    {
      value: "Male",
      label: "Male"
    },
    {
      value: "Female",
      label: "Female"
    }
  ];
  //Edit Student
  const handleEdit = (id: string) => {
    history.push(`/student/${id}`);
  };
  //Delete Student
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
  //Sorting Ascending
  const handleAscSorting = (str: string) => {
    let ascSortedStudent = [...allStudents];
    ascSortedStudent.sort((a: any, b: any) => {
      if (a[str].toLowerCase() < b[str].toLowerCase()) return -1;
      if (a[str].toLowerCase() > b[str].toLowerCase()) return 1;
      return 0;
    });
    setAllStudents(ascSortedStudent);
  };
  //Sorting Descending
  const handleDesSorting = (str: string) => {
    let desSortedStudent = [...allStudents];
    desSortedStudent.sort((a: any, b: any) => {
      if (a[str].toLowerCase() < b[str].toLowerCase()) return 1;
      if (a[str].toLowerCase() > b[str].toLowerCase()) return -1;
      return 0;
    });
    setAllStudents(desSortedStudent);
  };
  //Pagination
  //Get Current Student
  const indexOfLastStudent = currentPage * studentPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentPerPage;
  const currentStudents = allStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  // Search Table By Name and Father Name
  const handleSearch = (event: any) => {
    const searchInput = event.currentTarget.value.toLowerCase();
    let searchStudents = [...students];
    let result: any = [];
    for (var i = 0; i < searchStudents.length; i++) {
      if (searchStudents[i].name.toLowerCase().includes(searchInput)) {
        result.push(searchStudents[i]);
      } else if (
        searchStudents[i].fatherName.toLowerCase().includes(searchInput)
      ) {
        result.push(searchStudents[i]);
      }
    }
    setAllStudents(result);
  };
  // Search Table By Mobile
  const handleSearchByMobile = (event: any) => {
    const searchInput = event.currentTarget.value;
    let searchStudents = [...students];
    let result: any = [];
    for (var i = 0; i < searchStudents.length; i++) {
      if (searchStudents[i].mobile.includes(searchInput)) {
        result.push(searchStudents[i]);
      }
    }
    setAllStudents(result);
  };
  // Search Table By Class
  const handleSearchByClass = (event: any) => {
    if (event) {
      const searchInput = event.value;
      let searchStudents = [...students];
      let result: any = [];
      for (var i = 0; i < searchStudents.length; i++) {
        if (searchStudents[i].classes.includes(searchInput)) {
          result.push(searchStudents[i]);
        }
      }
      setAllStudents(result);
    } else {
      setAllStudents(students);
    }
  };
  // Search Table By Gender
  const handleSearchByGender = (event: any) => {
    if (event) {
      const searchInput = event.value;
      let searchStudents = [...students];
      let result: any = [];
      for (var i = 0; i < searchStudents.length; i++) {
        if (searchStudents[i].sex.includes(searchInput)) {
          result.push(searchStudents[i]);
        }
      }
      setAllStudents(result);
    } else {
      setAllStudents(students);
    }
  };
  // Student Table
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

                        <div className="card-tools"></div>
                      </div>
                      {/* /.card-header */}
                      <div className="card-body table-responsive p-0">
                        <table className="table table-hover text-nowrap table-bordered">
                          <thead>
                            <tr>
                              <td colSpan={2}>
                                <input
                                  type="search"
                                  className="form-control "
                                  placeholder="Search"
                                  onChange={handleSearch}
                                />
                              </td>
                              <td></td>
                              <td>
                                <Select
                                  className="basic-single "
                                  classNamePrefix="select"
                                  isClearable
                                  isSearchable
                                  name="color"
                                  options={genderOptions}
                                  onChange={handleSearchByGender}
                                />
                              </td>
                              <td>
                                <input
                                  type="search"
                                  className="form-control "
                                  placeholder="Search"
                                  onChange={handleSearchByMobile}
                                />
                              </td>
                              <td colSpan={2}>
                                <Select
                                  className="basic-single"
                                  classNamePrefix="select"
                                  isClearable
                                  isSearchable
                                  name="color"
                                  options={classOptions}
                                  onChange={handleSearchByClass}
                                />
                              </td>
                            </tr>
                            <tr>
                              <th>
                                Name
                                <i
                                  onClick={() => handleAscSorting("name")}
                                  className="fas fa-arrow-up fa-xs float-right"
                                  style={{
                                    cursor: "pointer"
                                  }}
                                />
                                <i
                                  onClick={() => handleDesSorting("name")}
                                  className="fas fa-arrow-down fa-xs float-right"
                                  style={{
                                    cursor: "pointer"
                                  }}
                                />
                              </th>
                              <th>
                                Father Name
                                <i
                                  onClick={() => handleAscSorting("fatherName")}
                                  className="fas fa-arrow-up fa-xs float-right"
                                  style={{
                                    cursor: "pointer"
                                  }}
                                />
                                <i
                                  onClick={() => handleDesSorting("fatherName")}
                                  className="fas fa-arrow-down fa-xs float-right"
                                  style={{
                                    cursor: "pointer"
                                  }}
                                />
                              </th>
                              {/* <th>Father Name</th> */}
                              <th>
                                Date of Birth
                                <i
                                  onClick={() => handleAscSorting("DOB")}
                                  className="fas fa-arrow-up fa-xs float-right"
                                  style={{
                                    cursor: "pointer"
                                  }}
                                />
                                <i
                                  onClick={() => handleDesSorting("DOB")}
                                  className="fas fa-arrow-down fa-xs float-right"
                                  style={{
                                    cursor: "pointer"
                                  }}
                                />
                              </th>
                              <th>
                                Gender
                                <i
                                  onClick={() => handleAscSorting("sex")}
                                  className="fas fa-arrow-up fa-xs float-right"
                                  style={{
                                    cursor: "pointer"
                                  }}
                                />
                                <i
                                  onClick={() => handleDesSorting("sex")}
                                  className="fas fa-arrow-down fa-xs float-right"
                                  style={{
                                    cursor: "pointer"
                                  }}
                                />
                              </th>
                              <th>
                                Mobile
                                <i
                                  onClick={() => handleAscSorting("mobile")}
                                  className="fas fa-arrow-up fa-xs float-right"
                                  style={{
                                    cursor: "pointer"
                                  }}
                                />
                                <i
                                  onClick={() => handleDesSorting("mobile")}
                                  className="fas fa-arrow-down fa-xs float-right"
                                  style={{
                                    cursor: "pointer"
                                  }}
                                />
                              </th>
                              <th>
                                Class
                                <i
                                  onClick={() => handleAscSorting("classes")}
                                  className="fas fa-arrow-up fa-xs float-right"
                                  style={{
                                    cursor: "pointer"
                                  }}
                                />
                                <i
                                  onClick={() => handleDesSorting("classes")}
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
                            {currentStudents.length > 0 &&
                              currentStudents.map((student: any, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{student.name}</td>
                                    <td>{student.fatherName}</td>
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
                                        onClick={() =>
                                          handleDelete(student._id)
                                        }
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
                              Showing {indexOfFirstStudent + 1} to{" "}
                              {indexOfLastStudent > allStudents.length
                                ? allStudents.length
                                : indexOfLastStudent}{" "}
                              of {allStudents.length} entries
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-7">
                            <Pagination
                              postsPerPage={studentPerPage}
                              totalPosts={allStudents.length}
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
export default withRouter(StudentTable);
