import React, { Component } from 'react';

import profile from '../assets/profile.jpg';

class SideBar extends Component {
  render() {
    return (
      <div className="sidebar">
        <img src={profile} alt="Profile" />
        <div className="heading">
          <h1 className="name">Mihir Pathak</h1>
          <h2 className="title">Full Stack Developer</h2>
        </div>
        <div className="contact">
          
        </div>
      </div>
    );
  }
}

export default SideBar;