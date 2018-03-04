import * as React from "react";
import './Terminal.css'
import Typist from 'react-typist'
import { delayGenerator } from './helpers'

export interface TerminalProps {
    messages: React.ReactNode[];
}

export interface TerminalState {
    typing: boolean;
}

const gridInstance = (
<div>
    <h1>What's up?</h1>
    <h1>My name is Jeremy Aguilon</h1>
</div>
);

export class Terminal extends React.Component<TerminalProps, TerminalState> {
    public constructor(props: TerminalProps) {
        super(props);
        this.state = { typing: true };
    }


    public componentWillReceiveProps(props: TerminalProps) {
        this.setState({typing: true});
    }

    public render() {
        const { messages } = this.props;
        const typist = (<Typist avgTypingDelay={30} onTypingDone={this.handleAboutMeDone}>
                            <p>➜  ~ cat aboutme.txt</p>
                        </Typist>);
        return (
            <div className={'terminal'}>
                <div className={'terminal-header'}>
                    About Me
                </div>
                {this.state.typing ? typist : <p>➜  ~ cat aboutme.txt</p>}
                {!this.state.typing && messages}
            </div>
        );
    }

    private handleAboutMeDone = () => {
        this.setState({ typing: false });
    }
}
