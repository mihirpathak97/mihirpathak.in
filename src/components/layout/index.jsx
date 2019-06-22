import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

import {
  Icon
} from 'antd';

import "./style.scss";

const Layout = ({ children }) => {

  const data = useStaticQuery(graphql`
    query {
      profileImage: file(relativePath: { eq: "profile.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      },
      infoJson {
        name
        title
        url
        social {
          icon
          type
          url
          username
        }
      }
    }
  `)

  return (
    <div className="App">
      <div className="sidebar">
        <Img className="profile-img" fluid={data.profileImage.childImageSharp.fluid} />
        <div className="heading">
          <h1 className="name">{data.infoJson.name}</h1>
          <h2 className="title">{data.infoJson.title}</h2>
        </div>
        <div className="contact">
          {
            data.infoJson.social.map(social => {
              return (
                <div className="contact-wrapper" key={social.type}>
                  <Icon type={social.icon}/>
                  <a target="_blank" rel="noopener noreferrer" href={social.url}>{social.username}</a>
                </div>
              )
            })
          }
        </div>
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
