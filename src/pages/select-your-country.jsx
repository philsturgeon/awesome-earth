import React, { useState } from "react";
import { graphql } from "gatsby";
import flag from "country-code-emoji";
import Layout from "../components/layout";

export default ({ data }) => {
    const countries = require('i18n-iso-countries').getNames('en');
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <Layout title={data.site.siteMetadata.title} seoTitle="Select Your Country">
            <div className="select-your-country padding">
                <div className="header">
                    <h2>Select Your Country</h2>
                    <input type="text" placeholder="Filter Countries" onChange={e => setSearchTerm(e.target.value.toLowerCase())} />
                </div>
                <div>
                    {Object.keys(countries).filter(countryCode => countries[countryCode].toLowerCase().includes(searchTerm)).map(countryCode => (
                        <a className="country-list-item" href="#" key={countryCode}>
                            {flag(countryCode)} {countries[countryCode]}
                        </a>
                    ))}
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
  }
`;
