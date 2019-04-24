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
            <h3>GPA: </h3><h4>3.95</h4>
          </div>
          <div className="education-item">
            <h3>Relevant Coursework: </h3>
            <ul>
              <li>
                <h4>Self Learning</h4>
                <ul>
                  <li><a href="https://www.coursera.org/learn/machine-learning/">Coursera Machine Learning</a></li>
                  <li><a href="http://course.fast.ai">Fast.ai Deep Learning for Coders</a></li>
                </ul>
              </li>
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
                  <li>Automata & Complexity (CS 4510)</li>
                </ul>
              </li>
              <li>
                <h4>Artificial Intelligence</h4>
                <ul>
                  <li>Introduction to AI (CS 3600)</li>
                  <li>Robotics & Perception (CS 3630)</li>
                  <li>Robot Intelligence & Path Planning (CS 4649)</li>
                  <li>Deep Learning (CS 4803)</li>
                </ul>
              </li>
              <li>
                <h4>Media</h4>
                <ul>
                  <li>Introduction to Graphics (CS 3451)</li>
                  <li>Computer Audio (CS 4590)</li>
                  <li>Introduction to Information Visualization (CS 4460)</li>
                </ul>
              </li>
            </ul>
          </div>
        </Panel>
      </>
    );
  }
}
