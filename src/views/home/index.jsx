import React, { Component } from 'react';
import './style.scss';

import contentJson from '../../assets/content.json';

import {
  Icon,
  Tabs,
  Collapse,
  List
} from 'antd';

import { withRouter } from 'react-router';

import 'antd/lib/tabs/style/index.css';
import 'antd/lib/collapse/style/index.css';
import 'antd/lib/list/style/index.css';

const { TabPane } = Tabs;
const Panel = Collapse.Panel;

class Home extends Component {

  state = {
    about: '',
    projects: [],
    skills: {},
    experience: [],
    certifications: [],
    education: [],
    width: 0,
    height: 0,
    tabSize: 'default'
  }

  componentDidMount () {
    this.setState({
      about: contentJson.about || '',
      projects: contentJson.projects || [],
      skills: contentJson.skills || {},
      experience: contentJson.experience || [],
      certifications: contentJson.certifications || [],
      education: contentJson.education || []
    })

    // Window size listener
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
      tabSize: window.innerWidth <= 768 ? 'small' : 'default'
    })
  }

  handleTabChange = (tab) => {
    this.props.history.push(tab)
  }

  render() {
    return (
      <div className="home">
        <Tabs size={this.state.tabSize} activeKey={this.props.match.params[0] || '/'} onChange={this.handleTabChange}>
          <TabPane tab="About" key="/">
            <div className="plural-holder">
              <p className="about" dangerouslySetInnerHTML={{ __html: this.state.about }}></p>
            </div>
          </TabPane>
          <TabPane tab="Projects" key="projects">
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
          </TabPane>
          <TabPane tab="Experience" key="experience">
            <div className="plural-holder">
              {
                this.state.experience.map(experience => {
                  return (
                    <div className="singular-holder" key={experience.title}>
                      <p className="code-heading">
                        { experience.title }
                      </p>
                      <p className="period">
                        { experience.from }
                        {
                          experience.to ? ` - ${experience.to}` : null 
                        }
                      </p>
                      <p className="content">
                        { experience.content }
                      </p>
                    </div>
                  )
                })
              }
            </div>
          </TabPane>
          <TabPane tab="Skills" key="skills">
            <div className="plural-holder">
              <Collapse bordered={false} accordion={true}>
                {
                  Object.keys(this.state.skills).map((key, index) => {
                    return (
                      <Panel header={key} key={index}>
                        <List style={{marginLeft: '1.4rem'}}>
                          {
                            this.state.skills[key].map((item, index) => {
                              return <List.Item style={{padding: '10px 0px'}} key={index}>{item}</List.Item>
                            })
                          }
                        </List>
                      </Panel>
                    )
                  })
                }
              </Collapse>
            </div>
          </TabPane>
          <TabPane tab="Certifications" key="certifications">
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
          </TabPane>
          <TabPane tab="Education" key="education">
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
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default withRouter(Home);