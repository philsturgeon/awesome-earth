const path = require(`path`);

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allCategoriesYaml {
        edges {
          node {
            id
            name
            introduction
          }
        }
      }
    }
  `);

  await asyncForEach(result.data.allCategoriesYaml.edges, async ({ node }) => {
    const linkResult = await graphql(`
      query {
        allLinksYaml(filter: {categories: {elemMatch: {id: {eq: "${node.id}"}}}}) {
          edges {
            node {
              id
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
      path: node.id,
      component: path.resolve(`./src/templates/category.jsx`),
      context: { category: node, links },
    })
  });
}