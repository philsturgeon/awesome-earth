import React from "react";

// components
import SEO from "./seo";

import CountryContext from "../context/country-context";
import { Link } from "gatsby";
import countries from "../countries";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const useCases = [
  {
    tag: 'business',
    title: 'Business Owners'
  },
  {
    tag: 'homeowner',
    title: 'Home Owners'
  },
  {
    tag: 'nomad',
    title: 'Nomads'
  },
  {
    tag: 'commute',
    title: 'Commuters',
  },
  {
    tag: 'developers',
    title: 'Developers'
  },
  {
    tag: 'feminine-products',
    title: 'Feminine Products',
  },
  {
    tag: 'local-authorities',
    title: 'Local Authorities',
  },
];

export default ({ title, seoTitle, image, description, children }) => {
  return (
    <>
      <SEO
        title={seoTitle}
        description={description}
        keywords={[]}
        meta={[]}
        image={image}
      />
      <header>
        <Navbar fixed="top" expand="lg">
          <Navbar.Brand href="/">{title}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav>
              <NavDropdown title="Use-cases" id="basic-nav-dropdown">
                {useCases.map(useCase =>
                  <NavDropdown.Item href={`/tags/${useCase.tag}`}>{useCase.title}</NavDropdown.Item>)}
              </NavDropdown>
              <Nav.Link href="https://github.com/philsturgeon/awesome-earth/">Contribute</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
      <div className="content">
        {children}
      </div>
      <footer className="padding">
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
      </footer>
    </>
  );
};
