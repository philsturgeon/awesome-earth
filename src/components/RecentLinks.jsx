import React, { Fragment } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { graphql } from 'gatsby';

export default ({ links, showAmmount }) => {

    const recentLinks = links.slice((-1 * showAmmount))

    const shorten = (str, maxLen, separator = ' ') => {
        if (str.length <= maxLen) return str;
        return str.substr(0, str.lastIndexOf(separator, maxLen)) + '...';
    }

    return (
        <div>
            <div>
                <p className="h2"> Recent Links</p>
            </div>
            {
                recentLinks.map(link => (
                    <Fragment>
                        <a href={link.url} target="_blank" class="py-3 pl-8 pr-2 border-bottom d-block text-decoration-none">
                            <p className="h4"> {link.title} </p>
                            <div> {shorten(link.description, 90)} </div>
                        </a>
                    </Fragment>
                ))
            }
        </div>

    )
}
