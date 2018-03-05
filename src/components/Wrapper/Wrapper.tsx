import * as React from "react";
import { PageHeader, Grid, Row, Col, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'

import './Wrapper.css';

export class Wrapper extends React.Component<{backgroundColor: string}, {}> {
    public render(){
        const { backgroundColor, children } = this.props;
        const style = {
            backgroundColor
        } as React.CSSProperties

        return (
            <div className={'component-wrapper'} style={style}>
                <Grid>
                    <Col xs={12}>
                        <PageHeader>Jeremy Aguilon's Page</PageHeader>
                    </Col>
                    <Col xs={12} sm={8}>
                        <Col xs={12} id="slide-panel">
                            {children}
                        </Col>
                    </Col>
                    <Col xs={12} sm={4}>
                        <div className="nav-pane affix">
                            <NavLink exact to='/' onClick={this.clickHandler}>
                                <h1>About Me</h1>
                            </NavLink>
                            <NavLink to='/professional' onClick={this.clickHandler}>
                                <h1>Professional Experience</h1>
                            </NavLink>
                            <NavLink to='/education' onClick={this.clickHandler}>
                                <h1>Education</h1>
                            </NavLink>
                            <NavLink to='/portfolio' onClick={this.clickHandler}>
                                <h1>Portfolio</h1>
                            </NavLink>
                        </div>
                    </Col>
                </Grid>
            </div>
        );
    }

    private clickHandler = () => {
        const element = document.getElementById('slide-panel');
        element.style.webkitAnimation = 'none';
        setTimeout(function() {
            element.style.webkitAnimation = '';
        }, 5);
        element.classList.add('slide-out');
    }
}
