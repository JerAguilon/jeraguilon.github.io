import * as React from 'react';

import { SEO } from 'components/SEO';
import { JobEntry } from 'components/JobEntry';

import './Workpanel.css'

export interface WorkPanelProperties {
  renderCallback: () => void;
}

export class WorkPanel extends React.Component<WorkPanelProperties, {}> {
  public constructor(props) {
    super(props);
    this.props.renderCallback();
  }
  public render() {
    return (
      <>
        <SEO url="professional" />
        <div className="workpanels">
          <div className="entries">
            <JobEntry company="Facebook" role="Software Engineer" time="2019-2022">
              <p>
                I spent my tenure at Facebook working on Monetization Integrity. In short,
                we decided whether an entity on IG/FB is monetizable or not using a mix of
                machine learning, heuristics, and human reviewers. My projects included:
                <ul>
                  <li>
                    Staging a high-profile upgrade of our core monetization policies
                    to align with industry standards
                  </li>
                  <li>
                    Pioneering machine learning models that forecast
                    how risky a page is for violating our monetization policies
                  </li>
                  <li>
                    Working closely with peer engineers, data scientists, product,
                    and policy to understand and close gaps in our topline metrics
                  </li>
                  <li>
                    Planning, collaborating, and executing on large infrastructure 
                    overhauls of our ML-based decision serving workflows.
                  </li>
                </ul>
              </p>
            </JobEntry>
            <JobEntry company="Google" role="Associate Product Manager Intern" time="Summer 2018">
              <p>
                As an APM intern, I worked on the Assistant on automotive surfaces team.
                My project primarily focused on defining a new feature that will improve the
                daily experience of drivers. I explored use cases with other PMs, worked
                through design decisions with UX, and collaborated with engineering
                stakeholders.
                            </p>
            </JobEntry>
            <JobEntry company="Lyft" role="Software Engineering Intern" time="Winter 2018">
              <p>
                At Lyft I contributed to <a href="https://lyft.com/expressdrive" target="_blank">
                  Express Drive</a> and Fleet Management. On the express drive end, I improved
                product experience through tooling for vehicle geolocation,
                maintenance/collision servicing, and rental reposession. Within Fleet Management,
                I aided the deployment and querying of Elasticsearch indices on Lyft's autonomous
                and rental vehicles. Holistically, I matured my understanding of datastore
                management, frontend design patterns, API building, and architecting brand new
                microservices.
                            </p>
            </JobEntry>
            <JobEntry company="Amazon" role="Software Engineering Intern" time="Summer 2017">
              <p>
                Amazon Personalization houses an incredibly sophisticated product recommendation
                system, driven by years of A/B tests. One of the biggest challenges at Amazon
                scale is balancing recommendation quality with speed. I worked on incorporating
                more complex (and more relevant) recommendations in the parts of Amazon requiring
                low latency. My major deliverable was a NoSQL dataset of more than 100 million rows
                containing the preprocessed recommendation scores from a computationally expensive
                recommendation algorithm.
                            </p>
            </JobEntry>
            <JobEntry company="Google" role="Software Engineering Intern" time="Winter 2017">
              <p>
                As a member of cloud monitoring, I improved usability of the analytics pipelines
                through a new pipeline monitoring service. By storing
                pipeline statuses in a Spanner database, I made complex tasks such as diagnosing the
                root cause of a cascading pipeline automatic. My entrance into this program was quite
                unique, as I got my interview after completing the Google Foobar challenge.
                Check out my portfolio for what that is!
                            </p>
            </JobEntry>
            <JobEntry company="InternBlitz" role="Technical Co-founder" time="Fall 2016-Fall 2017">
              <p>
                <a href="https://careerblitz.io">InternBlitz</a> is the common application for
                internships. I worked on the core functionality of the platform
                by architecting internship web scrapers, improving the application pipeline,
                launching a user dashboard, and maturing a messaging system prototype--all
                so that people could conduct an end-to-end internship search under one platform.
                InternBlitz was accepted into
                                Georgia Tech's <a href="http://startupsummer.gatech.edu/">2017 Startup Launch</a>.
                I balanced my work with my internship at Amazon.
                            </p>
            </JobEntry>
            <JobEntry company="Vertafore" role="Software Engineering Intern" time="Summer 2016">
              <p>
                In the summer fo 2016, I worked with Vertafore on ImageRight,
                an insurance software that facilitates agent productivity.
                I helped integrate an array of cloud storage management
                solutions that are being implemented across all of the company's
                products. I also contributed to the initiative of providing high
                quality unit and end-to-end tests across the entire platform.
                            </p>
            </JobEntry>
            <div className="job-entry">
              <h3>2015</h3>
              <div className="workpanel-marker workpanel-marker-tech">
              </div>
              <div className="timeline-entry">
                <div className="timeline-entry-title">
                  <h4><b>Georgia Tech</b> Started college! <small>Fall 2015</small></h4>
                </div>
              </div>
            </div>
            <div className="job-entry">
              <div className="workpanel-marker">
              </div>
            </div>
          </div>
          <div className="workpanels-content">
          </div>
        </div>
      </>
    );
  }
}
