import React from "react"
import { Remarkable } from 'remarkable';

import CategoryData from "../data/categories.yaml"
import LinkData from "../data/links.yaml"

const md = new Remarkable();

const categories = CategoryData.map(c => ({
    ...c,
    links: LinkData.filter(l => {
        return l.categories.includes(c.slug);
    }),
}));

export default () => (
    <>
        <h1>Awesome Earth</h1>

        <p>A collection of resources, services, products, and ideas that you can use to improve your impact on the environment.</p>

        {categories.map(category => {
            return (
                <>
                    <h2>{category.name}</h2>
                    <div dangerouslySetInnerHTML={{__html:md.render(category.introduction)}} />
                    <ul>
                        {category.links.map((data, index) => {
                            return (
                                <li key={`content_item_${index}`}>
                                    <a href={data.url}>{data.title}</a>
                                </li>
                            )
                        })}
                    </ul>
                </>
            );
        })}
    </>
)