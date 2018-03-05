import * as React from "react";
import { About } from 'components/About'
import { COMPANY } from 'constants/'
import { EducationPanel } from 'components/EducationPanel'
import { PageHeader, Jumbotron, Grid, Row, Col, Button } from 'react-bootstrap';
import { PortfolioPanel } from 'components/PortfolioPanel'
import { Route, HashRouter } from 'react-router-dom'
import { WorkPanel } from 'components/WorkPanel'
import { Wrapper } from 'components/Wrapper'

import './App.css'

enum PageColor {
    ABOUT='#62c5e2',
    PROFESSIONAL='#ffb836',
    WORK='#fd8774',
    PORTFOLIO='#50dcaf',
}

export interface AppState {
    pageColor: PageColor
}

export class App extends React.Component<{}, AppState> {
    public constructor(props) {
        super(props);
        this.state = { pageColor: PageColor.ABOUT }
    }

    public render() {
        return (
            <HashRouter>
                <Wrapper backgroundColor={ this.state.pageColor }>
                    <Route exact path ="/" render={(routeProps) => (
                            <About renderCallback={this.handleTransition(PageColor.ABOUT)}/>
                    )} />
                    <Route exact path="/professional" render={(routeProps) => (
                            <WorkPanel renderCallback={this.handleTransition(PageColor.PROFESSIONAL)}/>

                    )} />
                    <Route exact path="/education" render={(routeProps) => (
                            <EducationPanel renderCallback={this.handleTransition(PageColor.WORK)}/>

                    )} />
                    <Route exact path="/portfolio" render={(routeProps) => (
                            <PortfolioPanel renderCallback={this.handleTransition(PageColor.PORTFOLIO)}/>

                    )} />
                </Wrapper>
            </HashRouter>
        );
    }

    private handleTransition = (pageColor: PageColor) => {
        return () => {
            this.setState({pageColor});
        }
    }
}
