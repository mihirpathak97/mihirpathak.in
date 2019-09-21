const path = require(`path`)

/**
 * Create "dynamic" pages for blog posts
 */
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve(`src/templates/blog-post.jsx`)
    // Query for markdown nodes to use in creating pages.
    resolve(
      graphql(`
				query {
					allContentfulBlogPost {
						nodes {
							title
							slug
							contentful_id
							createdAt(formatString: "DD MMM YYYY")
							content {
								json
							}
						}
					}
				}
			`
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        // Create pages for each blog post.
        result.data.allContentfulBlogPost.nodes.forEach(post => {
          const path = '/blog/' + post.slug
          createPage({
            path,
            component: blogPostTemplate,
            context: {
              post
            },
          })
        })
      })
    )
  })
}