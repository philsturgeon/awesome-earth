import React from "react";
import { Link } from "gatsby";

import CountryContext from "../context/country-context";
import countries from "../countries";

const Footer = () => (
  <footer className="bg-dark">
    <div className="container">
      <div className="row gutter-3">
        <div className="col-12 col-md-2">
          <a href="/" className="text-white">
            Awesom.earth
          </a>
        </div>
        <div className="col-12 col-md-6 text-white">
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="row">
            <div className="col">
              <ul className="list-group list-group-minimal">
                <li className="list-group-item">
                  <a href="" className="link">
                    Link{" "}
                  </a>
                </li>
                <li className="list-group-item">
                  <a href="" className="link">
                    Link{" "}
                  </a>
                </li>
                <li className="list-group-item">
                  <a href="" className="link">
                    Link{" "}
                  </a>
                </li>
              </ul>
            </div>
            <div className="col">
              <ul className="list-group list-group-minimal">
                <li className="list-group-item">
                  <a href="" className="link">
                    REST API
                  </a>
                </li>
                <li className="list-group-item">
                  <a href="" className="link">
                    GRAPH API
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 col-lg-2 ml-auto text-md-right">
          <div className="dropdown">
            <button
              className="btn btn-inverted btn-block dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              English
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="#">
                British
              </a>
              <a className="dropdown-item" href="#">
                French
              </a>
            </div>
            <CountryContext.Consumer>
              {({ country }) => (
                <>
                  <div className="credits">
                    Maintained by{" "}
                    <a href="https://twitter.com/philsturgeon">@philsturgeon</a>{" "}
                    & <a href="https://twitter.com/jungledev">@jungledev</a>.
                  </div>
                  <div className="change-country">
                    {country.name ? (
                      <>
                        <span className="current">
                          {countries.fromAlpha2Code(country.code).emoji}{" "}
                          {country.name}
                        </span>{" "}
                        <span>&middot;</span>
                      </>
                    ) : null}
                    <Link to="/select-your-country" className="link">
                      {country.name ? "Change" : "Select"} country
                    </Link>
                  </div>
                </>
              )}
            </CountryContext.Consumer>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
