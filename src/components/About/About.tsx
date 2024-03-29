import * as React from "react";
import './About.css'
import Typist from 'react-typist'
import { SEO } from 'components/SEO';

enum TerminalStep {
  ABOUT_START = 0,
  ABOUT_CALL_NEXT = 1,
  CONTACT_START = 2,
  DONE = 3
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
      Hello! Welcome to my abode on the internet.
    </p>
    <p>
      If you're here learn about my professional work:
    </p>
    <p>
      &nbsp;&nbsp;&nbsp;* I'm a software engineer with experience
      in an intersection of backend, data, and machine learning.
    </p>
    <p>
      &nbsp;&nbsp;&nbsp;* I currently work as an Algo Engineer at Hudson River Trading.
    </p>
    <p>
      &nbsp;&nbsp;&nbsp;* I formerly worked at Facebook and did internships at
      Google, Lyft, and Amazon.
    </p>
  </div>
);

const CONTACT_NODE = (
  <div>
    <p><b>Email: </b>jeremyaguilon1[at]gmail.com</p>
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
        <SEO url="about" />
        <div className={'terminal terminal-about'}>
          <div className={'terminal-header'}>
            About Me
            <div className={'terminal-buttons'}>
              <div className={'terminal-button terminal-button-min'} />
              <div className={'terminal-button terminal-button-max'} />
              <div className={'terminal-button terminal-button-close'} />
            </div>
          </div>
          {this.state.step >= TerminalStep.ABOUT_START
            ? this.createTypist(TerminalStep.ABOUT_START, CALL_ABOUT_ME) : ''}
          {this.state.step >= TerminalStep.ABOUT_CALL_NEXT ? ABOUT_NODE : ''}
          {this.state.step >= TerminalStep.ABOUT_CALL_NEXT
            ? this.createTypist(TerminalStep.ABOUT_CALL_NEXT, CALL_NEXT) : ''}
          {this.state.step >= TerminalStep.CONTACT_START
            ? BLINKER_NODE : ''}
        </div>
        {this.state.step >= TerminalStep.CONTACT_START
          ? <div className={'terminal terminal-contact'}>
            <div className={'terminal-header'}>
              Contact Info
                                  <div className={'terminal-buttons'}>
                <div className={'terminal-button terminal-button-min'} />
                <div className={'terminal-button terminal-button-max'} />
                <div className={'terminal-button terminal-button-close'} />
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

  private createTypist = (step: TerminalStep, command: string) => {
    const doneHandler = this.proceedNext(step);
    return (
      <div>
        {SHELL_INPUT}
        <Typist avgTypingDelay={30}
          onTypingDone={doneHandler}
          cursor={{ hideWhenDone: true }}
          startDelay={500}>
          <p>{command}</p>
        </Typist>
      </div>
    );
  }

  private proceedNext = (step: TerminalStep) => {
    return () => {
      this.setState({ step: TerminalStep[TerminalStep[(step + 1)]] });
    };
  }
}
