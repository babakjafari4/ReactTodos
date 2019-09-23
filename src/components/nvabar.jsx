import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <button className="navbar-toggler">
        <span className="navbar-toggler-icon"></span>
      </button>
      <Link to="/" className="navbar-brand">
        Topraq
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <Link to="/todos" className="nav-link">
              ToDos
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/dics" className="nav-link">
              Dics
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
