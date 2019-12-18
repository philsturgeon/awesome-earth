import React from 'react';
import { Link, graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import slugify from 'slugify';

import { Layout } from '../components';

export default ({ data }) => {
  const categories = data.allMarkdownRemark.edges.map(edge => ({
    ...edge.node.frontmatter,
    slug: edge.node.fields.slug,
  }));

  return (
    <>
      <Layout title={data.site.siteMetadata.title} seoTitle="Welcome">
        <section className="hero">
          <div
            className="image image-overlay"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1532408840957-031d8034aeef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1780&q=80)',
            }}
          ></div>
          <div className="container">
            <div className="row">
              <div className="col-8 bg-dark text-white">
                <h1 className="mb-2">
                  Is today the day you start making a difference?
                </h1>
              </div>
            </div>
          </div>
        </section>
        <section className="overlay">
          <div className="container overlay-item-top">
            <div className="row gutter-3">
              <div className="col-12">
                <div className="card">
                  <div className="card-body py-2">
                    <div className="row">
                      <div className="col-md-8 col-lg-10">
                        <input
                          type="text"
                          className="form-control form-control-minimal"
                          placeholder="Find resources, ideas and services here"
                          aria-label="Search"
                        />
                      </div>
                      <div className="col-md-4 col-lg-2">
                        <button
                          type="button"
                          className="btn btn-block btn-dark"
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer py-2 separator-top">
                    <div className="tags">
                      <a href="">#trashtag</a>
                      <a href="">#carbonoffset</a>
                    </div>
                  </div>
                </div>
              </div>

              {categories.map(category => (
                <div className="col-md-6 col-lg-4">
                  <BackgroundImage
                    className="card stacked text-left"
                    key={slugify(category.title)}
                    fluid={category.image.childImageSharp.fluid}
                    backgroundRepeat="none"
                  >
                    <div className="card-body">
                      <h3 className="card-title mt-3 mb-1 bg-dark text-white pl-1">
                        {category.title}
                      </h3>
                      <p className="card-text mb-2 text-bold bg-transparent bg-white opacity-8 p-1">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Vitae laudantium pariatur architecto aperiam
                        cumque eaque est.
                      </p>
                      <Link
                        to={category.slug}
                        className="btn btn-dark btn-small"
                      >
                        Learn More
                      </Link>
                    </div>
                  </BackgroundImage>
                </div>
              ))}
            </div>
          </div>
        </section>
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
