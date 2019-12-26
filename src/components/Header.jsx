import React from 'react';

// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
// import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const useCases = [
  {
    tag: 'business',
    title: 'Business Owner',
  },
  {
    tag: 'homeowner',
    title: 'Home Owner',
  },
  {
    tag: 'nomad',
    title: 'Nomad',
  },
  {
    tag: 'commute',
    title: 'Commuter',
  },
  {
    tag: 'developers',
    title: 'Developer',
  },
];

const Header = ({ dark }) => (
  <header
    className={`header header-sticky ${
      dark ? 'header-minimal-dark' : 'header-minimal-light'
    }`}
  >
    <Container>
      <Row noGutters>
        <Col>
          <Navbar
            collapseOnSelect
            expand="lg"
            bg={dark ? 'dark' : 'white'}
            variant={dark ? 'dark' : 'light'}
          >
            <Navbar.Brand href="/">Protect.Earth</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
              <DropdownButton title="I am a..." variant="Default">
                {useCases.map(useCase => (
                  <Dropdown.Item
                    key={`tag-${useCase.tag}`}
                    href={`/tags/${useCase.tag}`}
                  >
                    {useCase.title}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="https://github.com/philsturgeon/awesome-earth">
                Contribute
              </Nav.Link>

              {/* <Form inline>
                <FormControl type="text" placeholder="Search" />
                <Button>Search</Button>
              </Form> */}
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
    </Container>
  </header>
);

export default Header;
