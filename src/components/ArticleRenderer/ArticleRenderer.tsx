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

const { articles } = require('../../articles/articles.json');
const articlesMetadata = articles.reduce( (obj, item) => {
    const splitPath =  item.path.split('/')
    const key = splitPath[splitPath.length - 1]
    obj[key] = { 
        title: item.title,
        description: item.description,
        date: item.date,
        keywords: item.keywords,
    };
    return obj
}, {});

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
        const articleMetadata = articlesMetadata[articleName];
        const markdown = files.get(articleName + '.md');
        const components = {
        }

        _forOwn(ArticleComponents[articleName], (value, key) => {
            if (value.toString().match(/.(jpg|jpeg|gif|png)$/i)) {
                components[key] = () => (<img src={value} />); 
            } else {
                components[key] = value;
            }
        });

        return (
            <div className="article-markdown">
                <Helmet>
                    <title>Jeremy Aguilon | {articleMetadata.title}</title>
                    <meta name="description" content={articleMetadata.description} />
                    <meta name="keywords" content={articleMetadata.keywords} />
                </Helmet>

                <h1>{ articleMetadata.title }</h1>
                <h4><i>{ articleMetadata.description}</i></h4>
                <h5>{ articleMetadata.date}</h5>
                <hr />
                <Markdown markup={ markdown } components={ components } />
            </div>
        );
    }
}
