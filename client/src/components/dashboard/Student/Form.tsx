import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Select from "react-select";
import NumberFormat from "react-number-format";
//Helpers

const StudentForm = (props: any) => {
  const { allClasses, sections } = props;
  const { errors } = useSelector((state: any) => state);
  const [getClass, setGetClass] = useState("");
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
    section: ""
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
    section
  } = studentData;

  const handleChange = (name: string) => (
    event: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setStudentData({ ...studentData, [name]: event.currentTarget.value });
  };
  const handleChangeSelect = (name: string) => (event: any) => {
    if (event) {
      setGetClass(event.value);
    }
  };
  //Add New Student
  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.AddStudent(studentData);
  };

  // Class Dataset for select
  const classOptions = allClasses.map((val: any) => ({
    value: val.id,
    label: val.title
  }));

  return (
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
                      className={
                        errors && errors.name
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      placeholder="Name"
                      value={name}
                      onChange={handleChange("name")}
                    />
                    {errors && errors.name ? (
                      <span className="error invalid-feedback">
                        {errors.name}
                      </span>
                    ) : null}
                  </div>
                  <div className="form-group col-md-4">
                    <label>Father Name</label>
                    <input
                      type="text"
                      className={
                        errors && errors.fatherName
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      placeholder="Father Name"
                      value={fatherName}
                      onChange={handleChange("fatherName")}
                    />
                    {errors && errors.fatherName ? (
                      <span className="error invalid-feedback">
                        {errors.fatherName}
                      </span>
                    ) : null}
                  </div>
                  <div className="form-group col-md-4">
                    <label>Nationality</label>
                    <input
                      type="text"
                      className={
                        errors && errors.nationality
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      placeholder="Nationality"
                      value={nationality}
                      onChange={handleChange("nationality")}
                    />
                    {errors && errors.nationality ? (
                      <span className="error invalid-feedback">
                        {errors.nationality}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  {/* left column */}
                  <div className="form-group col-md-4">
                    <label>Place of Birth</label>
                    <input
                      type="text"
                      className={
                        errors && errors.placeOfBirth
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      placeholder="Place of Birth"
                      value={placeOfBirth}
                      onChange={handleChange("placeOfBirth")}
                    />
                  </div>
                  {errors && errors.placeOfBirth ? (
                    <span className="error invalid-feedback">
                      {errors.placeOfBirth}
                    </span>
                  ) : null}
                  <div className="form-group col-md-8">
                    <label>Address</label>
                    <input
                      type="text"
                      className={
                        errors && errors.address
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      placeholder="Address"
                      value={address}
                      onChange={handleChange("address")}
                    />
                    {errors && errors.address ? (
                      <span className="error invalid-feedback">
                        {errors.address}
                      </span>
                    ) : null}
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
                        className={
                          errors && errors.DOB
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        format="##-##-####"
                        placeholder="DD-MM-YYYY"
                        mask={["D", "D", "M", "M", "Y", "Y", "Y", "Y"]}
                        value={DOB}
                        onChange={handleChange("DOB")}
                      />
                      {errors && errors.DOB ? (
                        <span className="error invalid-feedback">
                          {errors.DOB}
                        </span>
                      ) : null}
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
                        className={
                          errors && errors.dateOfAdmission
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        format="##-##-####"
                        placeholder="DD-MM-YYYY"
                        mask={["D", "D", "M", "M", "Y", "Y", "Y", "Y"]}
                        value={dateOfAdmission}
                        onChange={handleChange("dateOfAdmission")}
                      />
                      {errors && errors.dateOfAdmission ? (
                        <span className="error invalid-feedback">
                          {errors.dateOfAdmission}
                        </span>
                      ) : null}
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
                        className={
                          errors && errors.telephone
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        format="### ### ####"
                        mask="_"
                        value={telephone}
                        onChange={handleChange("telephone")}
                      />
                      {errors && errors.telephone ? (
                        <span className="error invalid-feedback">
                          {errors.telephone}
                        </span>
                      ) : null}
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
                        className={
                          errors && errors.mobile
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        format="#### ### ####"
                        mask="_"
                        value={mobile}
                        onChange={handleChange("mobile")}
                      />
                      {errors && errors.mobile ? (
                        <span className="error invalid-feedback">
                          {errors.mobile}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group col-md-4">
                    <label>Class</label>
                    <Select
                      className={
                        errors && errors.classes
                          ? "form-control basic-single is-invalid"
                          : "basic-single"
                      }
                      classNamePrefix="select"
                      isClearable
                      isSearchable
                      name="color"
                      options={classOptions}
                      onChange={handleChangeSelect("classes")}
                    />
                    {errors && errors.classes ? (
                      <span className="error invalid-feedback">
                        {errors.classes}
                      </span>
                    ) : null}
                  </div>
                </div>
                {getClass ? (
                  <div className="row">
                    <div className="form-group col-md-4">
                      <label>Section</label>

                      <select
                        onChange={handleChange("section")}
                        className="form-control"
                      >
                        {sections.map((section: any, index: any) =>
                          section.classes === getClass ? (
                            <option value={section.id}>{section.title}</option>
                          ) : null
                        )}
                      </select>
                      {errors && errors.section ? (
                        <span className="error invalid-feedback">
                          {errors.section}
                        </span>
                      ) : null}
                    </div>
                  </div>
                ) : null}
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
  );
};
export default StudentForm;
