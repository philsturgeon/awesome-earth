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
        <header class={`header header-sticky ${dark ? 'header-minimal-dark' : 'header-minimal-light'}`}>
          <Fork />
          <div class="container">
            <div class="row">
              <nav class={`navbar navbar-expand-lg ${dark ? 'navbar-dark' : 'navbar-light'}`}>
                <a href="/" class="navbar-brand">Awesome.earth</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                      <a class="nav-link active" href="/">Home</a>
                    </li>
                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" id="dropdown-1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Example Link
                      </a>
                      <div class="dropdown-menu" aria-labelledby="dropdown-1">
                        <a class="dropdown-item" href="#">Demo Link 1</a>
                        <a class="dropdown-item" href="#">Demo Link 2</a>
                        <a class="dropdown-item" href="#">Demo Link 3</a>
                        <a class="dropdown-item" href="#">Demo Link 4</a>
                      </div>
                    </li>
                    <li class="nav-item dropdown">
                      <a class="nav-link  dropdown-toggle" href="#" id="dropdown-2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Another link
                      </a>
                      <div class="dropdown-menu" aria-labelledby="dropdown-2">
                        <a class="dropdown-item active" href="#">Demo Link 1</a>
                        <a class="dropdown-item" href="#">Demo Link 2</a>
                        <a class="dropdown-item" href="#">Demo Link 3</a>

                      </div>
                    </li>

                  </ul>
                  <ul class="navbar-nav">
                    <li class="nav-item">
                      <a class="nav-link" href="#">More Links</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Another Link</a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </header>

        {children}
      </div>
      <div class="half">
        <span class="half-bg bg-white"></span>
        <div class="container">
          <div class="row">
            <div class="col text-center">
              <div class="btn-frame bg-light">
                <a data-scroll href="#top" class="btn btn-top btn-white btn-ico btn-lg btn-rounded"><i class="icon-arrow-up2 fs-22"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="half bg-white">
        <span class="half-bg bg-dark"></span>
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="boxed no-border p-4 bg-secondary">
                <div class="row gutter-2 align-items-center">
                  <div class="col-12 col-md-6 text-white">
                    <h3>Get on our mailing list, save the world!</h3>
                  </div>
                  <div class="col-12 col-md-6">
                    <input type="email" class="form-control form-control-inverted form-control-rounded" id="exampleInputEmail1" placeholder="Enter your email" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer class="bg-dark">
        <div class="container">
          <div class="row gutter-3">
            <div class="col-12 col-md-2">
              <a href="/" class="text-white">Awesom.earth</a>
            </div>
            <div class="col-12 col-md-6 text-white">
              <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <div class="row">
                <div class="col">
                  <ul class="list-group list-group-minimal">
                    <li class="list-group-item"><a href="" class="link">Link </a></li>
                    <li class="list-group-item"><a href="" class="link">Link </a></li>
                    <li class="list-group-item"><a href="" class="link">Link </a></li>
                  </ul>
                </div>
                <div class="col">
                  <ul class="list-group list-group-minimal">
                    <li class="list-group-item"><a href="" class="link">REST API</a></li>
                    <li class="list-group-item"><a href="" class="link">GRAPH API</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-4 col-lg-2 ml-auto text-md-right">
              <div class="dropdown">
                <button class="btn btn-inverted btn-block dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  English
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="#">British</a>
                  <a class="dropdown-item" href="#">French</a>
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