import * as React from 'react';

import './Panel.css';

export interface PanelProps {
    title: string | React.ReactNode;
    subtitle?: string;
    onClick?: () => void;
}


export const Panel: React.StatelessComponent<PanelProps> = ({ title, subtitle='', onClick=() => {}, children }) => {
    return (
        <div className="panel" onClick={onClick}>
            <h2>{title} <small>{subtitle}</small></h2>
            <hr/>
            {children}
        </div>
    );

};
