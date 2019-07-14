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
      contentfulInfoAboutTextNode {
        about
      }
      allContentfulExperience {
        nodes {
          companyName
          companyUrl
          contentful_id
          description
          fromDate(formatString: "MMM YYYY")
          title
          toDate(formatString: "MMM YYYY")
        }
      }
      allContentfulProjects(sort: {fields: createdAt, order: ASC}) {
        nodes {
          url
          content
          contentful_id
          title
        }
      }
      contentfulSkills {
        skills {
          Web_Devlopment
          JavaScript_Frameworks___Libraries
          PHP_Framweworks
          CSS_Frameworks___Libraries
          Database
          Programming_Languages
          Cloud___Deployment
          VCS
        }
      }
    }
  `)

  return (
    <Layout location="home">
      <SEO title="Home" />
      <div className="home">
        <Tabs>
          <TabPane tab="Portfolio" key="/">
            <div className="plural-holder">
              <p className="about" dangerouslySetInnerHTML={{ __html: data.contentfulInfoAboutTextNode.about }}></p>
              <Timeline>
                {
                  data.allContentfulExperience.nodes.map(experience => {
                    return (
                      <Timeline.Item key={experience.companyUrl}>
                        <div className="singular-holder" key={experience.title}>
                          <p className="code-heading">
                            { experience.title }
                            { experience.companyName && experience.companyUrl ? 
                              ' @ '
                              : null 
                            }
                            { experience.companyName && experience.companyUrl ? 
                              <a 
                              href={experience.companyUrl} 
                              className="mention"
                              target="_blank"
                              rel="noreferrer noopener">
                                {experience.companyName}
                              </a>
                              : null 
                            }
                          </p>
                          <p className="period">
                            { experience.fromDate }
                            {
                              experience.toDate ? ` - ${experience.toDate}` : ' - Present'
                            }
                          </p>
                          <p className="content">
                            { experience.description }
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
                data.allContentfulProjects.nodes.map(project => {
                  return (
                    <div className="singular-holder" key={project.contentful_id}>
                      <p className="code-heading">
                        { project.title }
                        <a target="_blank" rel="noopener noreferrer" href={project.url}>
                          <Icon type={project.url.includes('github.com') ? 'github' : 'global'} />
                        </a>
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
                  Object.keys(data.contentfulSkills.skills).map((key, index) => {
                    return (
                      <Panel header={key.replace('___', ' & ').replace('_', ' ')} key={index}>
                        <List style={{marginLeft: '1.4rem'}}>
                          {
                            data.contentfulSkills.skills[key].map((item, index) => {
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
