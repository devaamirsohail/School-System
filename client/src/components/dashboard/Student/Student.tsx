import React from "react";

import Table from "./Table";

import SideBar from "../../common/SideBar";
import Header from "../../common/Header";
import Footer from "../../common/Footer";

const Main = () => (
  <React.Fragment>
    <Header />
    <SideBar />
    <Table />
    <Footer />
  </React.Fragment>
);
export default Main;
