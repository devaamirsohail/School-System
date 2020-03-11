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

const TeacherTable = ({ history }: RouteComponentProps) => {
  const context = useContext(authContext);
  const [state] = useReducer(authReducer, context);
  const [loading, setLoading] = useState(false);
  const [allTeachers, setAllTeachers] = useState(context.teachers);
  const [allSubjects, setAllSubjects] = useState(context.subjects);
  const { teachers } = context;
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [teacherPerPage, setTeacherPerPage] = useState(10);

  // Remove Alert
  const onDismiss = () => setVisible(false);
  const token = getCookie("token");

  useEffect(() => {
    setLoading(true);
    GetAllTeachers();
    GetAllClasses();
  }, []);
  //Get All Teachers
  const GetAllTeachers = () => {
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
  //Get All Classes
  const GetAllClasses = () => {
    setLoading(true);
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
  //Subject dataset for select
  const classOptions = allSubjects.map((val: any) => ({
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
  //Edit Teacher
  const handleEdit = (id: string) => {
    history.push(`/teacher/${id}`);
  };
  //Delete Teacher
  const handleDelete = (id: string) => {
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API}/api/teacher?id=${id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        state.teachers = teachers.filter((teacher: any) => teacher._id !== id);
        setAllTeachers(state.teachers);
        setVisible(true);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  //Sorting Ascending
  const handleAscSorting = (str: string) => {
    let ascSortedTeacher = [...allTeachers];
    ascSortedTeacher.sort((a: any, b: any) => {
      if (a[str].toLowerCase() < b[str].toLowerCase()) return -1;
      if (a[str].toLowerCase() > b[str].toLowerCase()) return 1;
      return 0;
    });
    setAllTeachers(ascSortedTeacher);
  };
  //Sorting Descending
  const handleDesSorting = (str: string) => {
    let desSortedTeacher = [...allTeachers];
    desSortedTeacher.sort((a: any, b: any) => {
      if (a[str].toLowerCase() < b[str].toLowerCase()) return 1;
      if (a[str].toLowerCase() > b[str].toLowerCase()) return -1;
      return 0;
    });
    setAllTeachers(desSortedTeacher);
  };
  //Pagination
  //Get Current Teacher
  const indexOfLastTeacher = currentPage * teacherPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teacherPerPage;
  const currentTeachers = allTeachers.slice(
    indexOfFirstTeacher,
    indexOfLastTeacher
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  // Search Table By Name and Father Name
  const handleSearch = (event: any) => {
    const searchInput = event.currentTarget.value.toLowerCase();
    let searchTeachers = [...teachers];
    let result: any = [];
    for (var i = 0; i < searchTeachers.length; i++) {
      if (searchTeachers[i].name.toLowerCase().includes(searchInput)) {
        result.push(searchTeachers[i]);
      } else if (
        searchTeachers[i].fatherName.toLowerCase().includes(searchInput)
      ) {
        result.push(searchTeachers[i]);
      }
    }
    setAllTeachers(result);
  };
  // Search Table By Mobile
  const handleSearchByMobile = (event: any) => {
    const searchInput = event.currentTarget.value;
    let searchTeachers = [...teachers];
    let result: any = [];
    for (var i = 0; i < searchTeachers.length; i++) {
      if (searchTeachers[i].mobile.includes(searchInput)) {
        result.push(searchTeachers[i]);
      }
    }
    setAllTeachers(result);
  };
  // Search Table By Subject
  const handleSearchBySubject = (event: any) => {
    if (event) {
      const searchInput = event.value;
      let searchTeachers = [...teachers];
      let result: any = [];
      for (var i = 0; i < searchTeachers.length; i++) {
        if (searchTeachers[i].subject.includes(searchInput)) {
          result.push(searchTeachers[i]);
        }
      }
      setAllTeachers(result);
    } else {
      setAllTeachers(teachers);
    }
  };
  // Search Table By Gender
  const handleSearchByGender = (event: any) => {
    if (event) {
      const searchInput = event.value;
      let searchTeachers = [...teachers];
      let result: any = [];
      for (var i = 0; i < searchTeachers.length; i++) {
        if (searchTeachers[i].sex.includes(searchInput)) {
          result.push(searchTeachers[i]);
        }
      }
      setAllTeachers(result);
    } else {
      setAllTeachers(teachers);
    }
  };
  // Teacher Table
  const teacherTable = () => (
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
                        <h3 className="card-title">All Teachers</h3>
                        <div className="card-tools">
                          <div
                            className="input-group input-group-sm"
                            style={{ width: 150 }}
                          >
                            <Link
                              to="/addteacher"
                              type="button"
                              className="btn btn-block btn-primary"
                            >
                              Add New Teacher
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
                                  onChange={handleSearchBySubject}
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
                                Date of Joining
                                <i
                                  onClick={() =>
                                    handleAscSorting("dateOfJoining")
                                  }
                                  className="fas fa-arrow-up fa-xs float-right"
                                  style={{
                                    cursor: "pointer"
                                  }}
                                />
                                <i
                                  onClick={() =>
                                    handleDesSorting("dateOfJoining")
                                  }
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
                                Subject
                                <i
                                  onClick={() => handleAscSorting("subject")}
                                  className="fas fa-arrow-up fa-xs float-right"
                                  style={{
                                    cursor: "pointer"
                                  }}
                                />
                                <i
                                  onClick={() => handleDesSorting("subject")}
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
                            {currentTeachers.length > 0 &&
                              currentTeachers.map((teacher: any, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{teacher.name}</td>
                                    <td>{teacher.fatherName}</td>
                                    <td>{teacher.dateOfJoining}</td>
                                    <td>{teacher.sex}</td>
                                    <td>{teacher.mobile}</td>
                                    <td>{teacher.subject}</td>
                                    <td>
                                      <i
                                        onClick={() => handleEdit(teacher._id)}
                                        className="far fa-edit pr-2"
                                        style={{
                                          color: "#28a745",
                                          cursor: "pointer"
                                        }}
                                      ></i>
                                      <i
                                        onClick={() =>
                                          handleDelete(teacher._id)
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
                              Showing {indexOfFirstTeacher + 1} to{" "}
                              {indexOfLastTeacher > allTeachers.length
                                ? allTeachers.length
                                : indexOfLastTeacher}{" "}
                              of {allTeachers.length} entries
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-7">
                            <Pagination
                              postsPerPage={teacherPerPage}
                              totalPosts={allTeachers.length}
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
              <h1 className="m-0 text-dark">Teachers</h1>
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
            <p>You have successfully deleted the teacher</p>
          </Alert>
        </div>
        {/* /.container-fluid */}
      </div>
      {loading ? <Spinner /> : teacherTable()}
    </div>
  );
};
export default withRouter(TeacherTable);
