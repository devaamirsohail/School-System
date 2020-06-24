import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//Helpers
import {
  getAllClasses,
  getClass,
  addClass,
  updateClass,
  deleteClass
} from "../../../actions/classActions";
import { getAllTeachers } from "../../../actions/teacherActions";

import SideBar from "../../common/SideBar";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import Spinner from "../../common/Spinner";
import ClassTable from "./Table";

const Classes = () => {
  const { loading, classes } = useSelector((state: any) => state.class);
  const { teachers } = useSelector((state: any) => state.teacher);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllClasses());
    dispatch(getAllTeachers());
  }, []);

  const AddClass = (classData: any) => {
    dispatch(addClass(classData));
  };
  const UpdateClass = (id: string, classData: any) => {
    dispatch(updateClass(id, classData));
  };

  //Delete Class
  const handleDelete = (id: string) => {
    dispatch(deleteClass(id));
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
                <h1 className="m-0 text-dark">Classes</h1>
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
        {loading || classes === null || teachers === null ? (
          <Spinner />
        ) : (
          <ClassTable
            classes={classes}
            teachers={teachers}
            handleDelete={handleDelete}
            AddClass={AddClass}
            UpdateClass={UpdateClass}
          />
        )}
      </div>
      <Footer />
    </>
  );
};
export default Classes;
