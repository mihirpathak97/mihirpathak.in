module.exports = {
  siteMetadata: {
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
    `gatsby-plugin-sitemap`,
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
