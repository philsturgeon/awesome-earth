import React from "react"
import ReactMarkdown from 'react-markdown/with-html'
import slugify from "slugify"

import Countries from "../countries"
import SEO from "../components/seo"

import "normalize.css"
import "../styles/global.scss"

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
  }
`;

export default function Template({ data, pageContext: { category, html, links } }) {
  const seoImage = data.site.siteMetadata.siteUrl + category.image.publicURL;
  return (
    <>
      <SEO title={category.title} description="" keywords={[]} meta={[]} image={seoImage} />
      <div className="padding">
        <h1><a href="/">{data.site.siteMetadata.title}</a></h1>
        <h2>{category.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>
      <ul className="link-wrapper">
        {links.map(link => (
          <li className="link" key={`${slugify(link.title)}`}>
            <strong><a href={link.url} className="title" rel="nofollow noopener noreferrer">{link.title}</a></strong>
            {(link.countries || []).map(code => {
              const country = Countries.fromAlpha2Code(code.toUpperCase())
              return <span key={`${slugify(country.name)}`} title={country.name}>{country.emoji}</span>
            })}
            <ReactMarkdown source={link.description} escapeHtml={false} />
          </li>
        ))}
      </ul>
    </>
  )
};
