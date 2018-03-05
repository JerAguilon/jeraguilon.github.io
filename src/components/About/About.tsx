import * as React from "react";
import './About.css'
import Typist from 'react-typist'

enum TerminalStep {
    ABOUT_START=0,
    ABOUT_CALL_NEXT=1,
    CONTACT_START=2,
    DONE=3
}

export interface TerminalProps {
    renderCallback: () => void;
}

export interface TerminalState {
    step: TerminalStep
}

const SHELL_INPUT = <span>➜  ~ </span>;
const CALL_ABOUT_ME = 'cat aboutme.txt';
const CALL_NEXT = 'gnome-terminal';
const CALL_CONTACT = 'cat contact.txt'

const ABOUT_NODE = (
    <div>
        <p>
            Hey! Welcome to my abode on the internet. I'm a student,
            software developer, and product manager from Georgia Tech.
        </p>
        <p>
            Chances are you're here to learn about my professional side. I've interned as a software
            engineer at <b>Google</b>, <b>Amazon</b>, <b>Lyft</b>, and <b>Vertafore</b>. I also
            served as a technical co-founder of <b>InternBlitz</b> for a year. This summer I'll be
            an APM at Google.
        </p>
    </div>
);

const CONTACT_NODE = (
    <div>
        <p><b>Email: </b><a href="mailto:jeremyaguilon@gmail.com">jeremyaguilon1@gmail.com</a></p>
        <p><b>LinkedIn: </b><a href="https://linkedin.com/in/jeraguilon" target="_blank">JerAguilon</a></p>
        <p><b>GitHub: </b><a href="https://github.com/jeraguilon" target="_blank">JerAguilon</a></p>
    </div>
);

const BLINKER_NODE = (
    <p>{SHELL_INPUT}<span className="Cursor Cursor--blinking">|</span></p>
);

export class About extends React.Component<TerminalProps, TerminalState> {
    public constructor(props: TerminalProps) {
        super(props);
        this.state = { step: TerminalStep.ABOUT_START };
        this.props.renderCallback();
    }

    public render() {
        return (
            <div className={'about'}>
                <div className={'terminal terminal-about'}>
                    <div className={'terminal-header'}>
                        About Me
                        <div className={'terminal-buttons'}>
                            <div className={'terminal-button terminal-button-min'}/>
                            <div className={'terminal-button terminal-button-max'}/>
                            <div className={'terminal-button terminal-button-close'}/>
                        </div>
                    </div>
                    {this.state.step >= TerminalStep.ABOUT_START
                            ? this.createTypist(TerminalStep.ABOUT_START, CALL_ABOUT_ME) : '' }
                    {this.state.step >= TerminalStep.ABOUT_CALL_NEXT ? ABOUT_NODE: '' }
                    {this.state.step >= TerminalStep.ABOUT_CALL_NEXT
                            ? this.createTypist(TerminalStep.ABOUT_CALL_NEXT, CALL_NEXT) : '' }
                    {this.state.step >= TerminalStep.CONTACT_START
                            ? BLINKER_NODE : ''}
                </div>
                {this.state.step >= TerminalStep.CONTACT_START
                        ? <div className={'terminal terminal-contact'}>
                              <div className={'terminal-header'}>
                                  Contact Info
                                  <div className={'terminal-buttons'}>
                                      <div className={'terminal-button terminal-button-min'}/>
                                      <div className={'terminal-button terminal-button-max'}/>
                                      <div className={'terminal-button terminal-button-close'}/>
                                  </div>
                              </div>
                              {this.createTypist(TerminalStep.CONTACT_START, CALL_CONTACT)}
                              {this.state.step == TerminalStep.DONE
                                   ? CONTACT_NODE
                                   : ''}
                                {this.state.step == TerminalStep.DONE
                                        ? BLINKER_NODE : ''
                                }
                          </div>
                        : ''
                }
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
