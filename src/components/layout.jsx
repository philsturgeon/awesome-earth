import React from 'react';
import PropTypes from 'prop-types';

// components
import SEO from './seo';

import { Header, Footer } from '.';

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
      <div className="half">
        <span className="half-bg bg-white"></span>
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <div className="btn-frame bg-light">
                <a
                  data-scroll
                  href="#top"
                  className="btn btn-top btn-white btn-ico btn-lg btn-rounded"
                >
                  <i className="icon-arrow-up2 fs-22"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="half bg-white">
        <span className="half-bg bg-dark"></span>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="boxed no-border p-4 bg-secondary">
                <div className="row gutter-2 align-items-center">
                  <div className="col-12 col-md-6 text-white">
                    <h3>Get on our mailing list, save the world!</h3>
                  </div>
                  <div className="col-12 col-md-6">
                    <input
                      type="email"
                      className="form-control form-control-inverted form-control-rounded"
                      id="exampleInputEmail1"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
