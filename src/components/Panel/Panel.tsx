import * as React from 'react';

import './Panel.css';

export interface PanelProps {
    title: string;
    subtitle?: string;
}


export const Panel: React.StatelessComponent<PanelProps> = ({ title, subtitle='', children }) => {
    return (
        <div className="panel">
            <h2>{title} <small>{subtitle}</small></h2>
            <hr/>
            {children}
        </div>
    );

};
