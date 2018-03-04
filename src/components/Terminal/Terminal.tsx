import * as React from "react";
import './Terminal.css'
import Typist from 'react-typist'
import { delayGenerator } from './helpers'

enum TerminalStep {
    ABOUT_START=0,
    ABOUT_CALL_NEXT=1,
    ABOUT_FINISHED=2,
    CONTACT_START=3,
}

export interface TerminalProps {
    messages: React.ReactNode[];
}

export interface TerminalState {
    step: TerminalStep
}

const SHELL_INPUT = <span>➜  ~ </span>;
const CALL_ABOUT_ME = 'cat aboutme.txt';
const CALL_NEXT = 'gnome-terminal';

export class Terminal extends React.Component<TerminalProps, TerminalState> {
    public constructor(props: TerminalProps) {
        super(props);
        this.state = { step: TerminalStep.ABOUT_START };
    }

    public render() {
        const { messages } = this.props;
        return (
            <div className={'terminal'}>
                <div className={'terminal-header'}>
                    About Me
                </div>
                {this.state.step >= TerminalStep.ABOUT_START
                        ? this.createTypist(TerminalStep.ABOUT_START, CALL_ABOUT_ME) : '' }
                {this.state.step >= TerminalStep.ABOUT_CALL_NEXT ? this.props.messages : '' }
                {this.state.step >= TerminalStep.ABOUT_CALL_NEXT
                        ? this.createTypist(TerminalStep.ABOUT_CALL_NEXT, CALL_NEXT) : '' }
                {this.state.step >= TerminalStep.ABOUT_FINISHED
                        ? <p>{SHELL_INPUT}<span className="Cursor Cursor--blinking">|</span></p> : ''}
            </div>
        );
    }

    private  createTypist = (step: TerminalStep, command: string) => {
        const doneHandler = this.proceedNext(step);
        return (
            <div>
                {SHELL_INPUT}
                <Typist avgTypingDelay={70}
                        onTypingDone={doneHandler}
                        cursor={{ hideWhenDone: true }}
                        startDelay={500}>
                    <p>{command}</p>
                </Typist>
            </div>
        );
    }

    private proceedNext = (step: TerminalStep) => {
        return () => this.setState({step: TerminalStep[TerminalStep[(step + 1)]]});
    }
}
