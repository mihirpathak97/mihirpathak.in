import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'

import { Icon, Drawer } from 'antd'

const Layout = ({ location, children }) => {
  const [showDrawer, toggleDrawer] = useState(false)

  const LinkToRender = () => {
    if (location === 'home') {
      return (
        <div className="contact-wrapper">
          <Icon type="book" />
          <Link to="/blog">Read my blog</Link>
        </div>
      )
    }
    if (location.includes('blog/')) {
      return (
        <div className="contact-wrapper">
          <Icon type="arrow-left" />
          <Link to="/blog">Go Back</Link>
        </div>
      )
    }
    return (
      <div className="contact-wrapper">
        <Icon type="home" />
        <Link to="/">Go Home</Link>
      </div>
    )
  }

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
        <Img
          className="profile-img"
          fluid={data.contentfulInfo.profileImage.fluid}
        />
        <div className="heading">
          <h1 className="name">{data.contentfulInfo.name}</h1>
          <h2 className="title">{data.contentfulInfo.title}</h2>
        </div>
        <div className="contact">
          <LinkToRender />
        </div>
        <div className="contact">
          {data.contentfulInfo.social.map(social => {
            return (
              <div className="contact-wrapper" key={social.type}>
                <Icon type={social.icon} />
                <a target="_blank" rel="noopener noreferrer" href={social.url}>
                  {social.username}
                </a>
              </div>
            )
          })}
        </div>
        <div className="legal">
          <p className="using">
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
      </div>

      <div className="topbar">
        <Link to="/">
          <Img
            className="profile-img"
            fluid={data.contentfulInfo.profileImage.fluid}
          />
        </Link>
        <div className="heading">
          <h1 className="name">{data.contentfulInfo.name}</h1>
        </div>
        <Icon component={NavbarSvg} onClick={() => toggleDrawer(true)} />

        <Drawer
          placement="left"
          closable={false}
          onClose={() => toggleDrawer(false)}
          visible={showDrawer}
        >
          <Img
            className="profile-img"
            fluid={data.contentfulInfo.profileImage.fluid}
          />
          <div className="heading">
            <h1 className="name">{data.contentfulInfo.name}</h1>
            <h2 className="title">{data.contentfulInfo.title}</h2>
          </div>
          <div className="contact">
            {data.contentfulInfo.social.map(social => {
              return (
                <div className="contact-wrapper" key={social.type}>
                  <Icon type={social.icon} />
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={social.url}
                  >
                    {social.username}
                  </a>
                </div>
              )
            })}
          </div>
          <div className="contact">
            <LinkToRender />
          </div>
          <div className="legal">
            <p className="using">
              Built with{' '}
              <Icon style={{ color: 'red' }} theme="filled" type="heart" />{' '}
              using{' '}
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
        </Drawer>
      </div>
      <div className="container">{children}</div>
    </div>
  )
}

Layout.propTypes = {
  location: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Layout
