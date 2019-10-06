import React from "react"
import ReactMarkdown from 'react-markdown/with-html'
import slugify from "slugify"

import Countries from "../countries"

import "normalize.css"
import "../styles/global.scss"

export default ({ pageContext: { category, links } }) => (
  <>
    <h1>{category.name}</h1>
    <ReactMarkdown source={category.introduction} escapeHtml={false} />
    <ul>
      {links.map(link => (
        <li key={`${slugify(link.title)}`}>
          <strong><a href={link.url} rel="nofollow noopener noreferrer">{link.title}</a></strong>
          {(link.countries || []).map(code => {
            const country = Countries.fromAlpha2Code(code.toUpperCase())
            return <span title={country.name}>{country.emoji}</span>
          })}
          <ReactMarkdown source={link.description} escapeHtml={false} />
        </li>
      ))}
    </ul>
  </>
);