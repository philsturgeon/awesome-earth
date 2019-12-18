import React from "react";

import { Fork } from ".";

const Header = ({ dark }) => (
  <header
    className={`header header-sticky ${
      dark ? "header-minimal-dark" : "header-minimal-light"
    }`}
  >
    <Fork />
    <div className="container">
      <div className="row">
        <nav
          className={`navbar navbar-expand-lg ${
            dark ? "navbar-dark" : "navbar-light"
          }`}
        >
          <a href="/" className="navbar-brand">
            Awesome.earth
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link active" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="dropdown-1"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Example Link
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdown-1">
                  <a className="dropdown-item" href="#">
                    Demo Link 1
                  </a>
                  <a className="dropdown-item" href="#">
                    Demo Link 2
                  </a>
                  <a className="dropdown-item" href="#">
                    Demo Link 3
                  </a>
                  <a className="dropdown-item" href="#">
                    Demo Link 4
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link  dropdown-toggle"
                  href="#"
                  id="dropdown-2"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Another link
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdown-2">
                  <a className="dropdown-item active" href="#">
                    Demo Link 1
                  </a>
                  <a className="dropdown-item" href="#">
                    Demo Link 2
                  </a>
                  <a className="dropdown-item" href="#">
                    Demo Link 3
                  </a>
                </div>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  More Links
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Another Link
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </header>
);

export default Header;
