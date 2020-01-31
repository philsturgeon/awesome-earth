import React, { Fragment } from 'react';
import { Badge } from 'react-bootstrap';

const shorten = (str, maxLen, separator = ' ') => {
    if (str.length <= maxLen) return str;
    return str.substr(0, str.lastIndexOf(separator, maxLen)) + '...';
}

export default ({ link }) => {

    console.log(link)

    return (
        <a href={link.url} target="_blank" class="py-3 pl-8 pr-2 border-bottom d-block text-decoration-none">
            <p className="h4">
                {link.title}
                {link.tags.map(tag => {
                    return (
                        <Badge variant="secondary" className="ml-4"
                            style={{ marginLeft: '2em' }}
                        >
                            {tag}
                        </Badge>
                    )
                })}
            </p>
            <div> {shorten(link.description, 90)} </div>
        </a >
    )
}