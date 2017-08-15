import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import './css/style.css'

const Header = () => {
    return (
        <header id="hero">
            <h1>Netflix Movie Picker</h1>
        </header>
    );
};

const TemplateWrapper = ({children}) => {

    return (
        <main>
            <Helmet
                title="Netflix Movie Picker"
                meta={[
                    {name: 'description', content: 'Netflix Movie Picker'},
                    {name: 'keywords', content: 'travismclarke, netflix, gatsbyjs, movie, picker, movie-picker, roulette, netflix roulette'},
                ]}
            />
            <Header/>
            <section id="main" className="container">
                {children()}
            </section>
        </main>
    )
};

TemplateWrapper.propTypes = {
    children: PropTypes.func,
};

export default TemplateWrapper
