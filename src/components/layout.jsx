import React from "react";

// components
import Fork from "./fork";
import SEO from "./seo";

export default ({ title, seoTitle, image, children }) => {
  return (
    <>
      <SEO
        title={seoTitle}
        description=""
        keywords={[]}
        meta={[]}
        image={image}
      />
      <header>
        <Fork />
        <h1>
          <a href="/">{title}</a>
        </h1>
      </header>
      {children}
    </>
  );
};
