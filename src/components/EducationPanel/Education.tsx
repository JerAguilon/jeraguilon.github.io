import * as React from 'react';

import { Panel } from 'components/Panel';
import { SEO } from 'components/SEO';

import './Education.css';

export interface EducationPanelProperties {
    renderCallback: () => void;
}

export class EducationPanel extends React.Component<EducationPanelProperties, {}> {
    public constructor(props) {
        super(props);
        this.props.renderCallback();
    }

    public render() {
        return (
            <>
                <SEO url="education" />
                <Panel
                    title="Georgia Institute of Technology"
                    subtitle="Computer Science"
                >
                    <div className="education-item">
                        <h3>Threads (Concentrations): </h3><h4>Intelligence & Media</h4>
                    </div>
                    <div className="education-item">
                        <h3>GPA: </h3><h4>3.94</h4>
                    </div>
                    <div className="education-item">
                        <h3>Relevant Coursework: </h3>
                        <ul>
                            <li>
                                <h4>Software & Design</h4>
                                <ul>
                                    <li>Objects & Design (CS 1331)</li>
                                    <li>Data Structures & Algorithms (CS 1332)</li>
                                    <li>Software Design (CS 2340)</li>
                                    <li>System Design & Proramming (CS 2110)</li>
                                    <li>Junior Design Capstone Pt 1 (CS 3311)</li>
                                </ul>
                            </li>
                            <li>
                                <h4>Mathematics & Theory</h4>
                                <ul>
                                    <li>Calculus III (MATH 2605)</li>
                                    <li>Discrete Mathematics (CS 2050)</li>
                                    <li>Applied Combinatorics (MATH 3012)</li>
                                    <li>Applied Statistics (ISYE 3770)</li>
                                    <li>Design & Analysis of Algorithms (CS 3510)</li>
                                </ul>
                            </li>
                            <li>
                                <h4>Threads</h4>
                                <ul>
                                    <li>Introduction to Graphics (CS 3451)</li>
                                    <li>Introduction to AI (CS 3600)</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </Panel>
            </>
        );
    }
}
