import React from 'react';
import Img from 'gatsby-image';
import { useStaticQuery, graphql } from 'gatsby';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Featured from '../data/featured.yaml';

export default () => {
  const { allFile } = useStaticQuery(
    graphql`
      query {
        allFile(
          sort: { fields: name, order: ASC }
          filter: {
            sourceInstanceName: { eq: "images" }
            absolutePath: { regex: "//featured//" }
            extension: { regex: "/(jpg)|(jpeg)|(png)/" }
          }
        ) {
          edges {
            node {
              id
              name
              childImageSharp {
                fluid(maxHeight: 500) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `
  );
  const images = allFile.edges;
  return (
    <Carousel
      dynamicHeight={false}
      showThumbs={false}
      showArrows={false}
      showStatus={false}
      showIndicators={true}
      autoPlay={true}
      infiniteLoop={true}
      interval={5000}
    >
      {images.map(({ node }, index) => (
        <a
          href={Featured[index].href}
          title={Featured[index].title}
          key={node.id}
        >
          <Img fluid={node.childImageSharp.fluid} alt={node.name} />
          <div className="cta-info-wrapper">
            <h3>{Featured[index].description}</h3>
          </div>
        </a>
      ))}
    </Carousel>
  );
};
