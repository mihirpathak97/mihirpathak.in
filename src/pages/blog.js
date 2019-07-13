import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

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
          createdAt(fromNow: true)
          content {
            json
          }
        }
      }
    }
  `)

  const posts = data.allContentfulBlogPost.nodes

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
                  <div className="content" dangerouslySetInnerHTML={
                    {
                      __html: documentToHtmlString(post.content.json)
                    }
                  }>
                    
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
