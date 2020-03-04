import React, { useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import axios from "axios";

import NumberFormat from "react-number-format";
//Helpers
import { getCookie } from "../../utils/common/helpers";

import SideBar from "../common/SideBar";
import Header from "../common/Header";
import Footer from "../common/Footer";

const StudentForm = ({ history }: RouteComponentProps) => {
  const [studentData, setStudentData] = useState({
    name: "",
    fatherName: "",
    DOB: "",
    dateOfAdmission: "",
    placeOfBirth: "",
    sex: "Male",
    nationality: "",
    address: "",
    telephone: "",
    mobile: "",
    classes: "1st Class"
  });

  const {
    name,
    fatherName,
    DOB,
    dateOfAdmission,
    placeOfBirth,
    sex,
    nationality,
    address,
    telephone,
    mobile,
    classes
  } = studentData;

  const handleChange = (name: string) => (
    event: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setStudentData({ ...studentData, [name]: event.currentTarget.value });
  };
  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const token = getCookie("token");
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/api/student/add`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: studentData
    })
      .then(res => {
        console.log(res);
        history.push("/students");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <Header />
      <SideBar />
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Add Student</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Add Student</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>

        <section className="content">
          <div className="container-fluid">
            {/* general form elements */}
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">Student Form</h3>
              </div>
              {/* /.card-header */}
              {/* form start */}
              <form role="form">
                <div className="card-body">
                  <div className="row">
                    {/* left column */}
                    <div className="form-group col-md-4">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={name}
                        onChange={handleChange("name")}
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label>Father Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Father Name"
                        value={fatherName}
                        onChange={handleChange("fatherName")}
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label>Nationality</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nationality"
                        value={nationality}
                        onChange={handleChange("nationality")}
                      />
                    </div>
                  </div>
                  <div className="row">
                    {/* left column */}
                    <div className="form-group col-md-4">
                      <label>Place of Birth</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Place of Birth"
                        value={placeOfBirth}
                        onChange={handleChange("placeOfBirth")}
                      />
                    </div>
                    <div className="form-group col-md-8">
                      <label>Address</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address"
                        value={address}
                        onChange={handleChange("address")}
                      />
                    </div>
                  </div>
                  <div className="row">
                    {/* left column */}
                    <div className="form-group col-md-4">
                      <label>Sex</label>
                      <div className="form-group clearfix row">
                        <div className="icheck-primary d-inline col-4">
                          <input
                            type="radio"
                            name="sex"
                            defaultChecked={
                              sex.toLowerCase() === "male" ? true : false
                            }
                            id="radioSuccess1"
                            value="Male"
                            onClick={handleChange("sex")}
                          />
                          <label htmlFor="radioSuccess1">Male</label>
                        </div>
                        <div className="icheck-primary d-inline col-4">
                          <input
                            type="radio"
                            name="sex"
                            defaultChecked={
                              sex.toLowerCase() === "female" ? true : false
                            }
                            value="Female"
                            id="radioSuccess3"
                            onClick={handleChange("sex")}
                          />
                          <label htmlFor="radioSuccess3">Female</label>
                        </div>
                      </div>
                    </div>

                    <div className="form-group col-md-4">
                      <label>Date of Birth:</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="far fa-calendar-alt" />
                          </span>
                        </div>
                        <NumberFormat
                          className="form-control"
                          format="##-##-####"
                          placeholder="DD-MM-YYYY"
                          mask={["D", "D", "M", "M", "Y", "Y", "Y", "Y"]}
                          value={DOB}
                          onChange={handleChange("DOB")}
                        />
                      </div>

                      {/* /.input group */}
                    </div>

                    <div className="form-group col-md-4">
                      <label>Date of Admission</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="far fa-calendar-alt" />
                          </span>
                        </div>
                        <NumberFormat
                          className="form-control"
                          format="##-##-####"
                          placeholder="DD-MM-YYYY"
                          mask={["D", "D", "M", "M", "Y", "Y", "Y", "Y"]}
                          value={dateOfAdmission}
                          onChange={handleChange("dateOfAdmission")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {/* left column */}
                    <div className="form-group col-md-4">
                      <label>Telephone</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-phone" />
                          </span>
                        </div>
                        <NumberFormat
                          className="form-control"
                          format="### ### ####"
                          mask="_"
                          value={telephone}
                          onChange={handleChange("telephone")}
                        />
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <label>Mobile</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-mobile-alt"></i>
                          </span>
                        </div>
                        <NumberFormat
                          className="form-control"
                          format="#### ### ####"
                          mask="_"
                          value={mobile}
                          onChange={handleChange("mobile")}
                        />
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <label>Class</label>
                      <select
                        onChange={handleChange("classes")}
                        className="form-control "
                        value={classes}
                      >
                        <option value="1st Class">1st Class</option>
                        <option value="2nd Class">2nd Class</option>
                        <option value="3th Class">3th Class</option>
                        <option value="4th Class">4th Class</option>
                        <option value="5th Class">5th Class</option>
                        <option value="6th Class">6th Class</option>
                        <option value="7th Class">7th Class</option>
                        <option value="8th Class">8th Class</option>
                        <option value="9th Class">9th Class</option>
                        <option value="10th Class">10th Class</option>
                      </select>
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
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* /.container-fluid */}
        </section>
      </div>
      <Footer />
    </React.Fragment>
  );
};
export default StudentForm;
