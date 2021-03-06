import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { Panel } from 'components/Panel';
import { SEO } from 'components/SEO';

import './BlogPanel.css';


export interface BlogProps {
  renderCallback: () => void;
}

export interface BlogState {
}


const { articles } = require('../../articles/articles.json');

export class BlogPanel extends React.Component<BlogProps, BlogState> {

  public constructor(props) {
    super(props);
    this.props.renderCallback();

    this.state = {
      articleClicked: false,
      articleName: '',
    }
  }

  public render() {
    return (
      <>
        <SEO url="blog" />
        {
          articles.slice(0).reverse().map((article, key) => (
            <Panel
              key={key}
              title={<NavLink to={article.path}><p>{article.title}</p></NavLink>}
              subtitle={article.date}
            >
              <h4><i>{article.description}</i></h4>
            </Panel>
          ))
        }
        <h3>* My opinions are my own</h3>
      </>
    )
  }
};
