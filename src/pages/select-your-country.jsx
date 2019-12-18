import React, { useState } from 'react';
import { graphql, navigate } from 'gatsby';
import flag from 'country-code-emoji';
import { flattenDeep } from 'lodash';

import { Layout } from '../components';
import CountryContext from '../context/country-context';

export default ({ data }) => {
  const countries = require('i18n-iso-countries').getNames('en');
  const [searchTerm, setSearchTerm] = useState('');

  const countriesWithContent = flattenDeep([
    ...new Set(
      data.allLinksYaml.edges
        .map(({ node }) => node.countries)
        .filter(countryList => !!countryList)
    ),
  ]).map(countryCode => countryCode.toUpperCase());

  return (
    <Layout title={data.site.siteMetadata.title} seoTitle="Select Your Country">
      <CountryContext.Consumer>
        {({ country, setCountry, clearCountry }) => (
          <div className="select-your-country padding">
            <div className="header">
              <h2>Select Your Country</h2>
              <input
                type="text"
                placeholder="Filter Countries"
                onChange={e => setSearchTerm(e.target.value.toLowerCase())}
              />
            </div>
            <div>
              {country.name !== null ? (
                <div className="country-list-item selected" key={country.code}>
                  <small>Currently selected</small>
                  <div>
                    {flag(country.code)} {country.name}
                  </div>
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      clearCountry();
                      navigate('/');
                    }}
                  >
                    Remove
                  </a>
                </div>
              ) : null}
              {Object.keys(countries)
                .filter(countryCode =>
                  countries[countryCode].toLowerCase().includes(searchTerm)
                )
                .map(countryCode => {
                  const countryHasContent = countriesWithContent.includes(
                    countryCode
                  );
                  const countryFlag = flag(countryCode);
                  const countryName = countries[countryCode];

                  if (!countryHasContent) {
                    return (
                      <div
                        className="country-list-item disabled"
                        key={countryCode}
                      >
                        {countryFlag} {countryName}
                        <div className="no-content-message">
                          <small>
                            We don't have any content for {countryName}, yet.
                            Why not{' '}
                            <a
                              target="_blank"
                              href="https://github.com/philsturgeon/awesome-earth/blob/master/CONTRIBUTING.md"
                              rel="noopener noreferrer"
                            >
                              contribute something
                            </a>
                            ?
                          </small>
                        </div>
                      </div>
                    );
                  }

                  if (countryName !== country.name) {
                    return (
                      <div
                        className="country-list-item"
                        key={countryCode}
                        onClick={() => {
                          setCountry({ code: countryCode, name: countryName });
                          navigate('/');
                        }}
                      >
                        {countryFlag} {countryName} &rarr;
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        )}
      </CountryContext.Consumer>
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allLinksYaml {
      edges {
        node {
          countries
        }
      }
    }
  }
`;
