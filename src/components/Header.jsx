import React from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { Fork } from '.';

const Header = ({ dark }) => (
  <header
    className={`header header-sticky ${
      dark ? 'header-minimal-dark' : 'header-minimal-light'
    }`}
  >
    <Fork />

    <Container>
      <Row noGutters>
        <Col>
          <Navbar
            bg={dark ? 'dark' : 'light'}
            variant={dark ? 'dark' : 'light'}
          >
            <Nav>
              <Navbar.Brand>Awesom.earth</Navbar.Brand>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/contribute">Contribute</Nav.Link>
            </Nav>
          </Navbar>
        </Col>
      </Row>
    </Container>
  </header>
);

export default Header;
