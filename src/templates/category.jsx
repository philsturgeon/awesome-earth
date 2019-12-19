import React, { Fragment } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import slugify from 'slugify';
import { graphql, Link } from 'gatsby';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';

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
  pageContext: { category, html, excerpt, links, slug },
}) {
  const seoImage =
    data.site.siteMetadata.siteUrl + category.image.twitterCard.fixed.src;

  const linkHasCountry = (link, country) =>
    !!link.countries && link.countries.includes(country.code.toLowerCase());

  // if we have > 6 links, we'll display the newest 3 as featured links
  // until we have a better way to pick features for each category
  const FEATURED_LINK_COUNT_THRESHHOLD = 6;
  const FEATURED_LINKS_TO_DISPLAY = 3;

  let featuredLinks;
  let categoryLinks;

  if (links.length > FEATURED_LINK_COUNT_THRESHHOLD) {
    featuredLinks = links.slice(0, FEATURED_LINKS_TO_DISPLAY);
  }

  // all remaining links are displayed below the feature section
  categoryLinks = links.slice(featuredLinks.length);

  return (
    <Layout
      title={`${category.title} resources`}
      seoTitle={`${category.title} links, companies, products, and helpful resources.  Start doing better for the earth today at awesom.earth`}
      image={seoImage}
      description={excerpt}
    >
      <CountryContext.Consumer>
        {({ country, clearCountry }) => {
          const anyLinksHaveCountry =
            country.name !== null &&
            links.some(link => linkHasCountry(link, country));
          return (
            <>
              <Container className="header-padding">
                <Row>
                  <Col>
                    <h1>{category.title}</h1>
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
                        <button
                          onClick={e => {
                            e.preventDefault();
                            clearCountry();
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </Col>
                </Row>
              </Container>

              {featuredLinks.length > 0 && (
                <Container fluid style={{ padding: 0 }}>
                  <Jumbotron>
                    <Container>
                      <Row>
                        <Col>
                          <h2>Awesome Projects</h2>
                        </Col>
                      </Row>
                      <Row>
                        {featuredLinks.map(link => (
                          <Col
                            xs={12}
                            lg={4}
                            key={`featured-item-${slugify(link.title)}`}
                          >
                            <Card>
                              <Card.Body>
                                <Card.Title>{link.title}</Card.Title>
                                <Card.Text>{link.description}</Card.Text>
                                <Card.Link
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Learn More
                                </Card.Link>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Container>
                  </Jumbotron>
                </Container>
              )}

              <Container>
                <Row>
                  <Col>
                    <ul className="link-wrapper">
                      {categoryLinks.map(link => (
                        <Fragment key={`${slugify(link.title)}`}>
                          {country.name === null ||
                          (country.name !== null &&
                            linkHasCountry(link, country)) ? (
                            <li className="link">
                              <strong>
                                <a
                                  href={link.url}
                                  className="title"
                                  target="_blank"
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
                  </Col>
                </Row>
              </Container>
            </>
          );
        }}
      </CountryContext.Consumer>
    </Layout>
  );
}
