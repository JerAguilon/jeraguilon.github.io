import * as React from "react";
import { PageHeader, Jumbotron, Grid, Row, Col, Button } from 'react-bootstrap';
import { Wrapper } from 'components/Wrapper'
import { Terminal } from 'components/Terminal'
import { WorkPanel } from 'components/WorkPanel'
import { COMPANY } from 'constants/'

const ABOUT_ME = [
    <p>
        I'm currently a third year in Georgia Tech's Computer Science program, set to graduate May 2019.
        I self-taught myself Java out of curiosity in high school and have been hooked since.
    </p>,
    <p>
        College has brought me through a wide variety of experiences. As a software engineer
        I've explored the tech giants at Google and Amazon and tried out agile growers such
        as Lyft. I got to taste wearing the many hats of a fresh startup through
        InternBlitz, where I found an admiration for product management.
        Academically, I've gotten to join wonderful organizations and
        participate in a few undergraduate research positions.
    </p>,
    <p>
        I have a lot of uncommon interests, but my best "party trick" is the fact that
        by the time you finish reading this sentence out loud, I could have solved an entire Rubik's Cube.
    </p>
]

const GOOGLE1_MESSAGES = [
    <p>
        As a member of cloud monitoring team, I improved usability of the analytics pipelines
        through a new pipeline monitoring service. This service aggregates the statuses of
        the pipelines and traces dependencies between the individual components. By storing
        pipeline statuses in a Spanner database, I made complex tasks such as diagnosing the
        root cause of a cascading pipeline automatic. My entrance into this program was quite
        unique, as I got my interview after completing the Google Foobar challenge.
        Check out my portfolio for what that is!
    </p>
]

const LYFT_MESSAGES = [<p>Writeup coming soon :)</p>];

const GOOGLE2_MESSAGES = [<p>Writeup coming soon :) </p>];

const AMAZON_MESSAGES = [
    <p>
        Personalization deals with recommending new products and services to customers.
        Naturally, one of the biggest challenges with cataloging Amazon's huge array of
        products is latency. In order to incorporate more complex (and by extension
        more relevant) algorithms, there is a tradeoff in computational cost. In
        order to include this more sophisticated model in widgets with low latency
        requirements, I created a NoSQL solution with preprocessed recommendation
        scores for over 100 million listings.

    </p>
];

const VERTAFORE_MESSAGES = [
    <p>
        In summer 2016, I had the opportunity to intern at Vertafore for the
        purpose of aiding them in developing insurance software to facilitate
        productivity. I helped integrate an array of cloud storage management
        solutions that are being implemented across all of the company's
        products. I also contributed to the initiative of providing high
        quality unit and end-to-end tests across the entire platform.
    </p>
];

const MESSAGES_MAP = {
    GOOGLE1: GOOGLE1_MESSAGES,
    GOOGLE2: GOOGLE2_MESSAGES,
    LYFT: LYFT_MESSAGES,
    AMAZON: AMAZON_MESSAGES,
    VERTAFORE: VERTAFORE_MESSAGES,
}

export interface GreetingState {
    currentMessages: React.ReactNode[]
}

export class Greeting extends React.Component<{}, GreetingState> {
    public constructor(props) {
        super(props);
        this.state = {currentMessages: ABOUT_ME}
    }

    public render() {
        console.log(this.state.currentMessages);
        return (
            <Wrapper backgroundColor={'#F5F4f4'}>
            <Grid>
                <Col xs={12}>
                    <PageHeader>What's up? I'm Jeremy.</PageHeader>
                    <Terminal messages={this.state.currentMessages}/>
                </Col>
                <Col xs={12}>
                    <PageHeader>Work and Stuff <small>Psst... click on the logos</small></PageHeader>
                    <WorkPanel handleClick={this.handleMessage}/>
                </Col>
            </Grid>
            </Wrapper>
        );
    }

    private handleMessage = (company: string) => {
        console.log(company);
        this.setState({currentMessages: MESSAGES_MAP[company]})
    }
}
