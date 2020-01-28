import React, { Fragment } from 'react';

const shorten = (str, maxLen, separator = ' ') => {
    if (str.length <= maxLen) return str;
    return str.substr(0, str.lastIndexOf(separator, maxLen)) + '...';
}

export default ({ link }) => {
    return (
        <a href={link.url} target="_blank" class="py-3 pl-8 pr-2 border-bottom d-block text-decoration-none">
            <p className="h4"> {link.title} </p>
            <div> {shorten(link.description, 90)} </div>
        </a>
    )
}