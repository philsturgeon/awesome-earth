import React from 'react';
import PropTypes from 'prop-types';

// components
import SEO from './seo';

import { Footer, Header, MailingListForm } from '.';

const Layout = ({
  title,
  meta,
  keywords,
  seoTitle,
  image,
  description,
  children,
  dark,
}) => {
  return (
    <>
      <SEO
        title={title || seoTitle}
        description={description}
        keywords={keywords}
        meta={meta}
        image={image}
      />
      <Header dark={dark} />
      {children}

      <div style={{ marginBottom: '-12rem', marginTop: '4rem' }}>
        <MailingListForm />
      </div>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  title: PropTypes.string,
  seoTitle: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
  dark: PropTypes.bool,
};

export default Layout;
