import React from "react"
import ReactMarkdown from 'react-markdown/with-html'
import slugify from "slugify"

import Countries from "../countries"

import "normalize.css"
import "../styles/global.scss"

export default function Template({ pageContext: { category, html, links } }) {
  return (
    <>
      <div class="padding">
        <h1><a href="/">Awesome.Earth</a></h1>
        <h2>{category.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <ul class="link-wrapper">
        {links.map(link => (
          <li class="link" key={`${slugify(link.title)}`}>
            <strong><a href={link.url} rel="nofollow noopener noreferrer">{link.title}</a></strong>
            {(link.countries || []).map(code => {
              const country = Countries.fromAlpha2Code(code.toUpperCase())
              return <span key={`${slugify(country.name)}`} title={country.name}>{country.emoji}</span>
            })}
            <ReactMarkdown source={link.description} escapeHtml={false} />
          </li>
        ))}
      </ul>
    </>
  )
};
