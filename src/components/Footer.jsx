import React from 'react';
import { Link } from 'gatsby';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import CountryContext from '../context/country-context';
import countries from '../countries';

const Footer = () => (
  <footer className="bg-dark">
    <Container>
      <Row noGutters>
        <Col xs={12} md={2}>
          <a href="/" className="text-white">
            Awesom.earth
          </a>
        </Col>
        <Col xs={12} md={6} className="text-white">
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <Row>
            <Col>
              <ul className="list-group list-group-minimal">
                <li className="list-group-item">
                  <a href="/" className="link">
                    Link{' '}
                  </a>
                </li>
                <li className="list-group-item">
                  <a href="/" className="link">
                    Link{' '}
                  </a>
                </li>
                <li className="list-group-item">
                  <a href="/" className="link">
                    Link{' '}
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Col>
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
                    Maintained by{' '}
                    <OutboundLink
                      to="https://twitter.com/philsturgeon"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @philsturgeon
                    </OutboundLink>{' '}
                    <OutboundLink
                      href="https://twitter.com/jungledev"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      >@jungledev
                    </OutboundLink>{' '}
                    <OutboundLink
                      href="https://twitter.com/irreverentmike"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @irreverentmike
                    </OutboundLink>
                  </div>
                  <div className="change-country">
                    {country.name ? (
                      <>
                        <span className="current">
                          {countries.fromAlpha2Code(country.code).emoji}{' '}
                          {country.name}
                        </span>{' '}
                        <span>&middot;</span>
                      </>
                    ) : null}
                    <Link to="/select-your-country" className="link">
                      {country.name ? 'Change' : 'Select'} country
                    </Link>
                  </div>
                </>
              )}
            </CountryContext.Consumer>
          </div>
        </div>
      </Row>
    </Container>
  </footer>
);

export default Footer;
