import React, { Fragment } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import RecentLinkItem from './RecentLinkItem'

export default ({ links, showAmount }) => {

    const recentLinks = links.slice((-1 * showAmount)).reverse()

    return (
        <div>
            <div>
                <p className="h2"> Recent Links</p>
            </div>
            {
                recentLinks.map((link, index) => {
                    return <RecentLinkItem key={index} link={link} />
                }
                )
            }
        </div>

    )
}
