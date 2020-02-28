import React from "react";

import Landing from "./Landing";

import SideBar from "../common/SideBar";
import Header from "../common/Header";
import Footer from "../common/Footer";

const Main = () => (
  <React.Fragment>
    <Header />
    <SideBar />
    <Landing />
    <Footer />
  </React.Fragment>
);
export default Main;
