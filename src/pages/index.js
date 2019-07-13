import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout/index";
import SEO from "../components/seo";

import {
  Icon,
  Tabs,
  Collapse,
  List,
  Timeline
} from 'antd';

import 'antd/lib/tabs/style/index.css';
import 'antd/lib/collapse/style/index.css';
import 'antd/lib/list/style/index.css';
import 'antd/lib/timeline/style/index.css';

const { TabPane } = Tabs;
const Panel = Collapse.Panel;

const IndexPage = () => {

  const data = useStaticQuery(graphql`
    query {
      contentJson {
        about
        projects {
          content
          github_url
          site_url
          title
        }
        experience {
          company
          company_link
          content
          from
          title
          to
        }
        skills {
          Web_Devlopment
          CSS_Frameworks___Libraries
          Cloud___Deployment
          Database
          JavaScript_Frameworks___Libraries
          PHP_Framweworks
          Programming_Languages
          VCS
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Home" />
      <div className="home">
        <Tabs>
          <TabPane tab="Portfolio" key="/">
            <div className="plural-holder">
              <p className="about" dangerouslySetInnerHTML={{ __html: data.contentJson.about }}></p>
              <Timeline>
                {
                  data.contentJson.experience.map(experience => {
                    return (
                      <Timeline.Item key={experience.company_link}>
                        <div className="singular-holder" key={experience.title}>
                          <p className="code-heading">
                            { experience.title }
                            { experience.company && experience.company_link ? 
                              ' @ '
                              : null 
                            }
                            { experience.company && experience.company_link ? 
                              <a 
                              href={experience.company_link} 
                              className="mention"
                              target="_blank"
                              rel="noreferrer noopener">
                                {experience.company}
                              </a>
                              : null 
                            }
                          </p>
                          <p className="period">
                            { experience.from }
                            {
                              experience.to ? ` - ${experience.to}` : ' - Present'
                            }
                          </p>
                          <p className="content">
                            { experience.content }
                          </p>
                        </div>
                      </Timeline.Item>
                    )
                  })
                }
              </Timeline>
            </div>
          </TabPane>
          <TabPane tab="Side Projects" key="projects">
            <div className="plural-holder">
              {
                data.contentJson.projects.map(project => {
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
          <TabPane tab="Skills" key="skills">
            <div className="plural-holder">
              <Collapse bordered={false} accordion={true}>
                {
                  Object.keys(data.contentJson.skills).map((key, index) => {
                    return (
                      <Panel header={key.replace('___', ' & ').replace('_', ' ')} key={index}>
                        <List style={{marginLeft: '1.4rem'}}>
                          {
                            data.contentJson.skills[key].map((item, index) => {
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
        </Tabs>
      </div>
    </Layout>
  )

}

export default IndexPage
