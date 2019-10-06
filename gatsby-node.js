const path = require(`path`);

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

  result.data.allCategoriesYaml.edges.forEach(({ node }) => {
    createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/category.jsx`),
      context: {
        category: node,
      },
    })
  })
}