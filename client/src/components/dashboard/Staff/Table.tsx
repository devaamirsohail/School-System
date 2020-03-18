import React, { useEffect, useState, useContext, useReducer } from "react";
import axios from "axios";
import { Alert } from "reactstrap";
import Select from "react-select";

//Helpers
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

import { authReducer } from "../../../context/authReducer";
import authContext from "../../../context/authContext";
import Spinner from "../../common/Spinner";
import Pagination from "../common/Pagination";

const StaffTable = ({ history }: RouteComponentProps) => {
  const context = useContext(authContext);
  const [state] = useReducer(authReducer, context);
  const [loading, setLoading] = useState(false);
  const [allStaff, setAllStaff] = useState(context.staff);
  const { staff } = context;
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [staffPerPage, setStaffPerPage] = useState(10);

  // Remove Alert
  const onDismiss = () => setVisible(false);

  useEffect(() => {
    setLoading(true);
    GetAllStaff();
  }, []);
  //Get All Staff
  const GetAllStaff = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/api/staff/all`
    })
      .then(res => {
        state.staff = res.data;
        setAllStaff(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

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
  //Edit Staff
  const handleEdit = (id: string) => {
    history.push(`/staff/${id}`);
  };
  //Delete Staff
  const handleDelete = (id: string) => {
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API}/api/staff?id=${id}`
    })
      .then(res => {
        state.staff = staff.filter((staff: any) => staff._id !== id);
        setAllStaff(state.staff);
        setVisible(true);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  //Sorting Ascending
  const handleAscSorting = (str: string) => {
    let ascSortedStaff = [...allStaff];
    ascSortedStaff.sort((a: any, b: any) => {
      if (a[str].toLowerCase() < b[str].toLowerCase()) return -1;
      if (a[str].toLowerCase() > b[str].toLowerCase()) return 1;
      return 0;
    });
    setAllStaff(ascSortedStaff);
  };
  //Sorting Descending
  const handleDesSorting = (str: string) => {
    let desSortedStaff = [...allStaff];
    desSortedStaff.sort((a: any, b: any) => {
      if (a[str].toLowerCase() < b[str].toLowerCase()) return 1;
      if (a[str].toLowerCase() > b[str].toLowerCase()) return -1;
      return 0;
    });
    setAllStaff(desSortedStaff);
  };
  //Pagination
  //Get Current Staff
  const indexOfLastStaff = currentPage * staffPerPage;
  const indexOfFirstStaff = indexOfLastStaff - staffPerPage;
  const currentStaff = allStaff.slice(indexOfFirstStaff, indexOfLastStaff);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  // Search Table By Name and Father Name
  const handleSearch = (event: any) => {
    const searchInput = event.currentTarget.value.toLowerCase();
    let searchStaff = [...staff];
    let result: any = [];
    for (var i = 0; i < searchStaff.length; i++) {
      if (searchStaff[i].name.toLowerCase().includes(searchInput)) {
        result.push(searchStaff[i]);
      } else if (
        searchStaff[i].fatherName.toLowerCase().includes(searchInput)
      ) {
        result.push(searchStaff[i]);
      }
    }
    setAllStaff(result);
  };
  // Search Table By Role
  const handleSearchByRole = (event: any) => {
    const searchInput = event.currentTarget.value.toLowerCase();
    let searchStaff = [...staff];
    let result: any = [];
    for (var i = 0; i < searchStaff.length; i++) {
      if (searchStaff[i].role.toLowerCase().includes(searchInput)) {
        result.push(searchStaff[i]);
      }
    }
    setAllStaff(result);
  };
  // Search Table By Mobile
  const handleSearchByMobile = (event: any) => {
    const searchInput = event.currentTarget.value;
    let searchStaff = [...staff];
    let result: any = [];
    for (var i = 0; i < searchStaff.length; i++) {
      if (searchStaff[i].mobile.includes(searchInput)) {
        result.push(searchStaff[i]);
      }
    }
    setAllStaff(result);
  };

  // Search Table By Gender
  const handleSearchByGender = (event: any) => {
    if (event) {
      const searchInput = event.value;
      let searchStaff = [...staff];
      let result: any = [];
      for (var i = 0; i < searchStaff.length; i++) {
        if (searchStaff[i].sex.includes(searchInput)) {
          result.push(searchStaff[i]);
        }
      }
      setAllStaff(result);
    } else {
      setAllStaff(staff);
    }
  };
  // Staff Table
  const staffTable = () => (
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
                        <h3 className="card-title">All Staff</h3>
                        <div className="card-tools">
                          <div
                            className="input-group input-group-sm"
                            style={{ width: 150 }}
                          >
                            <Link
                              to="/addstaff"
                              type="button"
                              className="btn btn-block btn-primary"
                            >
                              Add New Staff
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
                                {" "}
                                <input
                                  type="search"
                                  className="form-control "
                                  placeholder="Search"
                                  onChange={handleSearchByRole}
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
                                Role
                                <i
                                  onClick={() => handleAscSorting("role")}
                                  className="fas fa-arrow-up fa-xs float-right"
                                  style={{
                                    cursor: "pointer"
                                  }}
                                />
                                <i
                                  onClick={() => handleDesSorting("role")}
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
                            {currentStaff.length > 0 &&
                              currentStaff.map((staff: any, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{staff.name}</td>
                                    <td>{staff.fatherName}</td>
                                    <td>{staff.dateOfJoining}</td>
                                    <td>{staff.sex}</td>
                                    <td>{staff.mobile}</td>
                                    <td>{staff.role}</td>
                                    <td>
                                      <i
                                        onClick={() => handleEdit(staff._id)}
                                        className="far fa-edit pr-2"
                                        style={{
                                          color: "#28a745",
                                          cursor: "pointer"
                                        }}
                                      ></i>
                                      <i
                                        onClick={() => handleDelete(staff._id)}
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
                              Showing{" "}
                              {allStaff.length > 0
                                ? indexOfFirstStaff + 1
                                : "0"}{" "}
                              to{" "}
                              {indexOfLastStaff > allStaff.length
                                ? allStaff.length
                                : indexOfLastStaff}{" "}
                              of {allStaff.length} entries
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-7">
                            <Pagination
                              postsPerPage={staffPerPage}
                              totalPosts={allStaff.length}
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
              <h1 className="m-0 text-dark">Staff</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Staff</li>
              </ol>
            </div>
            {/* /.col */}
          </div>
          <Alert color="success" isOpen={visible} toggle={onDismiss}>
            <h4 className="alert-heading">Success</h4>
            <p>You have successfully deleted the staff memeber</p>
          </Alert>
        </div>
        {/* /.container-fluid */}
      </div>
      {loading ? <Spinner /> : staffTable()}
    </div>
  );
};
export default withRouter(StaffTable);
