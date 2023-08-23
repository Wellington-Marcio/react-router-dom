import React from "react";

export default function Navbar() {
  return (
    <nav className="#b9f6ca green accent-1">
      <div className="container">
        <div className="nav-wrapper">
          <a href="#!" className="brand-logo">
            Logo
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <a className="#00e5ff cyan accent-3, waves-effect waves-light btn ">Home</a>
            </li>
            <li>
              <a className="#00e5ff cyan accent-3, waves-effect waves-light btn">Dashboard</a>
            </li>
            <li>
              <a className="#00e5ff cyan accent-3, waves-effect waves-light btn">
                Login <i className="material-icons right">login</i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
