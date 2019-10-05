import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout/index'
import SEO from '../components/seo'

import { Timeline } from 'antd'

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulInfoAboutTextNode {
        about
      }
      allContentfulExperience {
        nodes {
          contentful_id
          position
          companyName
          companyUrl
          description {
            description
          }
          fromDate(formatString: "MMM YYYY")
          toDate(formatString: "MMM YYYY")
        }
      }
    }
  `)

  return (
    <Layout location="home">
      <SEO title="Home" />
      <div className="home">
        <p
          className="about"
          dangerouslySetInnerHTML={{
            __html: data.contentfulInfoAboutTextNode.about,
          }}
        ></p>
        <Timeline className="timeline">
          {data.allContentfulExperience.nodes.map(experience => {
            return (
              <Timeline.Item key={experience.companyUrl}>
                <div className="item" key={experience.contentful_id}>
                  <p className="heading">
                    {experience.position}
                    {experience.companyName && experience.companyUrl
                      ? ' @ '
                      : null}
                    {experience.companyName && experience.companyUrl ? (
                      <a
                        href={experience.companyUrl}
                        className="mention"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {experience.companyName}
                      </a>
                    ) : null}
                  </p>
                  <p className="period">
                    {experience.fromDate}
                    {experience.toDate
                      ? ` - ${experience.toDate}`
                      : ' - Present'}
                  </p>
                  <p className="content">{experience.description.description}</p>
                </div>
              </Timeline.Item>
            )
          })}
        </Timeline>
      </div>
    </Layout>
  )
}

export default IndexPage
