import React from 'react';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
// import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';

import CountryContext from '../context/country-context';
import countries from '../countries';

const Footer = () => (
  <footer
    className="bg-dark"
    style={{ marginTop: '3rem', paddingTop: '8rem', paddingBottom: '10rem' }}
  >
    <Container>
      <Row noGutters>
        <Col xs={12} md={10} className="text-white">
          <a href="/">&copy; 2019- Awesom.earth</a>

          <div className="credits">
            Maintained by{' '}
            <OutboundLink
              href="https://twitter.com/philsturgeon"
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
              @jungledev
            </OutboundLink>{' '}
            <OutboundLink
              href="https://twitter.com/irreverentmike"
              target="_blank"
              rel="noopener noreferrer"
            >
              @irreverentmike
            </OutboundLink>
          </div>
        </Col>
        <Col xs={12} md={2} lg={2}>
          {/* <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Language
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">English</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Español</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Français</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
          {/* <CountryContext.Consumer>
            {({ country }) => (
              <>
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
                  <Button
                    href="/select-your-country"
                    className="link text-white"
                  >
                    {country.name ? 'Change' : 'Filter site for your'} country
                  </Button>
                </div>
              </>
            )}
          </CountryContext.Consumer> */}
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
