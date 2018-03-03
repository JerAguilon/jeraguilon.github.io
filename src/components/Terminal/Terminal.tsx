import * as React from "react";
import './Terminal.css'
import Typist from 'react-typist'
import { delayGenerator } from './helpers'

export interface TerminalProps {
    messages: string[];
}

export interface TerminalState {
    displayAboutMe: boolean;
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
        this.state = {displayAboutMe: false};
    }
    public render() {
        const messages = this.props.messages;
        const messagesNodes = messages.map(line => (<p>{line}</p>));
        messagesNodes.push('~ ➜ ')
        return (
            <div className={'terminal'}>
                <div className={'terminal-header'}>
                    About Me
                </div>
                <Typist
                    onTypingDone={this.handleAboutMeDone}
                >
                    <p>➜  ~ cat aboutme.txt</p>
                </Typist>
                {this.state.displayAboutMe && messagesNodes}
            </div>
        );
    }

    private handleAboutMeDone = () => {
        this.setState({displayAboutMe: true});
    }
}
