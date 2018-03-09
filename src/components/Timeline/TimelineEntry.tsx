import * as React from 'react';

export interface TimelineEntryProps {
    descriptions?: string [];
    title?: React.ReactNode;
    breadcrumb?: string;
}

export const TimelineEntry: React.StatelessComponent<TimelineEntryProps> = (props) => (
    <div className="entry">
        <div className="workpanel-marker" />
        <h3>{!!props.breadcrumb && props.breadcrumb}</h3>
        <div className="timeline-description">
            <div>
                <h4>{!!props.title && props.title}</h4>
            </div>
            {props.descriptions && props.descriptions.map((item, key) => (
                <p key={key}>item</p>
            ))}
        </div>
    </div>
);
