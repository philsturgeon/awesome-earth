import React from 'react';
import { graphql, Link } from 'gatsby';
import slugify from 'slugify';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';

import { Layout, CategoryCard } from '../components';

export default ({ data }) => {
  const categories = data.allMarkdownRemark.edges.map(edge => ({
    ...edge.node.frontmatter,
    slug: edge.node.fields.slug,
  }));

  return (
    <>
      <Layout title={data.site.siteMetadata.title} seoTitle="Welcome">
        <Jumbotron
          style={{
            minHeight: '45vh',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundImage:
              'url(https://images.unsplash.com/photo-1532408840957-031d8034aeef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1780&q=80)',
          }}
        >
          <Container>
            <Row>
              <Col xs={8} className="bg-dark text-white">
                <h1 className="mb-2">
                  Is today the day you start making a difference?
                </h1>
              </Col>
            </Row>
          </Container>
        </Jumbotron>

        <Container>
          {/* <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Row>
                    <Col md={8} lg={10}>
                      <input
                        type="text"
                        className="form-control form-control-minimal"
                        placeholder="Find resources, ideas and services here"
                        aria-label="Search"
                      />
                    </Col>
                    <Col md={4} lg={2}>
                      <Button block>Search</Button>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <div className="tags">
                    <Link to="">#trashtag</Link>
                    <Link to="">#carbonoffset</Link>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          </Row> */}
          <Row>
            <Col>
              <div className="card-grid">
                {categories.map(category => (
                  <CategoryCard
                    category={category}
                    key={slugify(category.title)}
                  />
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
};

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    allMarkdownRemark(sort: { order: ASC, fields: frontmatter___title }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            image {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
