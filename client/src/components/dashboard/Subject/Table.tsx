import React, { useState } from "react";

import Pagination from "../common/Pagination";

const SubjectTable = (props: any) => {
  const { subjects } = props;
  const [subjectTitle, setSubjectTitle] = useState({ title: "" });
  const [allSubjects, setAllSubjects] = useState(subjects);
  const { title } = subjectTitle;
  const [currentPage, setCurrentPage] = useState(1);
  const [subjectPerPage, setSubjectPerPage] = useState(10);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSubjectTitle({ title: event.currentTarget.value });
  };

  //Sorting Ascending
  const handleAscSorting = (str: string) => {
    let ascSortedSubject = [...subjects];
    ascSortedSubject.sort((a: any, b: any) => {
      if (a[str].toLowerCase() < b[str].toLowerCase()) return -1;
      if (a[str].toLowerCase() > b[str].toLowerCase()) return 1;
      return 0;
    });
    setAllSubjects(ascSortedSubject);
  };
  //Sorting Descending
  const handleDesSorting = (str: string) => {
    let desSortedSubject = [...subjects];
    desSortedSubject.sort((a: any, b: any) => {
      if (a[str].toLowerCase() < b[str].toLowerCase()) return 1;
      if (a[str].toLowerCase() > b[str].toLowerCase()) return -1;
      return 0;
    });
    setAllSubjects(desSortedSubject);
  };
  //Pagination
  //Get Current Subject

  const indexOfLastSubject = currentPage * subjectPerPage;
  const indexOfFirstSubject = indexOfLastSubject - subjectPerPage;
  const currentSubjects =
    allSubjects && allSubjects.slice(indexOfFirstSubject, indexOfLastSubject);
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
                        <h3 className="card-title">All Subjects</h3>
                        <div className="card-tools">
                          <div
                            className="input-group input-group-md"
                            style={{ width: 350 }}
                          >
                            <input
                              type="text"
                              name="table_search"
                              className="form-control float-right"
                              placeholder="Subject Title"
                              value={title}
                              onChange={handleChange}
                            />
                            <div className="input-group-append">
                              <button
                                type="submit"
                                className="btn  btn-success"
                                onClick={() => props.handleSubmit(subjectTitle)}
                              >
                                Add Subject
                              </button>
                            </div>
                          </div>
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
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentSubjects &&
                              currentSubjects.map(
                                (subject: any, index: any) => {
                                  return (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>{subject.title}</td>

                                      <td>
                                        <i
                                          onClick={() =>
                                            props.handleDelete(subject._id)
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
                              {allSubjects && allSubjects.length < 1
                                ? "0"
                                : indexOfFirstSubject + 1}{" "}
                              to{" "}
                              {allSubjects &&
                              indexOfLastSubject > allSubjects.length
                                ? allSubjects.length
                                : indexOfLastSubject}{" "}
                              of {allSubjects && allSubjects.length} entries
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-7">
                            <Pagination
                              postsPerPage={subjectPerPage}
                              totalPosts={subjects && subjects.length}
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
export default SubjectTable;
