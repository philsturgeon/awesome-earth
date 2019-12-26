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
          <h1>About</h1>
          <p>
            Protect.Earth came around after{' '}
            <a href="https://philsturgeon.com/">Phil</a>
            went riding around Europe in the summer of 2019, the hottest year on
            record with the hottest three months on record.
          </p>
          <p>
            Phil was{' '}
            <a href="https://phil.bike/trees/">raising money for trees</a> with
            <a href="https://offset.earth/">Offset Earth</a>, and after the tour
            lead to a lengthy injury he wanted to find other ways to fight the
            climate crisis.
          </p>
          <p>
            Together with contributions from 50+ people, we gather resources to
            help everyone find their next piece of climate action. The climate
            crisis might be overwhelming when you start to understand the
            severity of it all, but if we can get people on board with
            simplifying their lives, reducing their footprint, offsetting the
            remaining footprint for barely any money, and reducing the insane
            amounts of waste we all cause, our kids might have a chance.
          </p>
        </Col>
      </Row>
    </Container>
  </Layout>
);

export default AboutPage;
