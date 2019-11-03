import React from "react";
import ReactMarkdown from "react-markdown/with-html";
import slugify from "slugify";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import Countries from "../countries";

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

export default function Template({
  data,
  pageContext: { category, html, links },
}) {
  const seoImage =
    data.site.siteMetadata.siteUrl + category.image.twitterCard.fixed.src;
  return (
    <>
      <Layout
        title={data.site.siteMetadata.title}
        seoTitle={category.title}
        image={seoImage}
      >
        <div className="padding">
          <h2>{category.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: html }}></div>
        </div>
        <ul className="link-wrapper">
          {links.map(link => (
            <li className="link" key={`${slugify(link.title)}`}>
              <strong>
                <a
                  href={link.url}
                  className="title"
                  rel="nofollow noopener noreferrer"
                >
                  {link.title}
                </a>
              </strong>
              {(link.countries || []).map(code => {
                const country = Countries.fromAlpha2Code(code.toUpperCase());
                return (
                  <span key={`${slugify(country.name)}`} title={country.name}>
                    {country.emoji}
                  </span>
                );
              })}
              <ReactMarkdown source={link.description} escapeHtml={false} />
            </li>
          ))}
        </ul>
      </Layout>
    </>
  );
}
