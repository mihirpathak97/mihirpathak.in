import React, { Component } from 'react';
import './style.scss';

import contentJson from '../../assets/content.json';

import {
  Divider,
  Icon
} from 'antd';

class Home extends Component {

  state = {
    projects: [],
    experience: [],
    certifications: [],
    education: []
  }

  componentDidMount () {
    this.setState({
      projects: contentJson.projects || [],
      experience: contentJson.experience || [],
      certifications: contentJson.certifications || [],
      education: contentJson.education || []
    })
  }

  render() {
    return (
      <div className="home">
        <h2 className="code-heading">$ ls /projects</h2>
        <div className="plural-holder">
          {
            this.state.projects.map(project => {
              return (
                <div className="singular-holder" key={project.title}>
                  <p className="code-heading">
                    { project.title }
                    { project.site_url ? <a target="_blank" rel="noopener noreferrer" href={project.site_url}><Icon type="global" /></a> : null }
                    { project.github_url ? <a target="_blank" rel="noopener noreferrer" href={project.github_url}><Icon type="github" /></a> : null }
                  </p>
                  <p className="content">
                    { project.content }
                  </p>
                </div>
              )
            })
          }
        </div>
        <Divider dashed={true} />
        <h2 className="code-heading">$ ls /experience</h2>
        <div className="plural-holder">
          {
            this.state.experience.map(experience => {
              return (
                <div className="singular-holder" key={experience.title}>
                  <p className="code-heading">
                    { experience.title }
                  </p>
                  <p className="content">
                    { experience.content }
                  </p>
                </div>
              )
            })
          }
        </div>
        <Divider dashed={true} />
        <h2 className="code-heading">$ ls /certifications</h2>
        <div className="plural-holder">
          {
            this.state.certifications.map(certification => {
              return (
                <div className="singular-holder" key={certification.title}>
                  <p className="code-heading">
                    { certification.title }
                  </p>
                  <p className="content">
                    { certification.content }
                  </p>
                </div>
              )
            })
          }
        </div>
        <Divider dashed={true} />
        <h2 className="code-heading">$ ls /education</h2>
        <div className="plural-holder">
          {
            this.state.education.map(education => {
              return (
                <div className="singular-holder" key={education.title}>
                  <p className="code-heading">
                    { education.title }
                  </p>
                  <p className="content">
                    { education.content }
                  </p>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default Home;