import * as React from 'react';

import { Panel } from 'components/Panel';


export interface BlogProps {
    renderCallback: () => void;
}


const { articles } = require('../../articles/articles.json');

export class BlogPanel extends React.Component<BlogProps, {}> {

    public constructor(props) {
        super(props);
        this.props.renderCallback();
    }

    public render() {
        console.log("ARTICLES");
        console.log(articles);
        return (
            <>
            {
                articles.map((article, key) => (
                    <Panel
                        key={key}
                        title={article.title}
                    >
                        {article.description}
                    </Panel>
                ))
            }
            </>
        )
    }
};
