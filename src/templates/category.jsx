import React, { Fragment } from "react";
import ReactMarkdown from "react-markdown/with-html";
import slugify from "slugify";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";
import Countries from "../countries";
import CountryContext from "../context/country-context";
import SocialLinks from "../components/social-links";

// CSS
import "normalize.css";
import "../styles/global.scss";

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
  pageContext: { category, html, excerpt, links, slug },
}) {
  const seoImage =
    data.site.siteMetadata.siteUrl + category.image.twitterCard.fixed.src;

  const linkHasCountry = (link, country) => !!link.countries && link.countries.includes(country.code.toLowerCase());

  return (
    <Layout
      title={data.site.siteMetadata.title}
      seoTitle={category.title}
      image={seoImage}
      description={excerpt}
    >
      <CountryContext.Consumer>
        {({ country, clearCountry }) => {
          const anyLinksHaveCountry = country.name !== null && links.some(link => linkHasCountry(link, country));
          return (
            <>
              <div className="padding">
                <div className="flex items-center">
                  <h2 className="m-r-16">{category.title}</h2>
                  <SocialLinks text={`Learn more about ${category.title}`} url={data.site.siteMetadata.siteUrl + slug} size={20} all
                  />
                </div>
                <div dangerouslySetInnerHTML={{ __html: html }}></div>
                {country.name !== null &&
                  <div className="showing-links-for-country">
                    <h3>{anyLinksHaveCountry ? 'Showing' : 'No'} links for {Countries.fromAlpha2Code(country.code).emoji} {country.name}</h3>
                    <Link to="/select-your-country">Change</Link>
                    <span>&middot;</span>
                    <a href="#" onClick={e => { e.preventDefault(); clearCountry(); }}>Remove</a>
                  </div>
                }
              </div>
              <ul className="link-wrapper">
                {links.map(link => (
                  <Fragment key={`${slugify(link.title)}`}>
                    {country.name === null || (country.name !== null && linkHasCountry(link, country)) ?
                      <li className="link">
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
                        <SocialLinks text={`Check out ${link.title}`} url={link.url} size={20} all />
                      </li>
                      : null}
                  </Fragment>
                ))}
              </ul>
            </>
          );
        }}
      </CountryContext.Consumer>
    </Layout>
  );
}
