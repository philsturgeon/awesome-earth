import React, { useState } from "react";
import { graphql, navigate } from "gatsby";
import flag from "country-code-emoji";
import Layout from "../components/layout";
import CountryContext from "../context/country-context";

export default ({ data }) => {
    const countries = require('i18n-iso-countries').getNames('en');
    const [searchTerm, setSearchTerm] = useState('');

    const countriesWithContent = [...new Set(data.allLinksYaml.edges
      .map(({ node }) => node.countries)
      .filter(countryList => !! countryList)
      .flat(Infinity))]
      .map(countryCode => countryCode.toUpperCase());

    return (
        <Layout title={data.site.siteMetadata.title} seoTitle="Select Your Country">
            <div className="select-your-country padding">
                <div className="header">
                    <h2>Select Your Country</h2>
                    <input type="text" placeholder="Filter Countries" onChange={e => setSearchTerm(e.target.value.toLowerCase())} />
                </div>
                <div>
                    <CountryContext.Consumer>
                        {({ setCountry }) => Object.keys(countries).filter(countryCode => countries[countryCode].toLowerCase().includes(searchTerm)).map(countryCode => {
                            const countryHasContent = countriesWithContent.includes(countryCode);
                            const countryFlag = flag(countryCode);
                            const countryName = countries[countryCode];

                            if (! countryHasContent) {
                                return (
                                    <div className="country-list-item disabled" key={countryCode}>
                                        {countryFlag} {countryName}
                                        <div className="no-content-message">
                                            <small>
                                                We don't have any content for {countryName}, yet. Why not {' '}
                                                <a target="_blank" href="https://github.com/philsturgeon/awesome-earth/blob/master/CONTRIBUTING.md" rel="noopener noreferrer">
                                                    contribute something
                                                </a>
                                                ?
                                            </small>
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <div className="country-list-item" key={countryCode} onClick={() => {
                                    setCountry({ code: countryCode, name: countryName });
                                    navigate("/");
                                }}>
                                    {countryFlag} {countryName} &rarr;
                                </div>
                            );
                        })}
                    </CountryContext.Consumer>
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
    allLinksYaml {
      edges {
        node {
          countries
        }
      }
    }
  }
`;
