import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";

import Layout from "../components/layout/index";
import SEO from "../components/seo";

import {
	Typography
} from 'antd';

const IndexPage = () => {

  const data = useStaticQuery(graphql`
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
  `)

  const posts = data.allContentfulBlogPost.nodes

  /**
   * Summarizes blog post and returns
   * first `maxCount` words
   * 
   * @param {Array} content 
   */
  const summarizePost = content => {
    let maxCount = 30;
    let allContent = '';

    content.forEach((item) => {
      item.content.forEach(innerNode => {
        allContent += innerNode.value + ' '
      })
    })
    
    return allContent.split(' ').slice(0, maxCount).join(' ')
  }


  return (
    <Layout location="blog">
      <SEO title="Blog" />
      <div className="blog">
        <Typography.Title style={{fontFamily: 'Raleway'}}>Blog</Typography.Title>
				<div className="posts">
					{
            posts.length === 0 ? (
              <Typography.Title level={4}>
                No blog posts found.. please check back later :)
              </Typography.Title>
            ) : null
          }
          {
            posts.map(post => {
              return (
                <div key={post.contentful_id} className="post">
                  <Typography.Title level={4} className="title">
                    {post.title}
                  </Typography.Title>
                  <p className="period">
                    {post.createdAt}
                  </p>
                  <div className="content">
                    <p>{summarizePost(post.content.json.content)}</p>
                    <Link className="read-more" to={'/blog/' + post.slug}>Read More</Link>
                  </div>
                </div>
              )
            })
          }
				</div>
      </div>
    </Layout>
  )

}

export default IndexPage
