const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const titleCase = require('title-case').titleCase;

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
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              intro
              image {
                twitterCard: childImageSharp {
                  fixed(quality: 100) {
                    src
                  }
                }
                banner: childImageSharp {
                  fixed(quality: 100, width: 1600) {
                    src
                  }
                }
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
    const {
      frontmatter,
      fields: { slug },
      html,
    } = node;

    const linkResult = await graphql(`
      query {
        allLinksYaml(
          filter: {categories: {in: ["${slug.replace(/^\/|\/$/g, '')}"]}}
          sort: {fields: title, order: ASC}
        ) {
          edges {
            node {
              title
              url
              description
              countries
              featured
            }
          }
        }
      }
    `);

    const links = linkResult.data.allLinksYaml.edges.map(edge => edge.node);

    createPage({
      path: slug,
      component: path.resolve(`./src/templates/category.jsx`),
      context: { category: frontmatter, html, links, slug },
    });
  });

  const allTags = await graphql(`
    {
      allLinksYaml {
        tags: distinct(field: tags)
      }
    }
  `);

  await asyncForEach(allTags.data.allLinksYaml.tags, async tag => {
    const linksForTag = await graphql(`
      query {
        allLinksYaml(
          filter: {tags: {in: ["${tag.replace(/^\/|\/$/g, '')}"]}}
          sort: {fields: title, order: ASC}
        ) {
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

    const links = linksForTag.data.allLinksYaml.edges.map(edge => edge.node);

    // The tag name with the dashes replaced with spaces and the first letter in each word capitalised.
    const humanReadableTag = titleCase(tag);

    createPage({
      path: `/tags/${tag}`,
      component: path.resolve(`./src/templates/tag.jsx`),
      context: { tag: humanReadableTag, links },
    });
  });
};
