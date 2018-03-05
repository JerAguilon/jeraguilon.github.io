import * as React from 'react';
import Typist from 'react-typist';
import { Glyphicon } from 'react-bootstrap'
import './Portfolio.css'

export interface PortfolioPanelProperties {
    renderCallback: () => void;
}

export class PortfolioPanel extends React.Component<PortfolioPanelProperties, {}> {
    public constructor(props) {
        super(props);
        this.props.renderCallback();
    }
    public render() {
        return (
            <div className="portfolio-panel">
                <Typist avgTypingDelay={30}>
                    <p>Under construction! Come back soon.*</p>
                    <br/>
                    <p><small>*Soon could mean 10 years from now...</small></p>
                </Typist>
            </div>
        );
    }
}
