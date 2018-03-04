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

const SHELL_INPUT = <span>➜  ~ </span>;

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
        const typist = (<Typist avgTypingDelay={70} onTypingDone={this.handleAboutMeDone}>
                            <p>{SHELL_INPUT} cat aboutme.txt</p>
                        </Typist>);
        return (
            <div className={'terminal'}>
                <div className={'terminal-header'}>
                    About Me
                </div>
                {this.state.typing ? typist : <p>➜  ~ cat aboutme.txt</p>}
                {!this.state.typing && messages}
                {!this.state.typing && SHELL_INPUT}
            </div>
        );
    }

    private handleAboutMeDone = () => {
        this.setState({ typing: false });
    }
}
