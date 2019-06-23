import React, { Component } from 'react';

import profile from '../assets/profile.jpg';
import infoJson from '../assets/info.json';

import {
  Icon,
  Drawer
} from 'antd';

import 'antd/lib/drawer/style/index.css';

class SideBar extends Component {

  state = {
    name: '',
    title: '',
    social: [],
    showDrawer: false
  }

  componentDidMount () {
    this.setState({
      name: infoJson.name || '',
      title: infoJson.title || '',
      social: infoJson.social || []
    })
  }

  render() {

    const NavbarSvg = () => (
      <svg viewBox="64 64 896 896" data-icon="menu" width="1em" height="1em" fill="currentColor" aria-hidden="true"
        focusable="false">
        <path
          d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z">
        </path>
      </svg>
    );

    return (
      <div className="topbar">
        <img src={profile} alt="Profile" />
        <div className="heading">
          <h1 className="name">{this.state.name}</h1>
        </div>
        <Icon component={NavbarSvg} onClick={() => {this.setState({showDrawer: true})}} />

        <Drawer
          placement="left"
          closable={false}
          onClose={() => {this.setState({showDrawer: false})}}
          visible={this.state.showDrawer}
        >
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
          <div className="legal">
            <p className="using">Built with <Icon style={{color: 'red'}} theme="filled" type="heart"/> using <a className="mention" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">React.js</a></p>
            <p className="copyright">Copyright (c) Mihir Pathak</p>
          </div>
        </Drawer>

      </div>
    );
  }
}

export default SideBar;