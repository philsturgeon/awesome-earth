import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import favicon from '../images/globe.png';

const SEO = ({ title, description, keywords, meta, image }) => {
  const { site: { siteMetadata } } = useStaticQuery(
      graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
  `);

  const metaDescription = description || siteMetadata.description;

  const metaTags = [
    {
      name: 'description',
      content: metaDescription
    },
    {
      property: 'og:title',
      content: title
    },
    {
      property: 'og:description',
      content: metaDescription
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:image',
      content: image
    },
    {
      name: 'twitter:card',
      content: 'summary'
    },
    {
      name: 'twitter:title',
      content: title
    },
    {
      name: 'twitter:description',
      content: metaDescription
    },
    {
      name: 'twitter:image',
      content: image
    },
    {
      name: 'keywords',
      content: keywords.length > 0 ? keywords.join(',') : ''
    },
  ].concat(meta);

  return (
      <Helmet
          htmlAttributes={{lang: 'en'}}
          title={title}
          titleTemplate={`%s | ${siteMetadata.title}`}
          meta={metaTags}
          link={[
            { rel: 'shortcut icon', type: 'image/png', href: `${favicon}` }
          ]}
      />
  )
};

SEO.defaultProps = {
  keywords: [],
  meta: [],
  image: '',
};

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  meta: PropTypes.array,
  image: PropTypes.string,
};

export default SEO
