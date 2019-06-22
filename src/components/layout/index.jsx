import React from "react";
import PropTypes from "prop-types";

import {
  Icon
} from 'antd';

import "./style.scss";

const Layout = ({ children }) => {

  const state = {
    name: '',
    title: '',
    social: []
  }

  return (
    <div className="App">
      <div className="sidebar">
        {/* <img src={profile} alt="Profile" /> */}
        <div className="heading">
          <h1 className="name">{state.name}</h1>
          <h2 className="title">{state.title}</h2>
        </div>
        <div className="contact">
          {
            state.social.map(social => {
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
