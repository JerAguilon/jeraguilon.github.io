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
        return (
            <>
            {
                articles.map((article, key) => (
                    <Panel
                        key={key}
                        title={article.title}
                        onClick={this.handleClick(article.filepath)}
                    >
                        {article.description}
                    </Panel>
                ))
            }
            </>
        )
    }

    private handleClick = (filepath: string) => {
        return () => {
            console.log(filepath);
                
        };
    }
};
