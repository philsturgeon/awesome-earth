const axios = require('axios');
const fs = require('fs');
const path = require(`path`);
const url = require('url');
const { snakeCase } = require('lodash');
const { createFilePath } = require(`gatsby-source-filesystem`);
const titleCase = require('title-case').titleCase;

const includes = require('lodash').includes;
const union = require('lodash').union;

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

  const allLinksQuery = await graphql(`
    query {
      allDataYaml {
        edges {
          node {
            links {
              categories
              charity_url
              countries
              description
              featured
              tags
              title
              type
              url
              image
            }
          }
        }
      }
    }
  `);

  const allLinks = allLinksQuery.data.allDataYaml.edges[0].node.links;

  await asyncForEach(result.data.allMarkdownRemark.edges, async ({ node }) => {
    const {
      frontmatter,
      fields: { slug },
      html,
    } = node;

    const sanitizedSlug = slug.replace(/^\/|\/$/g, '');
    const linksForThisCategory = allLinks.filter(link =>
      includes(link.categories, sanitizedSlug)
    );

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
              image
            }
          }
        }
      }
    `);

    const featuredCardsImages = './src/images/featured/cards';
    const featuredCardsImagesDir = fs.readdirSync(featuredCardsImages);
    const links = await Promise.all(
      linkResult.data.allLinksYaml.edges.map(async ({ node }) => {
        const { image, title } = node;

        // no image? no thing to do
        if (!image) return node;

        const link = url.parse(image);
        // not a valid url? jump out
        if (!link || !link.hostname || 'https:' !== link.protocol) return node;

        const filename = snakeCase(title);
        const hasFile = featuredCardsImagesDir.includes(
          file => path.parse(file).name === filename
        );
        // there's the file already. get out
        if (hasFile === true) return node;

        const response = await axios({
          url: image,
          method: 'GET',
          responseType: 'stream',
        });

        return new Promise((resolve, reject) => {
          const { headers, data } = response;
          const extension = headers['content-type'].split('/').pop();
          const name = `${filename}.${extension}`;
          const file = fs.createWriteStream(
            `./src/images/featured/cards/${name}`
          );

          data.pipe(file);

          file.on('finish', () =>
            resolve({
              ...node,
              image: name,
            })
          );
          file.on('error', () => reject(node));
        });
      })
    );

    createPage({
      path: slug,
      component: path.resolve(`./src/templates/category.jsx`),
      context: {
        category: frontmatter,
        html,
        links: linksForThisCategory,
        slug,
        images: links.map(({ image }) => image),
      },
    });
  });

  let allTags = [];

  allLinks.forEach(link => {
    allTags = union(allTags, link.tags);
  });

  await asyncForEach(allTags, async tag => {
    const sanitizedTag = tag.replace(/^\/|\/$/g, '');
    const linksForTag = allLinks.filter(link =>
      includes(link.tags, sanitizedTag)
    );

    // The tag name with the dashes replaced with spaces and the first letter in each word capitalised.
    const humanReadableTag = titleCase(tag);

    createPage({
      path: `/tags/${tag}`,
      component: path.resolve(`./src/templates/tag.jsx`),
      context: { tag: humanReadableTag, links: linksForTag },
    });
  });
};
