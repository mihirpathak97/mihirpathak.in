import React, { Component } from 'react';

import profile from '../assets/profile.jpg';

import infoJson from '../assets/info.json';

import {
  Icon
} from 'antd';

class SideBar extends Component {

  state = {
    name: '',
    title: '',
    social: []
  }

  componentDidMount () {
    this.setState({
      name: infoJson.name || '',
      title: infoJson.title || '',
      social: infoJson.social || []
    })
  }

  render() {
    return (
      <div className="sidebar">
        <img src={profile} alt="Profile" />
        <div className="heading">
          <h1 className="name">{this.state.name}</h1>
          <h2 className="title">{this.state.title}</h2>
        </div>
        <div className="contact">
          {
            this.state.social.map(social => {
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
    );
  }
}

export default SideBar;