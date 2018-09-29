import * as React from "react";

import { About } from 'components/About';
import { BlogPanel } from 'components/BlogPanel';
import { EducationPanel } from 'components/EducationPanel';
import { PixelLogoAction } from 'components/Logo';
import { PortfolioPanel } from 'components/PortfolioPanel';
import { Route, BrowserRouter } from 'react-router-dom';
import { WorkPanel } from 'components/WorkPanel';
import { Wrapper } from 'components/Wrapper';
import { ArticleRenderer } from 'components/ArticleRenderer';

import './App.css'


enum CurrentPage {
    ABOUT, PROFESSIONAL, EDUCATION, PORTFOLIO, BLOG
}

export interface AppState {
    currentPage: CurrentPage
}

const PAGE_TO_COLOR = {
    ABOUT: '#62c5e2',
    PROFESSIONAL: '#f9de77',
    EDUCATION: '#fd8774',
    PORTFOLIO: '#50dcaf',
    BLOG: '#fdfdfd',
}

const PAGE_TO_PIXEL_ACTION = {
    ABOUT: PixelLogoAction.CODING,
    PROFESSIONAL: PixelLogoAction.SLEEPING,
    EDUCATION: PixelLogoAction.DRINKING,
    PORTFOLIO: PixelLogoAction.THINKING,
    BLOG: PixelLogoAction.READING,
}

export class App extends React.Component<{}, AppState> {
    public constructor(props) {
        super(props);
        this.state = {
            currentPage: this.getCurrentPage(),
        }
        this.handleTransition = this.handleTransition.bind(this);
    }
    
    private getCurrentPage() {
        // hacky way to get the pathname until a better way is investigated
        // TODO: inject the router to get the path
        if (window.location.pathname === '/') {
            return CurrentPage.ABOUT;    
        } else if (window.location.pathname === '/professional') {
            return CurrentPage.PROFESSIONAL;
        } else if (window.location.pathname === '/education') {
            return CurrentPage.EDUCATION;
        } else if (window.location.pathname === '/portfolio') {
            return CurrentPage.PORTFOLIO;
        } else {
            return CurrentPage.BLOG;
        }
    }

    public render() {
        return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Wrapper
                    backgroundColor={PAGE_TO_COLOR[CurrentPage[this.state.currentPage]]}
                    pixelLogoAction={PAGE_TO_PIXEL_ACTION[CurrentPage[this.state.currentPage]]}
                    shouldAffixSidePane={this.state.currentPage != CurrentPage.ABOUT}
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

                    <Route exact path="/blog" render={(routeProps) => (
                            <BlogPanel renderCallback={this.handleTransition(CurrentPage.BLOG)}/>
                    )} />

                    <Route exact path="/blog/:articleName" render={(routeProps) => (
                        <ArticleRenderer
                            match={routeProps.match}
                            renderCallback={this.handleTransition(CurrentPage.BLOG)}
                        />
                    )}
                    />
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
