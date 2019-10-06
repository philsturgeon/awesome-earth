import React from "react"
import { Link } from "gatsby"

import CategoryData from "../data/categories.yaml"

import "normalize.css"
import "../styles/global.scss"

export default () => (
  <>
    <h1>Awesome Earth</h1>
  
    <p>A collection of resources, services, products, and ideas that you can use to improve your impact on the environment.</p>
  
    <ul>
      {CategoryData.map(category => {
        return (
          <li><Link to={category.id}>{category.name}</Link></li>
        );
      })}
    </ul>
  </>
)