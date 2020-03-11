import React, { useState, useEffect, useContext, useReducer } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import axios from "axios";
import Select from "react-select";

import NumberFormat from "react-number-format";
//Helpers
import { getCookie } from "../../../utils/common/helpers";

import { authReducer } from "../../../context/authReducer";
import authContext from "../../../context/authContext";

import SideBar from "../../common/SideBar";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import Spinner from "../../common/Spinner";

type TParams = { id: string };
const EditTeacher = ({ history, match }: RouteComponentProps<TParams>) => {
  const context = useContext(authContext);
  const [state] = useReducer(authReducer, context);
  const [loading, setLoading] = useState(false);
  const { subjects } = context;
  const [allSubjects, setAllSubjects] = useState(subjects);
  const [teacherSubject, setTeacherSubject] = useState(0);

  const token = getCookie("token");
  const { teacher } = context;
  const [teacherData, setTeacherData] = useState({
    name: teacher.name,
    fatherName: teacher.fatherName,
    DOB: teacher.DOB,
    dateOfJoining: teacher.dateOfJoining,
    placeOfBirth: teacher.placeOfBirth,
    sex: teacher.sex,
    nationality: teacher.nationality,
    address: teacher.address,
    telephone: teacher.telephone,
    mobile: teacher.mobile,
    subject: teacher.subject
  });
  const id = match.params.id;
  const {
    name,
    fatherName,
    DOB,
    dateOfJoining,
    placeOfBirth,
    sex,
    nationality,
    address,
    telephone,
    mobile,
    subject
  } = teacherData;
  useEffect(() => {
    setLoading(true);
    GetAllSubjects();
    GetTeacher();

    const subjectIndex = subjectOptions.findIndex(
      (subj: any) => subj.value === subject
    );

    setTeacherSubject(subjectIndex);
    console.log("subjectIndex", subjectIndex);
    console.log("teacherSubject", teacherSubject);
    console.log("subject", subject);
  }, []);
  console.log(teacherSubject);
  // Get Teacher By Id
  const GetTeacher = async () => {
    await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/api/teacher?id=${id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        state.teacher = res.data;
        setTeacherData(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };
  // Get All Subjects
  const GetAllSubjects = async () => {
    await axios({
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
  // Subject Dataset for select
  const subjectOptions = allSubjects.map((val: any) => ({
    value: val.title,
    label: val.title
  }));

  const handleChange = (name: string) => (
    event: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setTeacherData({ ...teacherData, [name]: event.currentTarget.value });
  };
  const handleChangeSelect = (name: string) => (event: any) => {
    console.log(event);

    setTeacherData({ ...teacherData, [name]: event.value });
  };
  //Update Teacher
  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const token = getCookie("token");
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/api/teacher?id=${id}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: teacherData
    })
      .then(res => {
        console.log(res);
        history.push("/teachers");
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Teacher Form
  const EditForm = () => (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Update Teacher</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Update Teacher</li>
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
              <h3 className="card-title">Teacher Form</h3>
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
                    <label>Date of Joining</label>
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
                        value={dateOfJoining}
                        onChange={handleChange("dateOfJoining")}
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
                    <label>Subject:</label>
                    <Select
                      defaultValue={subjectOptions[teacherSubject]}
                      className="basic-single"
                      classNamePrefix="select"
                      isClearable
                      isSearchable
                      name="color"
                      options={subjectOptions}
                      onChange={handleChangeSelect("subject")}
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
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* /.container-fluid */}
      </section>
    </div>
  );

  return (
    <React.Fragment>
      <Header />
      <SideBar />
      {loading ? <Spinner /> : EditForm()}
      <Footer />
    </React.Fragment>
  );
};
export default withRouter(EditTeacher);
