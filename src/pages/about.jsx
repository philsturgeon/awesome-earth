import React from 'react';

import { Layout } from '../components';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';

const AboutPage = () => (
  <Layout title="About">
    <Jumbotron
      style={{
        marginTop: '1rem',
        minHeight: '45vh',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundImage:
          'url(https://source.unsplash.com/featured/1600x400?nature)',
      }}
    />
    <Container>
      <Row>
        <Col>
          <h1>About this site</h1>
          <p>Lipsum ipsum</p>
        </Col>
      </Row>
    </Container>
  </Layout>
);

export default AboutPage;
