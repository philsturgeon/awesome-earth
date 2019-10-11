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
      <div class="padding">
        <h1>Awesome Earth</h1>

        <p>
          A collection of resources, services, products, and ideas that you can
          use to improve your impact on the environment.
        </p>
      </div>

      <Carousel />

      <ul class="categories">
        {categories.map(category => {
          return (
            <BackgroundImage
              Tag="li"
              className="category"
              key={category.id}
              fluid={category.image.childImageSharp.fluid}
              backgroundColor={`#040e18`}
            >
              <Link to={category.path}><h2>{category.name}</h2></Link>
            </BackgroundImage>
          );
        })}
      </ul>
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
