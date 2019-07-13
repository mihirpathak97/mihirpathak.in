import React from "react";

import Layout from "../components/layout/index";
import SEO from "../components/seo";

const IndexPage = () => {

  return (
    <Layout location="blog">
      <SEO title="Blog" />
      <div className="blog">
        
      </div>
    </Layout>
  )

}

export default IndexPage
