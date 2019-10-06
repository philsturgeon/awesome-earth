import React from "react"
import ReactMarkdown from 'react-markdown/with-html'
import { Link } from "gatsby"

import CategoryData from "../data/categories.yaml"
import LinkData from "../data/links.yaml"
import Countries from "../countries"

import "normalize.css"
import "../styles/global.scss"

const categories = CategoryData.map(c => ({
    ...c,
    links: LinkData.filter(l => l.categories.includes(c.slug)),
}));

export default () => (
    <>
        <h1>Awesome Earth</h1>

        <p>A collection of resources, services, products, and ideas that you can use to improve your impact on the environment.</p>

        {categories.map(category => {
            return (
                <>
                    <h2><Link to={category.slug}>{category.name}</Link></h2>
                    <ReactMarkdown source={category.introduction} escapeHtml={false} />
                    <ul>
                        {category.links.map((data, index) => {
                            return (
                                <li key={`content_item_${index}`}>
                                    <strong><a href={data.url} rel="nofollow noopener noreferrer">{data.title}</a></strong>
                                    {(data.countries || []).map(code => {
                                        const country = Countries.fromAlpha2Code(code.toUpperCase())
                                        return <span title={country.name}>{country.emoji}</span>
                                    })}
                                    <ReactMarkdown source={data.description} escapeHtml={false} />
                                </li>
                            )
                        })}
                    </ul>
                </>
            );
        })}
    </>
)