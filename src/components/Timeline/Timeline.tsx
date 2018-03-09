import * as React from 'react';
import './Timeline.css';


export const Timeline: React.StatelessComponent<{}> = ({children}) => (
    <div className="timeline">
        <div className="entries">
            {children}
        </div>
    </div>
);

