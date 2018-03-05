"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
require("./About.css");
var react_typist_1 = require("react-typist");
var TerminalStep;
(function (TerminalStep) {
    TerminalStep[TerminalStep["ABOUT_START"] = 0] = "ABOUT_START";
    TerminalStep[TerminalStep["ABOUT_CALL_NEXT"] = 1] = "ABOUT_CALL_NEXT";
    TerminalStep[TerminalStep["CONTACT_START"] = 2] = "CONTACT_START";
    TerminalStep[TerminalStep["DONE"] = 3] = "DONE";
})(TerminalStep || (TerminalStep = {}));
var SHELL_INPUT = React.createElement("span", null, "\u279C  ~ ");
var CALL_ABOUT_ME = 'cat aboutme.txt';
var CALL_NEXT = 'gnome-terminal';
var CALL_CONTACT = 'cat contact.txt';
var ABOUT_NODE = (React.createElement("div", null,
    React.createElement("p", null, "Hey! Welcome to my internet abode. I'm a student, software developer, and product manager from Georgia Tech."),
    React.createElement("p", null,
        "Chances are you're here to learn about my professional side. I've interned as a software engineer at ",
        React.createElement("b", null, "Google"),
        ", ",
        React.createElement("b", null, "Amazon"),
        ", ",
        React.createElement("b", null, "Lyft"),
        ", and ",
        React.createElement("b", null, "Vertafore"),
        ". I also served as a technical co-founer of ",
        React.createElement("b", null, "InternBlitz"),
        " for a year. This summer I'll be an APM at Google."),
    React.createElement("p", null, "I have a lot of uncommon interests, but my best \"party trick\" is the fact that by the time you finish reading this sentence out loud, I could have solved an entire Rubik's Cube.")));
var CONTACT_NODE = (React.createElement("div", null));
var About = /** @class */ (function (_super) {
    __extends(About, _super);
    function About(props) {
        var _this = _super.call(this, props) || this;
        _this.createTypist = function (step, command) {
            var doneHandler = _this.proceedNext(step);
            return (React.createElement("div", null,
                SHELL_INPUT,
                React.createElement(react_typist_1["default"], { avgTypingDelay: 70, onTypingDone: doneHandler, cursor: { hideWhenDone: true }, startDelay: 500 },
                    React.createElement("p", null, command))));
        };
        _this.proceedNext = function (step) {
            return function () { return _this.setState({ step: TerminalStep[TerminalStep[(step + 1)]] }); };
        };
        _this.state = { step: TerminalStep.ABOUT_START };
        return _this;
    }
    About.prototype.render = function () {
        return (React.createElement("div", { className: 'about' },
            React.createElement("div", { className: 'terminal terminal-about' },
                React.createElement("div", { className: 'terminal-header' }, "About Me"),
                this.state.step >= TerminalStep.ABOUT_START
                    ? this.createTypist(TerminalStep.ABOUT_START, CALL_ABOUT_ME) : '',
                this.state.step >= TerminalStep.ABOUT_CALL_NEXT ? ABOUT_NODE : '',
                this.state.step >= TerminalStep.ABOUT_CALL_NEXT
                    ? this.createTypist(TerminalStep.ABOUT_CALL_NEXT, CALL_NEXT) : '',
                this.state.step >= TerminalStep.CONTACT_START
                    ? React.createElement("p", null,
                        SHELL_INPUT,
                        React.createElement("span", { className: "Cursor Cursor--blinking" }, "|")) : ''),
            this.state.step >= TerminalStep.CONTACT_START
                ? (React.createElement("div", { className: 'terminal terminal-contact' },
                    React.createElement("div", { className: 'terminal-header' }, "Contact Info")))
                : ''));
    };
    return About;
}(React.Component));
exports.About = About;
