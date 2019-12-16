import React from "react";
import { Link, graphql } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import slugify from "slugify";

// Components
// TODO We lost the carousel in the redesign, should it come back or do we just do that on categories now?
import Carousel from "../components/carousel";
import Layout from "../components/layout";

// CSS
import "normalize.css";
import "../styles/global.scss";

export default ({ data }) => {
  const categories = data.allMarkdownRemark.edges.map(edge => ({
    ...edge.node.frontmatter,
    slug: edge.node.fields.slug,
  }));

  return (
    <>
      <Layout title={data.site.siteMetadata.title} seoTitle="Welcome" dark>
        <section class="hero">
          <div class="image image-overlay" style={{ backgroundImage:'url(https://images.unsplash.com/photo-1532408840957-031d8034aeef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1780&q=80)'}}></div>
          <div class="container">
            <div class="row">
              <div class="col-8 bg-dark text-white">
                <h1 class="mb-2">Is today the day you start making a difference?</h1>
              </div>
            </div>
          </div>
        </section>
        <section class="overlay">
          <div class="container overlay-item-top">
            <div class="row gutter-3">
              <div class="col-12">
                <div class="card">
                  <div class="card-body py-2">
                    <div class="row">
                      <div class="col-md-8 col-lg-10">
                        <input type="text" class="form-control form-control-minimal" placeholder="Find resources, ideas and services here" aria-label="Search"/>
                      </div>
                      <div class="col-md-4 col-lg-2">
                        <button type="button" class="btn btn-block btn-dark">Search</button>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer py-2 separator-top">
                    <div class="tags">
                      <a href="">#trashtag</a>
                      <a href="">#carbonoffset</a>
                    </div>
                  </div>
                </div>
              </div>

              {categories.map(category => (
                <div class="col-md-6 col-lg-4">
                  <BackgroundImage

                    className="card stacked text-left"
                    key={slugify(category.title)}
                    fluid={category.image.childImageSharp.fluid}
                    backgroundRepeat='none'
                  >
                    <div class="card-body">  
                      <h3 class="card-title mt-3 mb-1 bg-dark text-white pl-1">{category.title}</h3>
                      <p class="card-text mb-2 text-bold bg-transparent bg-white opacity-8 p-1" >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae laudantium pariatur architecto aperiam cumque eaque est.</p>
                      <Link to={category.slug} className="btn btn-dark btn-small">Learn More</Link>
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
