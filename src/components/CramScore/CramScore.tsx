import * as React from 'react';
import { Col } from 'react-bootstrap';

import './CramScore.css';

const ScoreCard: React.StatelessComponent<{}> = () => {
    return (
        <div className={'scorecard'}>
            <div className={'scorecard-header'}>
        Traveling Salesman Problem II Using a Convolutional Neural Net
            </div>
            QUESTION_CONTENT
            <div className={'tags'}>
                <div className={'tag tag-recursion'}>
                    Recursion
                </div>
                <div className={'tag tag-recursion'}>
                    Recursion
                </div>
                <div className={'tag tag-recursion'}>
                    Recursion
                </div>
            </div>
        </div>
    )
}

export class CramScore extends React.Component<{},{}> {
    public render () {
        return (
            <>
                <h2>Level 1</h2>
                <hr/>
                <Col md={6}>
                    <ScoreCard />
                </Col>
                <Col md={6}>
                    <ScoreCard />
                </Col>
                <Col md={6}>
                    <ScoreCard />
                </Col>
                <Col md={6}>
                    <ScoreCard />
                </Col>
                <Col md={6}>
                    <ScoreCard />
                </Col>
            </>
        );
    }
}
