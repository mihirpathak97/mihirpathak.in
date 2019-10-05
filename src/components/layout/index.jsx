import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import { Icon, Drawer } from 'antd'

const NavbarSvg = () => (
  <svg
    viewBox="64 64 896 896"
    data-icon="menu"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path>
  </svg>
)

const sidebarContent = (data) => (
  <>
    <Img
      className="profile"
      fluid={data.contentfulInfo.profileImage.fluid}
    />
    <div className="title">
      <h1 className="name">{data.contentfulInfo.name}</h1>
      <h2 className="position">{data.contentfulInfo.title}</h2>
    </div>
    <div className="contact">
      {data.contentfulInfo.social.map(social => {
        return (
          <div className="link" key={social.type}>
            <Icon type={social.icon} />
            <a target="_blank" rel="noopener noreferrer" href={social.url}>
              {social.username}
            </a>
          </div>
        )
      })}
    </div>
    <div className="legal">
      <p className="credit">
        Built with{' '}
        <Icon style={{ color: 'red' }} theme="filled" type="heart" /> using{' '}
        <a
          className="mention"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          React.js
            </a>
      </p>
      <p className="copyright">Copyright (c) Mihir Pathak</p>
    </div>
  </>
)

const Layout = ({ children }) => {
  const [showDrawer, toggleDrawer] = useState(false)

  const data = useStaticQuery(graphql`
    query {
      contentfulInfo {
        profileImage {
          fluid(maxWidth: 300) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
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
        {sidebarContent(data)}
      </div>

      <div className="topbar">
        <Img
          className="profile"
          fluid={data.contentfulInfo.profileImage.fluid}
        />
        <span className="title">
          {data.contentfulInfo.name}
        </span>
        <Icon component={NavbarSvg} onClick={() => toggleDrawer(true)} />
      </div>

      <Drawer
        placement="left"
        closable={false}
        width="auto"
        onClose={() => toggleDrawer(false)}
        visible={showDrawer}
      >
        {sidebarContent(data)}
      </Drawer>

      <div className="container">{children}</div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
