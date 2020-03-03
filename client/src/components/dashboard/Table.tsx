import React, { useEffect, useState, useContext, useReducer } from "react";
import axios from "axios";
//Helpers
import { getCookie } from "../../utils/common/helpers";

import DataTable, { createTheme } from "react-data-table-component";

import { authReducer } from "../../context/authReducer";
import authContext from "../../context/authContext";
import Spinner from "../common/Spinner";

import "./dashboard.scss";

const Table = () => {
  const context = useContext(authContext);
  const [state] = useReducer(authReducer, context);
  const [loading, setLoading] = useState(false);
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
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const { students } = context;
  students.forEach(student => {
    let dateOfBirth = new Date(student.DOB);
    student.DOB =
      dateOfBirth.getDate() +
      "-" +
      (dateOfBirth.getMonth() + 1) +
      "-" +
      dateOfBirth.getFullYear();
  });
  createTheme("solarized", {
    text: {
      size: "50px"
    },
    headCells: {
      style: {
        paddingLeft: "25px", // override the cell padding for head cells
        paddingRight: "25px",
        fontSize: "20px"
      }
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF"
    },
    divider: {
      default: "#073642"
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)"
    }
  });
  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true
    },
    {
      name: "Father Name",
      selector: "fatherName",
      sortable: true
    },
    {
      name: "Date of Birth	",
      selector: "DOB",
      sortable: true
    },
    {
      name: "Gender",
      selector: "sex",
      sortable: true
    },
    {
      name: "Mobile",
      selector: "mobile",
      sortable: true
    },
    {
      name: "Class",
      selector: "classes",
      sortable: true
    }
  ];

  const studentTable = () => (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body table-responsive p-0">
                <DataTable
                  title="Students"
                  columns={columns}
                  data={students}
                  theme="solarized"
                  pagination
                  striped
                  persistTableHead
                />
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
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {loading ? <Spinner /> : studentTable()}
    </div>
  );
};
export default Table;
