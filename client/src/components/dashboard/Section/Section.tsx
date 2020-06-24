import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//Helpers
import {
  getAllSections,
  addSection,
  updateSection,
  deleteSection
} from "../../../actions/sectionActions";
import { getAllSubjects } from "../../../actions/subjectActions";
import { getAllClasses } from "../../../actions/classActions";

import SideBar from "../../common/SideBar";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import Spinner from "../../common/Spinner";
import SectionTable from "./Table";

const Section = () => {
  const { loading, sections } = useSelector((state: any) => state.section);
  const { classes } = useSelector((state: any) => state.class);
  const { subjects } = useSelector((state: any) => state.subject);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSections());
    dispatch(getAllClasses());
    dispatch(getAllSubjects());
  }, []);
  const AddSection = (sectionData: any) => {
    dispatch(addSection(sectionData));
  };
  const UpdateSection = (id: string, sectionData: any) => {
    dispatch(updateSection(id, sectionData));
  };

  //Delete Section
  const handleDelete = (id: string) => {
    dispatch(deleteSection(id));
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
          </div>
          {/* /.container-fluid */}
        </div>
        {loading ||
        sections === null ||
        classes === null ||
        subjects === null ? (
          <Spinner />
        ) : (
          <SectionTable
            sections={sections}
            classes={classes}
            subjects={subjects}
            handleDelete={handleDelete}
            AddSection={AddSection}
            UpdateSection={UpdateSection}
          />
        )}
      </div>
      <Footer />
    </>
  );
};
export default Section;
