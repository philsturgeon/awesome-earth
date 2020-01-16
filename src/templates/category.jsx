import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown/with-html';
import slugify from 'slugify';
import { graphql, Link } from 'gatsby';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';

import { Layout, SocialLinks } from '../components';
import Countries from '../countries';
import CountryContext from '../context/country-context';

export const query = graphql`
  query fetchFeatured($images: [String]!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    allImageSharp(filter: { fluid: { originalName: { in: $images } } }) {
      edges {
        node {
          fluid {
            originalName
            src
          }
        }
      }
    }
  }
`;

const FeaturedCard = ({ title, url, description, image }) => (
  <Card>
    {image && <Card.Img src={image} alt={title} />}
    <Card.Body>
      <Card.Title>
        <Card.Link href={url}>{title}</Card.Link>
      </Card.Title>
      <ReactMarkdown
        source={description}
        escapeHtml={false}
        className={Card.Text.className}
      />
      <Card.Link href={url} target="_blank" rel="noopener noreferrer">
        Learn More
      </Card.Link>
      <SocialLinks
        className="mt-2"
        text={`I found ${title} on Protect.Earth!`}
        url={url}
        all
      />
    </Card.Body>
  </Card>
);

FeaturedCard.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
};

FeaturedCard.defaultProps = {
  image: null,
};

export default function Template({
  data,
  pageContext: { category, html, links, slug },
}) {
  const seoImage =
    data.site.siteMetadata.siteUrl + category.image.twitterCard.fixed.src;

  const linkHasCountry = (link, country) =>
    !!link.countries && link.countries.includes(country.code.toLowerCase());

  const featuredLinks = links.filter(l => l.featured === true);
  const categoryLinks = links.filter(l => l.featured !== true);

  const fetchImage = image => {
    if (!image) return;

    const result = data.allImageSharp.edges.find(({ node }) => {
      if (!node || !node.fluid) return false;

      return node.fluid.originalName === image;
    });

    if (!result) return;

    return result.node.fluid.src;
  };

  return (
    <Layout
      title={`${category.title} resources`}
      seoTitle={`${category.title} links, companies, products, and helpful resources.  Start doing better for the earth today at protect.earth`}
      image={seoImage}
      description={category.intro}
    >
      <Jumbotron
        style={{
          marginTop: '1rem',
          minHeight: '45vh',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundImage: `url(${category.image.banner.fixed.src})`,
        }}
      >
        <Container>
          <Row>
            <Col>
              <h1
                style={{
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  display: 'inline-block',
                  padding: '0.5rem 0.75rem',
                }}
              >
                {category.title}
              </h1>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
      <CountryContext.Consumer>
        {({ country, clearCountry }) => {
          const anyLinksHaveCountry =
            country.name !== null &&
            links.some(link => linkHasCountry(link, country));
          return (
            <>
              <Container>
                <Row>
                  <Col>
                    <div dangerouslySetInnerHTML={{ __html: html }}></div>
                    <div className="d-flex align-items-center mb-3">
                      <span className="mr-2">Share this page:</span>
                      <SocialLinks
                        text={`Check out ${category.title} links on Protect.Earth:`}
                        url={data.site.siteMetadata.siteUrl + slug}
                        all
                      />
                    </div>
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

              {featuredLinks && featuredLinks.length > 0 && (
                <Container fluid style={{ padding: 0 }}>
                  <Jumbotron>
                    <Container>
                      <Row>
                        <CardDeck>
                          {featuredLinks.map(
                            ({ title, url, description, image }) => (
                              <Col xs={12} lg={4} key={slugify(title)}>
                                <FeaturedCard
                                  title={title}
                                  url={url}
                                  description={description}
                                  image={fetchImage(image)}
                                />
                              </Col>
                            )
                          )}
                        </CardDeck>
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
                              <div className="mb-1 d-flex align-items-center justify-content-between">
                                <div>
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
                                        className="ml-1"
                                      >
                                        {country.emoji}
                                      </span>
                                    );
                                  })}
                                </div>
                                <SocialLinks
                                  text={`I found ${link.title} on Protect.Earth!`}
                                  url={link.url}
                                  all
                                  size={20}
                                />
                              </div>
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
