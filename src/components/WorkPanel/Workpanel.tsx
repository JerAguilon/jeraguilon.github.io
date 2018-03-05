import * as React from 'react';
import { COMPANY } from '../../constants'

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
            <div className="workpanels">
                <div className="entries">
                    <div className="job-entry">
                        <div data-company={COMPANY.GOOGLE2} className="workpanel-marker workpanel-marker-google">
                        </div>
                        <div className="timeline-entry">
                            <div className="timeline-entry-title">
                                <h4><b>Google</b>Associate Product Management Intern, <small>Summer 2018</small></h4>
                            </div>
                            <p>
                                Writeup on this summer's experience coming soon!
                            </p>
                        </div>
                    </div>
                    <div className="job-entry">
                        <h3>2018</h3>
                        <div data-company={COMPANY.LYFT} className="workpanel-marker workpanel-marker-lyft">
                        </div>
                        <div className="timeline-entry">
                            <div className="timeline-entry-title">
                                <h4><b>Lyft</b>Software Engineering Intern, <small>Winter 2018</small></h4>
                            </div>
                            <p>
                                Currently a member on <a href="https://lyft.com/expressdrive" target="_blank">
                                Express Drive</a>. More on this soon!
                            </p>
                        </div>
                    </div>
                    <div className="job-entry">
                        <div data-company={COMPANY.AMAZON} className="workpanel-marker workpanel-marker-amazon">
                        </div>
                        <div className="timeline-entry">
                            <div className="timeline-entry-title">
                                <h4><b>Amazon</b>Software Engineering Intern, <small>Summer 2017</small></h4>
                            </div>
                            <p>
                                Personalization deals with recommending new products and
                                services to customers. Naturally, one of the biggest challenges
                                with cataloging Amazon's huge array of products is latency. In
                                order to incorporate more complex (and by extension more relevant)
                                algorithms, there is a tradeoff in computational cost. In order to
                                include this more sophisticated model in widgets with low latency
                                requirements, I created a NoSQL solution with preprocessed recommendation
                                scores for over 100 million listings.
                            </p>
                        </div>
                    </div>
                    <div className="job-entry">
                        <h3>2017</h3>
                        <div data-company={COMPANY.GOOGLE1} className="workpanel-marker workpanel-marker-google">
                        </div>
                        <div className="timeline-entry">
                            <div className="timeline-entry-title">
                                <h4><b>Google</b> SWE Intern, <small>Winter 2017</small></h4>
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
                        <div data-company={COMPANY.VERTAFORE} className="workpanel-marker workpanel-marker-vertafore">
                        </div>
                        <h3>2016</h3>
                        <div className="timeline-entry">
                            <div className="timeline-entry-title">
                                <h4><b>Vertafore</b>Software Engineering Intern, <small>Summer 2016</small></h4>
                            </div>
                            <p>
                                In summer 2016, I had the opportunity to intern at Vertafore for the
                                purpose of aiding them in developing insurance software to facilitate
                                productivity. I helped integrate an array of cloud storage management
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
        );
    }
}
