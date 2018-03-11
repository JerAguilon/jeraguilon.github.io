import * as React from 'react';
import { Redirect } from 'react-router';

import { Panel } from 'components/Panel';

import './BlogPanel.css';


export interface BlogProps {
    renderCallback: () => void;
}

export interface BlogState {
    articleClicked: boolean;
    articleName: string;
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
        if (this.state.articleClicked) {
            return (
                <Redirect to={this.state.articleName} />
            );
        }

        return (
            <>
            {
                articles.map((article, key) => (
                    <Panel
                        key={key}
                        title={article.title}
                        subtitle={article.date}
                        onClick={this.handleClick(article.path)}
                    >
                        <h4><i>{article.description}</i></h4>
                    </Panel>
                ))
            }
            </>
        )
    }

    private handleClick = (path: string) => {
        return () => {
            this.setState({articleClicked: true, articleName: path})
        };
    }
};
