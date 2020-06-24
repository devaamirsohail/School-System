import React, { useState, useEffect } from "react";
import Select from "react-select";

import Pagination from "../common/Pagination";

const SectionTable = (props: any) => {
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [sectionData, setSectionData] = useState({
    title: "",
    classes: "",
    subjects: []
  });
  const [updateId, setUpdateId] = useState("");
  const { title, classes, subjects } = sectionData;
  const [allSections, setAllSections] = useState(props.sections);
  const [allClasses, setAllClasses] = useState(props.classes);
  const [allSubjects, setAllSubjects] = useState(props.subjects);
  const [currentPage, setCurrentPage] = useState(1);
  const [sectionPerPage, setSectionPerPage] = useState(10);

  const handleChange = (name: string) => (
    event: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSectionData({ ...sectionData, [name]: event.currentTarget.value });
  };
  const handleChangeSelect = (name: string) => (event: any) => {
    if (event) {
      if (name === "subjects") {
        let subjectValues = event.map((subj: any) => subj.value);
        setSectionData({ ...sectionData, [name]: subjectValues });
      } else {
        setSectionData({ ...sectionData, [name]: event.value });
      }
    }
    console.log(sectionData);
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    showEditForm
      ? props.UpdateSection(updateId, sectionData)
      : props.AddSection(sectionData);
  };

  // Edit Section
  const handleEdit = (id: string) => {
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
  // Class Dataset for select
  const classOptions = allClasses.map((val: any) => ({
    value: val._id,
    label: val.title
  }));
  // Subject Dataset for select
  const subjectOptions = allSubjects.map((val: any) => ({
    value: val.title,
    label: val.title
  }));
  useEffect(() => {
    const result =
      subjects &&
      subjectOptions.findIndex((subject: any) => {
        subjects.map(val => subject.value === val);
      });
  });

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
                    defaultValue={
                      classOptions[
                        classOptions.findIndex(
                          (aClass: any) => aClass.value === classes
                        )
                      ]
                    }
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
                    defaultValue={
                      subjectOptions[
                        subjectOptions.findIndex((subject: any) => {
                          subjects &&
                            subjects.map(val => subject.value === val);
                        })
                      ]
                    }
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
  return (
    <>
      {showForm || showEditForm ? addSectionForm() : null}

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
                                    setShowForm(false);
                                    setShowEditForm(false);
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
                                  onClick={() => {
                                    setSectionData({
                                      title: "",
                                      classes: "",
                                      subjects: []
                                    });
                                    setShowForm(!showForm);
                                  }}
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
                              {currentSections.map((val: any, index: any) => {
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
                                {allSections && allSections.length < 1
                                  ? "0"
                                  : indexOfFirstSection + 1}{" "}
                                to{" "}
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
    </>
  );
};
export default SectionTable;
