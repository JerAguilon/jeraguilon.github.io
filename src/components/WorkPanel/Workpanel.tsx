import * as React from 'react';

import { SEO } from 'components/SEO';

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
                        <div className="job-entry">
                            <div className="workpanel-marker workpanel-marker-google">
                            </div>
                            <div className="timeline-entry">
                                <div className="timeline-entry-title">
                                    <h4><b>Google</b> Associate Product Management Intern, <small>Summer 2018</small></h4>
                                </div>
                                <p>
                                    Currently an intern on Google Assistant, bringing Assistant functionality natively
                                    to vehicles. Writeup on this summer's experience coming soon!
                                </p>
                            </div>
                        </div>
                        <div className="job-entry">
                            <h3>2018</h3>
                            <div className="workpanel-marker workpanel-marker-lyft">
                            </div>
                            <div className="timeline-entry">
                                <div className="timeline-entry-title">
                                    <h4><b>Lyft</b> Software Engineering Intern, <small>Winter 2018</small></h4>
                                </div>
                                <p>
                                    At Lyft I contributed to <a href="https://lyft.com/expressdrive" target="_blank">
                                    Express Drive</a> and Fleet Management. On the express drive end, I improved
                                    product experience through tooling for vehicle geoloction,
                                    maintenance/collision servicing, and rental reposession. Within Fleet Management,
                                    I aided the deployment and querying of Elasticsearch indices on Lyft's autonomous
                                    and rental vehicles. Holistically, I matured my understanding of datastore
                                    management, frontend design patterns, API building, and architecting brand new
                                    microservices.
                                </p>
                            </div>
                        </div>
                        <div className="job-entry">
                            <div className="workpanel-marker workpanel-marker-amazon">
                            </div>
                            <div className="timeline-entry">
                                <div className="timeline-entry-title">
                                    <h4><b>Amazon</b> Software Engineering Intern, <small>Summer 2017</small></h4>
                                </div>
                                <p>
                                    Amazon Personalization houses an incredibly sophisticated product recommendation
                                    system, driven by years of A/B tests. One of the biggest challenges at Amazon
                                    scale is balancing recommendation quality with speed. I worked on incorporating
                                    more complex (and more relevant) recommendations in the parts of Amazon requiring
                                    low latency. My major deliverable was a NoSQL dataset of more than 100 million rows
                                    containing the preprocessed recommendation scores from a computationally expensive
                                    recommendation algorithm.
                                </p>
                            </div>
                        </div>
                        <div className="job-entry">
                            <h3>2017</h3>
                            <div className="workpanel-marker workpanel-marker-google">
                            </div>
                            <div className="timeline-entry">
                                <div className="timeline-entry-title">
                                    <h4><b>Google</b> Software Engineering Intern, <small>Winter 2017</small></h4>
                                </div>
                                <p>
                                    As a member of cloud monitoring team, I improved usability of the analytics pipelines
                                    through a new pipeline monitoring service. By storing
                                    pipeline statuses in a Spanner database, I made complex tasks such as diagnosing the
                                    root cause of a cascading pipeline automatic. My entrance into this program was quite
                                    unique, as I got my interview after completing the Google Foobar challenge.
                                    Check out my portfolio for what that is!
                                </p>
                            </div>
                        </div>
                        <div className="job-entry">
                            <div className="workpanel-marker workpanel-marker-internblitz">
                            </div>
                            <div className="timeline-entry">
                                <div className="timeline-entry-title">
                                    <h4><b>InternBlitz</b> Technical Co-founder, <small>Fall 2016-Fall 2017</small></h4>
                                </div>
                                <p>
                                    <a href="https://internblitz.com">InternBlitz</a> is the common application for
                                    internships. I worked on the core functionality of the platform
                                    by architecting internship web scrapers, improving the application pipeline,
                                    launching a user dashboard, and maturing a messaging system prototype--all
                                    so that people could conduct an end-to-end internship search under one platform.
                                    InternBlitz was accepted into
                                    Georgia Tech's <a href="http://startupsummer.gatech.edu/">2017 Startup Launch</a>.
                                    I balanced my work with my internship at Amazon.
                                </p>
                            </div>
                        </div>
                        <div className="job-entry">
                            <div className="workpanel-marker workpanel-marker-vertafore">
                            </div>
                            <h3>2016</h3>
                            <div className="timeline-entry">
                                <div className="timeline-entry-title">
                                    <h4><b>Vertafore</b> Software Engineering Intern, <small>Summer 2016</small></h4>
                                </div>
                                <p>
                                    In the summer fo 2016, I worked with Vertafore on ImageRight,
                                    an insurance software that facilitates agent productivity.
                                    I helped integrate an array of cloud storage management
                                    solutions that are being implemented across all of the company's
                                    products. I also contributed to the initiative of providing high
                                    quality unit and end-to-end tests across the entire platform.
                                </p>
                            </div>
                        </div>
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
