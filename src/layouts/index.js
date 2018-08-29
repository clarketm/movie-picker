import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import "../css/style.css";

const Header = () => {
  return (
    <header id="hero">
      <h1>Netflix Movie Picker</h1>
    </header>
  );
};

const Footer = () => {
  return (
    <footer id="footer">
      <p>
        © 2018{" "}
        <span itemProp="author" itemScope="" itemType="https://schema.org/Person">
          <span itemProp="name">Travis Clarke</span>
        </span>
        .
        <a href="https://www.apache.org/licenses/LICENSE-2.0.html" title="Apache-2.0">
          Some rights reserved
        </a>
        .
      </p>
    </footer>
  );
};

const TemplateWrapper = ({ children }) => {
  return (
    <main>
      <Helmet
        title="Netflix Movie Picker"
        meta={[
          { name: "description", content: "Netflix Movie Picker" },
          {
            name: "keywords",
            content: "travismclarke, netflix, gatsbyjs, movie, picker, movie-picker, roulette, netflix roulette"
          },
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no"
          }

        ]}
      />
      <Header />
      <section id="main" className="container">
        {children()}
      </section>
      <Footer />
    </main>
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
