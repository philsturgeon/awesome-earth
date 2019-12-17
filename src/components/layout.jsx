import React from "react";
import PropTypes from 'prop-types';

// components
import Fork from "./fork";
import SEO from "./seo";

import CountryContext from "../context/country-context";
import { Link } from "gatsby";
import countries from "../countries";

const Layout = ({ title, seoTitle, image, description, children, dark }) => {
  return (
    <>
      <SEO
        title={seoTitle}
        description={description}
        keywords={[]}
        meta={[]}
        image={image}
      />
      <div className="content">
        <header className={`header header-sticky ${dark ? 'header-minimal-dark' : 'header-minimal-light'}`}>
          <Fork />
          <div className="container">
            <div className="row">
              <nav className={`navbar navbar-expand-lg ${dark ? 'navbar-dark' : 'navbar-light'}`}>
                <a href="/" className="navbar-brand">Awesome.earth</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <a className="nav-link active" href="/">Home</a>
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" id="dropdown-1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Example Link
                      </a>
                      <div className="dropdown-menu" aria-labelledby="dropdown-1">
                        <a className="dropdown-item" href="#">Demo Link 1</a>
                        <a className="dropdown-item" href="#">Demo Link 2</a>
                        <a className="dropdown-item" href="#">Demo Link 3</a>
                        <a className="dropdown-item" href="#">Demo Link 4</a>
                      </div>
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link  dropdown-toggle" href="#" id="dropdown-2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Another link
                      </a>
                      <div className="dropdown-menu" aria-labelledby="dropdown-2">
                        <a className="dropdown-item active" href="#">Demo Link 1</a>
                        <a className="dropdown-item" href="#">Demo Link 2</a>
                        <a className="dropdown-item" href="#">Demo Link 3</a>

                      </div>
                    </li>

                  </ul>
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <a className="nav-link" href="#">More Links</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">Another Link</a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </header>

        {children}
      </div>
      <div className="half">
        <span className="half-bg bg-white"></span>
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <div className="btn-frame bg-light">
                <a data-scroll href="#top" className="btn btn-top btn-white btn-ico btn-lg btn-rounded"><i className="icon-arrow-up2 fs-22"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="half bg-white">
        <span className="half-bg bg-dark"></span>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="boxed no-border p-4 bg-secondary">
                <div className="row gutter-2 align-items-center">
                  <div className="col-12 col-md-6 text-white">
                    <h3>Get on our mailing list, save the world!</h3>
                  </div>
                  <div className="col-12 col-md-6">
                    <input type="email" className="form-control form-control-inverted form-control-rounded" id="exampleInputEmail1" placeholder="Enter your email" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-dark">
        <div className="container">
          <div className="row gutter-3">
            <div className="col-12 col-md-2">
              <a href="/" className="text-white">Awesom.earth</a>
            </div>
            <div className="col-12 col-md-6 text-white">
              <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <div className="row">
                <div className="col">
                  <ul className="list-group list-group-minimal">
                    <li className="list-group-item"><a href="" className="link">Link </a></li>
                    <li className="list-group-item"><a href="" className="link">Link </a></li>
                    <li className="list-group-item"><a href="" className="link">Link </a></li>
                  </ul>
                </div>
                <div className="col">
                  <ul className="list-group list-group-minimal">
                    <li className="list-group-item"><a href="" className="link">REST API</a></li>
                    <li className="list-group-item"><a href="" className="link">GRAPH API</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-2 ml-auto text-md-right">
              <div className="dropdown">
                <button className="btn btn-inverted btn-block dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  English
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#">British</a>
                  <a className="dropdown-item" href="#">French</a>
                </div>
                <CountryContext.Consumer>
                  {({ country }) => (
                    <>
                      <div className="credits">
                        Maintained by <a href="https://twitter.com/philsturgeon">@philsturgeon</a> & <a href="https://twitter.com/jungledev">@jungledev</a>.
                    </div>
                      <div className="change-country">
                        {country.name ? <><span className="current">{countries.fromAlpha2Code(country.code).emoji} {country.name}</span> <span>&middot;</span></> : null}
                        <Link to="/select-your-country" className="link">{country.name ? 'Change' : 'Select'} country</Link>
                      </div>
                    </>
                  )}
                </CountryContext.Consumer>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

Layout.propTypes = {
  title: PropTypes.string,
  seoTitle: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
  dark: PropTypes.bool,
};

export default Layout;