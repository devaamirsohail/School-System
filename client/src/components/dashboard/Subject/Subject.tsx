import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//Helpers
import {
  getAllSubjects,
  addSubjects,
  deleteSubjects
} from "../../../actions/subjectActions";

import SideBar from "../../common/SideBar";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import Spinner from "../../common/Spinner";
import SubjectTable from "./Table";

const Subject = () => {
  const { loading, subjects } = useSelector((state: any) => state.subject);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSubjects());
  }, []);
  // Add Subject
  const handleSubmit = (subjectData: any) => {
    dispatch(addSubjects(subjectData));
  };
  //Delete Subject
  const handleDelete = (id: string) => {
    dispatch(deleteSubjects(id));
  };

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
                <h1 className="m-0 text-dark">Subjects</h1>
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
          </div>
          {/* /.container-fluid */}
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <SubjectTable
            subjects={subjects}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
          />
        )}
      </div>
      <Footer />
    </>
  );
};
export default Subject;
