import * as React from 'react';

import './CodeSnippets.css';
import '../../css/prism.css';

export interface BlogProps {
  algorithm: string
}

export interface BlogState {
}

const algorithmMap = {
  'treeRecursion': 'python3/bd2ed5319d',
  'slidingWindow': 'python/4d787b7e19',
  'dynamicProgramming': 'python/40ef94c17f',
  'unionFind': 'python3/78b02cb5f2',
  'primsAlgorithm': 'python3/1869a6293e',
}

const heightMap = {
  'treeRecursion': 370,
  'slidingWindow': 650,
  'dynamicProgramming': 520,
  'unionFind': 600,
  'primsAlgorithm': 520,
}

export class CodeSnippets extends React.Component<BlogProps, BlogState> {

  public constructor(props) {
    super(props);

    this.state = {
    }
  }

  public render() {
    let trinketId = algorithmMap[this.props.algorithm];
    let url = "https://trinket.io/embed/" + trinketId + "?toggleCode=true";
    return (<>
      <iframe src={url} width="100%" height={heightMap[this.props.algorithm]} frameBorder="0" marginWidth={0} marginHeight={0} allowFullScreen={true}></iframe>
    </>);
  }
};
