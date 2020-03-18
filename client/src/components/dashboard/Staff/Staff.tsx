import React from "react";

import TeacherTable from "./Table";

import SideBar from "../../common/SideBar";
import Header from "../../common/Header";
import Footer from "../../common/Footer";

const Main = () => (
  <React.Fragment>
    <Header />
    <SideBar />
    <TeacherTable />
    <Footer />
  </React.Fragment>
);
export default Main;
