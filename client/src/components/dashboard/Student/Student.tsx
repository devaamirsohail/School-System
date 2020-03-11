import React from "react";

import StudentTable from "./Table";

import SideBar from "../../common/SideBar";
import Header from "../../common/Header";
import Footer from "../../common/Footer";

const Main = () => (
  <React.Fragment>
    <Header />
    <SideBar />
    <StudentTable />
    <Footer />
  </React.Fragment>
);
export default Main;
