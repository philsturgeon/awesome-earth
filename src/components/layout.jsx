import React from "react";

// components
import Fork from "./fork";
import SEO from "./seo";

import CountryContext from "../context/country-context";
import { Link } from "gatsby";

export default ({ title, seoTitle, image, description, children }) => {
  return (
    <>
      <SEO
        title={seoTitle}
        description={description}
        keywords={[]}
        meta={[]}
        image={image}
      />
      <div className="content">
        <header>
          <Fork />
          <h1>
            <Link to="/">{title}</Link>
          </h1>
        </header>
        {children}
      </div>
      <footer className="padding">
        <CountryContext.Consumer>
          {({ country }) => (
            <>
              <Link to="/select-your-country">Select Country</Link>
              <div>{country.name}</div>
            </>
          )}
        </CountryContext.Consumer>
      </footer>
    </>
  );
};
