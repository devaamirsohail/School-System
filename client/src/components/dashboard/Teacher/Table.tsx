import React, { useState } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import Pagination from "../common/Pagination";

const TeacherTable = (props: any) => {
  const { teachers, subjects } = props;
  const [allTeachers, setAllTeachers] = useState(teachers);
  const [allSubjects, setAllSubjects] = useState(subjects);
  const [currentPage, setCurrentPage] = useState(1);
  const [teacherPerPage, setTeacherPerPage] = useState(10);

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

  return (
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
                              currentTeachers.map(
                                (teacher: any, index: any) => {
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
                                          onClick={() =>
                                            props.handleEdit(teacher._id)
                                          }
                                          className="far fa-edit pr-2"
                                          style={{
                                            color: "#28a745",
                                            cursor: "pointer"
                                          }}
                                        ></i>
                                        <i
                                          onClick={() =>
                                            props.handleDelete(teacher._id)
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
                                }
                              )}
                          </tbody>
                        </table>
                      </div>
                      {/* /.card-body */}
                      <div className="card-footer ">
                        <div className="row">
                          <div className="col-sm-12 col-md-5">
                            <div className="dataTables_info">
                              Showing{" "}
                              {allTeachers.length < 1
                                ? "0"
                                : indexOfFirstTeacher + 1}{" "}
                              to{" "}
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
};
export default TeacherTable;
