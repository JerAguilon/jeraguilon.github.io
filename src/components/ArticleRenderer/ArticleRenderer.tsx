import * as React from 'react';
import Helmet from 'react-helmet';
import _forOwn from 'lodash/forOwn';

import { match } from 'react-router'
import { Markdown } from 'react-showdown';

import ArticleComponents from "./ArticleComponents"

import './ArticleRenderer.css';

const webpackRequireContext = require.context(
  '!raw-loader!../../articles/markdown',
  false,
  /\.md$/,
)

// Convert to Map
const files = webpackRequireContext.keys().reduce((map, fileName) => {
  const markdown = webpackRequireContext(fileName)
  // remove the leading './'
  if (fileName.startsWith('./')){
    fileName = fileName.substr(2)
  }

  return map.set(fileName, markdown);
}, new Map())


export interface ArticleMatcher {
    articleName: string;
}

export interface ArticleRendererProps {
    match: match<ArticleMatcher>;
    renderCallback: () => void;
}


export class ArticleRenderer extends React.Component<ArticleRendererProps,{}> {
    public constructor(props) {
        super(props);
        this.props.renderCallback()
    }

    public render()  {
        const articleName = this.props.match.params.articleName;
        const markdown = files.get(articleName + '.md');
        const components = {
            Helmet
        }

        _forOwn(ArticleComponents[articleName], (value, key) => {
            components[key] = value;
        });

        return (
            <div className="article-markdown">
                <Markdown markup={ markdown } components={ components } />
            </div>
        );
    }
}
