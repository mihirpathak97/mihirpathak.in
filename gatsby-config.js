module.exports = {
  siteMetadata: {
    title: `Mihir Pathak`,
    description: `Hey there! I'am Mihir Pathak, a full-stack developer epxperienced with working in React, PHP and Node. This is my personal site and blog`,
    author: `@mihirpathak97`,
    siteUrl: `https://mihirpathak.in`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `5igcbf5607l6`,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
      },
    },
    `gatsby-transformer-json`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Mihir Pathak`,
        short_name: `Mihir Pathak`,
        background_color: `#f5f8fa`,
        theme_color: `#f5f8fa`,
        start_url: `/`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,

    // Remove service worker
    // `gatsby-plugin-remove-serviceworker`,
    // Auto-Generate XML SiteMap during build
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`/admin/`],
        serialize: ({ site, allSitePage }) =>
        allSitePage.edges.map(edge => {
          switch (edge.node.path) {
            case '/':
              return {
                url: site.siteMetadata.siteUrl + edge.node.path,
                changefreq: `weekly`,
                priority: 1,
              }
            case '/blog/':
              return {
                url: site.siteMetadata.siteUrl + edge.node.path,
                changefreq: `daily`,
                priority: 1,
              }
            default:
              return {
                url: site.siteMetadata.siteUrl + edge.node.path,
                changefreq: `monthly`,
                priority: 0.8,
              }
          }
        })
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
        head: true,
        pageTransitionDelay: 0
      }
    }
  ],
}
