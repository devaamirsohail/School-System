import React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#">
            <i className="fas fa-bars" />
          </a>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item d-none d-sm-inline-block flex">
          <Link to="/" className="nav-link">
            <i
              onClick={() => {
                dispatch(logoutUser());
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
