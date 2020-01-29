import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import slugify from 'slugify';

import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';

import { Layout } from '../components';
import Countries from '../countries';

const unsplashImageUrl = (tag, width = 1600, height = 400) => {
  const cleanTag = tag.replace(' ', ',');
  return `https://source.unsplash.com/featured/${width}x${height}?${cleanTag}`;
};

export default function Template({ data, pageContext: { tag, links } }) {
  return (
    <>
      <Layout
        title={`Links tagged with ${tag}`}
        image={unsplashImageUrl(tag, 1200, 627)}
      >
        <Jumbotron
          style={{
            marginTop: '1rem',
            minHeight: '45vh',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundImage: `url(${unsplashImageUrl(tag)})`,
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
                  Awesome links tagged with{' '}
                  <Badge variant="primary">{tag}</Badge>
                </h1>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <Container>
          <Row>
            <Col>
              <ul className="link-wrapper">
                {links
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .map(link => (
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
                  ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
}
