import * as React from 'react';
import { CramScore } from 'components/CramScore';
import { match } from 'react-router'
import { Markdown } from 'react-showdown';

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
        const markdown = files.get(this.props.match.params.articleName + '.md');
        return (
            <Markdown markup={ markdown } components={{ CramScore }} />
        );
    }
}
