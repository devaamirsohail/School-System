import React, { useState } from "react";
import { Link } from "react-router-dom";

//DatePicker
import DatePicker from "react-date-picker";

import SideBar from "../common/SideBar";
import Header from "../common/Header";
import Footer from "../common/Footer";

const AddStudent = () => {
  const [admissionDate, setAdmissionDate] = useState(new Date());

  const handleChange = (date: any) => {
    setAdmissionDate(date);
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
                      <label htmlFor="exampleInputEmail1">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Name"
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="exampleInputPassword1">Father Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Father Name"
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="exampleInputPassword1">Class</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Class"
                      />
                    </div>
                  </div>
                  <div className="row">
                    {/* left column */}
                    <div className="form-group col-md-4">
                      <label>Admission Date:</label>
                      <div className="input-group">
                        <DatePicker
                          className="form-control"
                          value={admissionDate}
                          onChange={handleChange}
                        />
                      </div>
                      {/* /.input group */}
                    </div>

                    <div className="form-group col-md-4">
                      <label htmlFor="exampleInputPassword1">Father Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Father Name"
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="exampleInputPassword1">Class</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Class"
                      />
                    </div>
                  </div>
                  <div className="row">
                    {/* left column */}
                    <div className="form-group col-md-4">
                      <label htmlFor="exampleInputEmail1">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Name"
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="exampleInputPassword1">Father Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Father Name"
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="exampleInputPassword1">Class</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Class"
                      />
                    </div>
                  </div>
                  <div className="row">
                    {/* left column */}
                    <div className="form-group col-md-4">
                      <label htmlFor="exampleInputEmail1">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Name"
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="exampleInputPassword1">Father Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Father Name"
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="exampleInputPassword1">Class</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Class"
                      />
                    </div>
                  </div>
                  <div className="row">
                    {/* left column */}
                    <div className="form-group col-md-4">
                      <label htmlFor="exampleInputEmail1">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Name"
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="exampleInputPassword1">Father Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Father Name"
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="exampleInputPassword1">Class</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Class"
                      />
                    </div>
                  </div>
                </div>
                {/* /.card-body */}
                <div className="card-footer">
                  <button type="submit" className="btn btn-success">
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
export default AddStudent;
