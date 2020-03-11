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

const Section = () => {
  const context = useContext(authContext);
  const [state] = useReducer(authReducer, context);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [sectionData, setSectionData] = useState({
    title: "",
    classes: "",
    subjects: []
  });
  const [updateId, setUpdateId] = useState("");

  const { title, classes, subjects } = sectionData;
  const [allSections, setAllSections] = useState(context.sections);
  const [allClasses, setAllClasses] = useState(context.classes);
  const [allSubjects, setAllSubjects] = useState(context.subjects);
  const [currentPage, setCurrentPage] = useState(1);
  const [sectionPerPage, setSectionPerPage] = useState(10);
  const { sections } = context;
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);
  const token = getCookie("token");
  useEffect(() => {
    setLoading(true);
    GetAllSections();
    GetAllClasses();
    GetAllSubjects();
  }, []);
  //Get All Sections
  const GetAllSections = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/api/section/all`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        state.sections = res.data;
        setAllSections(res.data);
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
  //Get All Subjects
  const GetAllSubjects = () => {
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

  const handleChange = (name: string) => (
    event: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSectionData({ ...sectionData, [name]: event.currentTarget.value });
  };
  const handleChangeSelect = (name: string) => (event: any) => {
    console.log(event);
    if (name === "subjects") {
      if (event) {
        let subjectValues = event.map((subj: any) => subj.value);
        console.log(subjectValues);
        setSectionData({ ...sectionData, [name]: subjectValues });
      }
    } else {
      setSectionData({ ...sectionData, [name]: event.value });
    }
  };

  // Subject Dataset for select
  const subjectOptions = allSubjects.map((val: any) => ({
    value: val.title,
    label: val.title
  }));
  // Class Dataset for select
  const classOptions = allClasses.map((val: any) => ({
    value: val._id,
    label: val.title
  }));
  // Add and Update Section
  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    showEditForm ? updateSection() : addNewSection();
  };

  //Add New Section
  const addNewSection = () => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/api/section/add`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: sectionData
    })
      .then((res: any) => {
        GetAllSections();
        setSectionData({ title: "", classes: "", subjects: [] });
        setShowForm(!showForm);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  // Update Section
  const updateSection = () => {
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/api/section?id=${updateId}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: sectionData
    })
      .then((res: any) => {
        GetAllSections();
        setSectionData({ title: "", classes: "", subjects: [] });
        setUpdateId("");
        setShowEditForm(!showEditForm);
        setShowForm(!showForm);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  //Delete Section
  const handleDelete = (id: string) => {
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API}/api/section?id=${id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        state.sections = sections.filter((val: any) => val._id !== id);
        setAllSections(state.sections);
        setVisible(true);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Edit Section
  const handleEdit = (id: string) => {
    setShowForm(true);
    setShowEditForm(true);
    allSections.forEach((val: any) => {
      if (val._id === id) {
        setSectionData({
          title: val.title,
          classes: val.classes,
          subjects: val.subjects
        });
        setUpdateId(val._id);
      }
    });
  };

  //Sorting Ascending
  const handleAscSorting = (str: string) => {
    let ascSortedSection = [...allSections];
    ascSortedSection.sort((a: any, b: any) => {
      if (a[str].toLowerCase() < b[str].toLowerCase()) return -1;
      if (a[str].toLowerCase() > b[str].toLowerCase()) return 1;
      return 0;
    });
    setAllSections(ascSortedSection);
  };
  //Sorting Descending
  const handleDesSorting = (str: string) => {
    let desSortedSection = [...allSections];
    desSortedSection.sort((a: any, b: any) => {
      if (a[str].toLowerCase() < b[str].toLowerCase()) return 1;
      if (a[str].toLowerCase() > b[str].toLowerCase()) return -1;
      return 0;
    });
    setAllSections(desSortedSection);
  };
  //Pagination
  //Get Current Section
  const indexOfLastSection = currentPage * sectionPerPage;
  const indexOfFirstSection = indexOfLastSection - sectionPerPage;
  const currentSections = allSections.slice(
    indexOfFirstSection,
    indexOfLastSection
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  // Section Form
  const addSectionForm = () => (
    <section className="content">
      <div className="container-fluid">
        {/* general form elements */}
        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">Section Form</h3>
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
                  <label>Class</label>
                  <Select
                    //defaultValue={classOptions}
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable
                    isSearchable
                    name="color"
                    options={classOptions}
                    onChange={handleChangeSelect("classes")}
                  />
                </div>

                <div className="form-group col-md-4">
                  <label>Subjects</label>
                  <Select
                    //defaultValue={subjectOptions}
                    isMulti
                    name="colors"
                    options={subjectOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleChangeSelect("subjects")}
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
                {showEditForm ? "Update Section" : "Add Section"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* /.container-fluid */}
    </section>
  );

  //Sections Table
  const sectionTable = () => (
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
                        <h3 className="card-title">All Sections</h3>
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
                                  setSectionData({
                                    title: "",
                                    classes: "",
                                    subjects: []
                                  });
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
                                onClick={() => setShowForm(!showForm)}
                              >
                                {showForm ? "Hide Form" : "Add New Section"}
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
                                Title
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
                              <th>Class</th>
                              <th>Subjects</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentSections.map((val: any, index) => {
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{val.title}</td>

                                  {allClasses.map((aClass: any) =>
                                    aClass._id === val.classes ? (
                                      <td key={aClass._id}>{aClass.title}</td>
                                    ) : null
                                  )}
                                  <td>{val.subjects}</td>
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
                              Showing {indexOfFirstSection + 1} to{" "}
                              {indexOfLastSection > allSections.length
                                ? allSections.length
                                : indexOfLastSection}{" "}
                              of {allSections.length} entries
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-7">
                            <Pagination
                              postsPerPage={sectionPerPage}
                              totalPosts={allSections.length}
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
                <h1 className="m-0 text-dark">Sections</h1>
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
              <p>You have successfully deleted the section</p>
            </Alert>
          </div>
          {/* /.container-fluid */}
        </div>
        {showForm ? addSectionForm() : null}
        {loading ? <Spinner /> : sectionTable()}
      </div>
      <Footer />
    </>
  );
};
export default Section;
