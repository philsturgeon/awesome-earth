import React, { useState } from 'react';
import { graphql, navigate } from 'gatsby';
import flag from 'country-code-emoji';
import { union } from 'lodash';

import { Layout } from '../components';
import { useCountry } from '../context/country-context';

export default ({ data }) => {
  const { country, setCountry, clearCountry } = useCountry();
  const countries = require('i18n-iso-countries').getNames('en');
  const [searchTerm, setSearchTerm] = useState('');

  let countriesWithContent = [];
  data.allDataYaml.nodes[0].links.forEach(link => {
    countriesWithContent = union(countriesWithContent, link.countries);
  });

  return (
    <Layout title="Select Your Country">
      <div className="select-your-country padding">
        <div className="header">
          <h1>Select Your Country</h1>
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
                countryCode.toLowerCase()
              );
              const countryFlag = flag(countryCode);
              const countryName = countries[countryCode];

              if (!countryHasContent) {
                return (
                  <div className="country-list-item disabled" key={countryCode}>
                    {countryFlag} {countryName}
                    <div className="no-content-message">
                      <small>
                        We don't have any content for {countryName}, yet. Why
                        not{' '}
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
    allDataYaml {
      nodes {
        links {
          countries
        }
      }
    }
  }
`;
