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
          companyName
          companyUrl
          contentful_id
          description
          fromDate(formatString: "MMM YYYY")
          title
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
                <div className="item" key={experience.title}>
                  <p className="heading">
                    {experience.title}
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
                  <p className="content">{experience.description}</p>
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
