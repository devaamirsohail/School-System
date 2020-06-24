import React, { useState, useEffect } from "react";
import Select from "react-select";

import Pagination from "../common/Pagination";

const ClassTable = (props: any) => {
  const { classes, teachers } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [classPerPage, setClassPerPage] = useState(10);
  const [allClasses, setAllClasses] = useState(classes);
  const [updateId, setUpdateId] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [classData, setClassData] = useState({
    title: "",
    HOC: ""
  });
  const { title, HOC } = classData;

  //Sorting Ascending
  const handleAscSorting = (str: string) => {
    let ascSortedClass = [...classes];
    ascSortedClass.sort((a: any, b: any) => {
      if (a[str].toLowerCase() < b[str].toLowerCase()) return -1;
      if (a[str].toLowerCase() > b[str].toLowerCase()) return 1;
      return 0;
    });
    setAllClasses(ascSortedClass);
  };
  //Sorting Descending
  const handleDesSorting = (str: string) => {
    let desSortedClass = [...classes];
    desSortedClass.sort((a: any, b: any) => {
      if (a[str].toLowerCase() < b[str].toLowerCase()) return 1;
      if (a[str].toLowerCase() > b[str].toLowerCase()) return -1;
      return 0;
    });
    setAllClasses(desSortedClass);
  };
  //Pagination
  //Get Current Class
  const indexOfLastClass = currentPage * classPerPage;
  const indexOfFirstClass = indexOfLastClass - classPerPage;
  const currentClasses = allClasses.slice(indexOfFirstClass, indexOfLastClass);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleChange = (name: string) => (
    event: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setClassData({ ...classData, [name]: event.currentTarget.value });
  };
  const handleChangeSelect = (name: string) => (event: any) => {
    if (event) {
      setClassData({ ...classData, [name]: event.value });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    showEditForm
      ? props.UpdateClass(updateId, classData)
      : props.AddClass(classData);
  };

  // Show Edit Form
  const handleEdit = (id: string) => {
    setShowEditForm(true);
    classes.forEach((val: any) => {
      if (val._id === id) {
        setClassData({ title: val.title, HOC: val.HOC });
        setUpdateId(val._id);
      }
    });
  };
  // Teacher Dataset for select
  const teacherOptions = teachers.map((val: any) => ({
    value: val._id,
    label: val.name
  }));

  //Class Form
  const addClassForm = () => (
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
                  <label>Head of Class:</label>

                  <Select
                    defaultValue={
                      teacherOptions[
                        teacherOptions.findIndex(
                          (teacher: any) => teacher.value === HOC
                        )
                      ]
                    }
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable
                    isSearchable
                    name="color"
                    options={teacherOptions}
                    onChange={handleChangeSelect("HOC")}
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
                {showEditForm ? "Update Class" : "Add Class"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* /.container-fluid */}
    </section>
  );
  return (
    <>
      {showForm || showEditForm ? addClassForm() : null}

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
                          <h3 className="card-title">All Classes</h3>
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
                                    setShowForm(false);
                                    setShowEditForm(false);
                                    setClassData({ title: "", HOC: "" });
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
                                  onClick={() => {
                                    setShowForm(!showForm);
                                    setClassData({ title: "", HOC: "" });
                                  }}
                                >
                                  {showForm ? "Hide Form" : "Add New Class"}
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
                                  Title{" "}
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
                                <th>Head Of Class</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentClasses.map((val: any, index: any) => {
                                return (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{val.title}</td>

                                    {teachers.map((teacher: any) =>
                                      teacher._id === val.HOC ? (
                                        <td key={teacher._id}>
                                          {teacher.name}
                                        </td>
                                      ) : null
                                    )}

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
                                        onClick={() =>
                                          props.handleDelete(val._id)
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
                                Showing{" "}
                                {allClasses && allClasses.length < 1
                                  ? "0"
                                  : indexOfFirstClass + 1}{" "}
                                to{" "}
                                {indexOfLastClass > allClasses.length
                                  ? allClasses.length
                                  : indexOfLastClass}{" "}
                                of {allClasses.length} entries
                              </div>
                            </div>
                            <div className="col-sm-12 col-md-7">
                              <Pagination
                                postsPerPage={classPerPage}
                                totalPosts={allClasses.length}
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
    </>
  );
};
export default ClassTable;
