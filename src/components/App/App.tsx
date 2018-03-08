import * as React from "react";

import { About } from 'components/About'
import { EducationPanel } from 'components/EducationPanel'
import { PixelLogoAction } from 'components/Logo'
import { PortfolioPanel } from 'components/PortfolioPanel'
import { Route, BrowserRouter } from 'react-router-dom'
import { WorkPanel } from 'components/WorkPanel'
import { Wrapper } from 'components/Wrapper'

import './App.css'


enum CurrentPage {
    ABOUT, PROFESSIONAL, EDUCATION, PORTFOLIO,
}

export interface AppState {
    currentPage: CurrentPage
}

const PAGE_TO_COLOR = {
    ABOUT: '#62c5e2',
    PROFESSIONAL: '#ffb836',
    EDUCATION: '#fd8774',
    PORTFOLIO: '#50dcaf',
}

const PAGE_TO_PIXEL_ACTION = {
    ABOUT: PixelLogoAction.CODING,
    PROFESSIONAL: PixelLogoAction.SLEEPING,
    EDUCATION: PixelLogoAction.DRINKING,
    PORTFOLIO: PixelLogoAction.THINKING,
}

export class App extends React.Component<{}, AppState> {
    public constructor(props) {
        super(props);
        this.state = {
            currentPage: CurrentPage.ABOUT
        }
    }

    public render() {
        return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Wrapper
                    backgroundColor={PAGE_TO_COLOR[CurrentPage[this.state.currentPage]]}
                    pixelLogoAction={PAGE_TO_PIXEL_ACTION[CurrentPage[this.state.currentPage]]}
                >
                    <Route exact path ="/" render={(routeProps) => (
                            <About renderCallback={this.handleTransition(CurrentPage.ABOUT)}/>
                    )} />
                    <Route exact path="/professional" render={(routeProps) => (
                            <WorkPanel renderCallback={this.handleTransition(CurrentPage.PROFESSIONAL)}/>

                    )} />
                    <Route exact path="/education" render={(routeProps) => (
                            <EducationPanel renderCallback={this.handleTransition(CurrentPage.EDUCATION)}/>

                    )} />
                    <Route exact path="/portfolio" render={(routeProps) => (
                            <PortfolioPanel renderCallback={this.handleTransition(CurrentPage.PORTFOLIO)}/>

                    )} />
                </Wrapper>
            </BrowserRouter>
        );
    }

    private handleTransition = (currentPage: CurrentPage) => {
        return () => {
            this.setState({ currentPage });
        }
    }
}
