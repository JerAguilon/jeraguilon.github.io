import * as React from 'react';
import { Col, Row, Popover, Button } from 'react-bootstrap';
import Typist from 'react-typist';
import { COMPANY } from '../../constants'

import './Workpanel.css'

export interface WorkPanelProperties {
    handleClick: (company: string) => void;
}

export class WorkPanel extends React.Component<WorkPanelProperties, {}> {
    public render() {
        return (
            <div>
                <div className="workpanels">
                    <div className="circles">
                        <div className="job-entry">
                            <h3>2018</h3>
                            <Button data-company={COMPANY.GOOGLE2} className="workpanel-circle" onClick={this.handleClick}>
                            </Button>
                            <div style={{ height: 120 }}>
                                <Popover placement="right" title="Google Associate Product Management Intern Summer 2018">
                                    <p>
                                        As a member of cloud monitoring team, I improved usability of the analytics pipelines
                                        through a new pipeline monitoring service. By storing
                                        pipeline statuses in a Spanner database, I made complex tasks such as diagnosing the
                                        root cause of a cascading pipeline automatic. My entrance into this program was quite
                                        unique, as I got my interview after completing the Google Foobar challenge.
                                        Check out my portfolio for what that is!
                                    </p>
                                </Popover>
                            </div>;
                        </div>
                        <div className="job-entry">
                            <Button data-company={COMPANY.LYFT} className="workpanel-circle" onClick={this.handleClick}>
                            </Button>
                        </div>
                        <div className="job-entry">
                            <h3>2017</h3>
                            <Button data-company={COMPANY.AMAZON} className="workpanel-circle" onClick={this.handleClick}>
                            </Button>
                        </div>
                        <div className="job-entry">
                            <Button data-company={COMPANY.GOOGLE1} className="workpanel-circle" onClick={this.handleClick}>
                            </Button>
                        </div>
                        <div className="job-entry">
                            <h3>2016</h3>
                            <Button data-company={COMPANY.VERTAFORE} className="workpanel-circle" onClick={this.handleClick}>
                            </Button>
                        </div>
                    </div>
                    <div className="workpanels-content">
                    </div>
                </div>
            </div>
        );
    }

    private handleClick = (e) => {
        this.props.handleClick(COMPANY[e.target.getAttribute('data-company')]);
    }
}
