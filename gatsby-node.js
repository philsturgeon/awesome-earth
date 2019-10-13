const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              image {
                publicURL
              }
            }
            fields {
              slug
            }
            html
          }
        }
      }
    }
  `);

  await asyncForEach(result.data.allMarkdownRemark.edges, async ({ node }) => {
    const { frontmatter, fields: { slug }, html } = node;

    const linkResult = await graphql(`
      query {
        allLinksYaml(filter: {categories: {in: ["${slug.replace(/^\/|\/$/g, '')}"]}}) {
          edges {
            node {
              title
              url
              description
              countries
            }
          }
        }
      }
    `);

    const links = linkResult.data.allLinksYaml.edges.map(edge => edge.node);

    createPage({
      path: slug,
      component: path.resolve(`./src/templates/category.jsx`),
      context: { category: frontmatter, html, links },
    })
  });
}
