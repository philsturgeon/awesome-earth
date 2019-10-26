import React from "react";
import { Link, graphql } from "gatsby"
import BackgroundImage from 'gatsby-background-image'
import slugify from "slugify"

// Components
import Carousel from "../components/carousel";
import SEO from "../components/seo";

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
      <SEO title="Welcome" />
      <div className="padding">
        <h1>Awesom.Earth</h1>

        <p>
          The world is simultaneously underwater and on fire, and people want to
          know what they can do about it. This site is full of resources, services,
          products and ideas you can use to be awesome to the earth.
        </p>
      </div>

      <Carousel />

      <ul className="categories">
        {categories.map(category => {
          return (
            <BackgroundImage
              Tag="li"
              className="category"
              key={slugify(category.title)}
              fluid={category.image.childImageSharp.fluid}
              backgroundColor={`#040e18`}
            >
              <Link to={category.slug}><h2>{category.title}</h2></Link>
            </BackgroundImage>
          );
        })}
      </ul>
    </>
  );
};

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: {order: ASC, fields: frontmatter___title}) {
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
