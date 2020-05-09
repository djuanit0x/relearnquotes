module.exports = {
  siteMetadata: {
    title: `relearnquotes`,
    description: `Quotes are powerful references that you can use to reflect back upon your journey in life. We have collected a dozen recommended and popular quotes for each category. All quotes have been verified from their original source. Let's learn together!`,
    author: `@djuanit0x`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-twitter`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `relearnquotes`,
        short_name: `starter`,
        start_url: `/`,
        icon: `src/images/Re.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
