import * as React from 'react';
import _chunk from 'lodash/chunk';
import { Col, Glyphicon, Row } from 'react-bootstrap';

import './CramScore.css';

const { level1, level2, level3 } = require('./CramScore.json');

interface ScoreCardProps {
  title: string;
  description: string;
  tags: string[];
  external_url: string;
}

const ScoreCard: React.StatelessComponent<ScoreCardProps> = ({ external_url, title, tags, description }) => {
  tags.sort();
  return (
    <div className={'scorecard'}>
      <div className={'scorecard-header'}>
        <a href={external_url} target="_blank"> {title} <Glyphicon glyph="link" /></a>
      </div>
      {description}
      <div className='tags'>
        {
          tags.map((item, key) => (
            <div key={key} className={'tag tag-' + item.toLowerCase().replace(" ", "-")}>
              {item}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export class CramScore extends React.Component<{}, {}> {
  public render() {
    return (
      <div>
        <h4>Tags</h4>
        <div className='tag-key'>
          <div className={'tag tag-dynamic-programming'}>
            Dynamic Programming
                    </div>
          <div className={'tag tag-greedy'}>
            Greedy
                    </div>
          <div className={'tag tag-recursion'}>
            Recursion
                    </div>
          <div className={'tag tag-search'}>
            Search
                    </div>
          <div className={'tag tag-sliding-window'}>
            Sliding Window
                    </div>
          <div className={'tag tag-sorting'}>
            Sorting
                    </div>
          <div className={'tag tag-trees'}>
            Trees
                    </div>
          <div className={'tag tag-union-find'}>
            Union Find
                    </div>
        </div>
        <h2>Cram Level 1</h2>
        <span><i>Study these even if your interview is tomorrow and it's 12 AM</i></span>
        <hr />
        {this.getLevelNodes(level1)}
        <h2>Cram Level 2</h2>
        <span><i>Study these if you have a week to prepare</i></span>
        <hr />
        {this.getLevelNodes(level2)}
        <h2>Cram Level 3</h2>
        <span><i>Study these if you want to be generally prepared with a "6th sense" of what to do</i></span>
        <hr />
        {this.getLevelNodes(level3)}
      </div>
    );
  }

  private getLevelNodes(questionList) {
    const levelNodes = questionList.map((item, key) => (
      <Col sm={6} key={key}>
        <ScoreCard
          title={item.title}
          tags={item.tags}
          description={item.description}
          external_url={item.external_url}
        />
      </Col>
    ))

    return _chunk(levelNodes, 2).map((pair, key) => (
      <Row key={key}>
        {pair}
      </Row>
    ));

  }
}
