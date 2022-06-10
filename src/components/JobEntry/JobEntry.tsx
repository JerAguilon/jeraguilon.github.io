import * as React from 'react';

import './JobEntry.css';

export interface JobEntryProperties {
  company: string;
  role: string;
  time: string;
  children: Element | JSX.Element;
}

export class JobEntry extends React.Component<JobEntryProperties, {}> {
  public constructor(props) {
    super(props);
  }

  public render() {
    return (
      <>
        <div className="job-entry">
          <div className={"workpanel-marker workpanel-marker-" + this.props.company.toLowerCase().split(' ').join('')}>
          </div>
          <div className="timeline-entry">
            <div className="timeline-entry-title">
              <h4><b>{this.props.company}</b> {this.props.role}, <small>{this.props.time}</small></h4>
            </div>
            {this.props.children}
          </div>
        </div>
      </>
    );
  }
}
