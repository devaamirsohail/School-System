import React from "react";
import { Link } from "react-router-dom";
import { signout } from "../../utils/common/helpers";

const Header = () => {
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#">
            <i className="fas fa-bars" />
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to="/dashboard" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to="/students" className="nav-link">
            Students
          </Link>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to="/teachers" className="nav-link">
            Teachers
          </Link>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to="/subjects" className="nav-link">
            Subjects
          </Link>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to="/classes" className="nav-link">
            Classes
          </Link>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to="/section" className="nav-link">
            Sections
          </Link>
        </li>
      </ul>
      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        <li className="nav-item d-none d-sm-inline-block flex">
          <Link to="/" className="nav-link">
            <i
              onClick={() => {
                signout();
              }}
              className="fas fa-sign-out-alt"
            ></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Header;
