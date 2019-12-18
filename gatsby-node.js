const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const titleCase = require('title-case');

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
              image {
                twitterCard: childImageSharp {
                  fixed(quality: 100) {
                    src
                  }
                }
              }
            }
            fields {
              slug
            }
            html
            excerpt(pruneLength: 500)
          }
        }
      }
    }
  `);

  await asyncForEach(result.data.allMarkdownRemark.edges, async ({ node }) => {
    const {
      frontmatter,
      fields: { slug },
      excerpt,
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
            }
          }
        }
      }
    `);

    const links = linkResult.data.allLinksYaml.edges.map(edge => edge.node);

    createPage({
      path: slug,
      component: path.resolve(`./src/templates/category.jsx`),
      context: { category: frontmatter, excerpt, html, links, slug },
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
