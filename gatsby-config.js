module.exports = {
  siteMetadata: {
    title: `Protect.Earth`,
    siteUrl: `https://protect.earth`,
    description: `Links, resources, and articles to help you lead a more sustainable life. Learn about how to reduce your carbon footprint, and how to find and support sustainable projects and companies around the world. Take action today - the earth needs you to do your part.`,
  },
  plugins: [
    'gatsby-plugin-netlify-cms',
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Muli', 'Open Sans', 'Roboto Mono'],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        // TODOL Supply ID for GTM here
        // id: 'GTM-PZRPQ5H',
        // set this to true to make GTM work in dev environment (for testing/debug)
        includeInDevelopment: false,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `categories`,
        path: `${__dirname}/src/categories`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/images`,
        name: 'images',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
};
