import React, { Fragment } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import slugify from 'slugify';
import { graphql, Link } from 'gatsby';

import { Layout } from '../components';
import Countries from '../countries';
import CountryContext from '../context/country-context';

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
  pageContext: { category, html, excerpt, links },
}) {
  const seoImage =
    data.site.siteMetadata.siteUrl + category.image.twitterCard.fixed.src;

  const linkHasCountry = (link, country) =>
    !!link.countries && link.countries.includes(country.code.toLowerCase());

  return (
    <Layout
      title={data.site.siteMetadata.title}
      seoTitle={category.title}
      image={seoImage}
      description={excerpt}
    >
      <CountryContext.Consumer>
        {({ country, clearCountry }) => {
          const anyLinksHaveCountry =
            country.name !== null &&
            links.some(link => linkHasCountry(link, country));
          return (
            <div className="container header-padding">
              <div className="row">
                <div className="col-12">
                  <h2>{category.title}</h2>
                  <div dangerouslySetInnerHTML={{ __html: html }}></div>
                  {country.name !== null && (
                    <div className="showing-links-for-country">
                      <h3>
                        {anyLinksHaveCountry ? 'Showing' : 'No'} links for{' '}
                        {Countries.fromAlpha2Code(country.code).emoji}{' '}
                        {country.name}
                      </h3>
                      <Link to="/select-your-country">Change</Link>
                      <span>&middot;</span>
                      <a
                        href="#"
                        onClick={e => {
                          e.preventDefault();
                          clearCountry();
                        }}
                      >
                        Remove
                      </a>
                    </div>
                  )}
                </div>

                <div className="col-12">
                  <ul className="link-wrapper">
                    {links.map(link => (
                      <Fragment key={`${slugify(link.title)}`}>
                        {country.name === null ||
                        (country.name !== null &&
                          linkHasCountry(link, country)) ? (
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
                              const country = Countries.fromAlpha2Code(
                                code.toUpperCase()
                              );
                              return (
                                <span
                                  key={`${slugify(country.name)}`}
                                  title={country.name}
                                >
                                  {country.emoji}
                                </span>
                              );
                            })}
                            <ReactMarkdown
                              source={link.description}
                              escapeHtml={false}
                            />
                          </li>
                        ) : null}
                      </Fragment>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        }}
      </CountryContext.Consumer>
    </Layout>
  );
}
