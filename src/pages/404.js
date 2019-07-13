import React from "react"

import Layout from "../components/layout/index";
import SEO from "../components/seo";

import {
  Icon
} from 'antd';

const NotFoundPage = () => (
  <Layout>
    <SEO title="Error" />
    <div className="error">
      <Icon type="warning" style={{color: 'yellow', fontSize: '64px'}}></Icon>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  </Layout>
)

export default NotFoundPage
