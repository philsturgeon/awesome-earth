import React from "react";
import ReactMarkdown from "react-markdown/with-html";
import slugify from "slugify";
import Layout from "../components/layout";
import Countries from "../countries";
import { graphql } from "gatsby";

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default function Template({ data, pageContext: { tag, links }}) {
  return (
    <>
      <Layout
        title={data.site.siteMetadata.title}
        seoTitle={tag}
      >
        <div className="padding">
          <h2>{tag}</h2>
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
