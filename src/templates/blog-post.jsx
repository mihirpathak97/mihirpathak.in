import React from "react";

import Layout from "../components/layout/index";
import SEO from "../components/seo";

import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import {
	Typography
} from 'antd';

const PostPage = props => {

	const post = props.pageContext.post

  return (
    <Layout location={props.location.pathname}>
      <SEO title={'Mihir Pathak - ' + post.title} />
			<div className="blog-post">
        <Typography.Title style={{fontFamily: 'Raleway'}} className="title">{post.title}</Typography.Title>
				<div 
					className="content"
					dangerouslySetInnerHTML={{
						__html: documentToHtmlString(post.content.json)
					}}
				></div>
				<div className="footer">
					<p className="info">
						I posted this on {post.createdAt}
					</p>
				</div>
      </div>
    </Layout>
  )

}

export default PostPage
