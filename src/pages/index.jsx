import React from "react";
import { Link, graphql } from "gatsby"
import BackgroundImage from 'gatsby-background-image'

// Components
import Carousel from "../components/carousel";

// CSS
import "normalize.css";
import "../styles/global.scss";

export default ({ data }) => {
  const categories = data.allMarkdownRemark.edges.map(edge => edge.node.frontmatter);
  return (
    <>
      <div className="padding">
        <h1>Awesome Earth</h1>

        <p>
          A collection of resources, services, products, and ideas that you can
          use to improve your impact on the environment.
        </p>
      </div>

      <Carousel />

      <div className="padding">
        <ul>
          {categories.map(category => {
            return (
              <BackgroundImage
                Tag="li"
                className="category-image"
                key={category.id}
                fluid={category.image.childImageSharp.fluid}
                backgroundColor={`#040e18`}
              >
                <Link to={category.path}>{category.name}</Link>
              </BackgroundImage>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            id
            path
            name
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
