import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

// import './index.css'
import './css/style.css'

const Header = () => {
    return (
        <div
            style={{
                background: 'rebeccapurple',
                marginBottom: '1.45rem',
            }}
        >
            <div
                style={{
                    margin: '0 auto',
                    maxWidth: 960,
                    padding: '1.45rem 1.0875rem',
                }}
            >
                <h1 style={{margin: 0}}>
                    <Link
                        to="/"
                        style={{
                            color: 'white',
                            textDecoration: 'none',
                        }}
                    > Movie Picker
                    </Link>
                </h1>
            </div>
        </div>
    );
};

const TemplateWrapper = ({children}) => {

    return (
        <div>
            <Helmet
                title="Movie Picker"
                meta={[
                    {name: 'description', content: 'Sample'},
                    {name: 'keywords', content: 'sample, something'},
                ]}
            />
            <Header/>
            <div
                style={{
                    margin: '0 auto',
                    maxWidth: 960,
                    padding: '0px 1.0875rem 1.45rem',
                    paddingTop: 0,
                }}
            >
                {children()}
            </div>
        </div>
    )
};

TemplateWrapper.propTypes = {
    children: PropTypes.func,
};

export default TemplateWrapper
