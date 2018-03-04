import * as React from 'react';
import { Col, Button } from 'react-bootstrap';
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
                    <div className="years">
                        <h3 className="entry">2018</h3>
                        <h3 className="entry">2017</h3>
                        <h3 className="entry">2016</h3>
                    </div>
                    <div className="circles">
                        <Button data-company={COMPANY.GOOGLE2} className="workpanel-circle" onClick={this.handleClick}>
                        </Button>
                        <Button data-company={COMPANY.LYFT} className="workpanel-circle" onClick={this.handleClick}>
                        </Button>
                        <Button data-company={COMPANY.AMAZON} className="workpanel-circle" onClick={this.handleClick}>
                        </Button>
                        <Button data-company={COMPANY.GOOGLE1} className="workpanel-circle" onClick={this.handleClick}>
                        </Button>
                        <Button data-company={COMPANY.VERTAFORE}className="workpanel-circle" onClick={this.handleClick}>
                        </Button>
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
