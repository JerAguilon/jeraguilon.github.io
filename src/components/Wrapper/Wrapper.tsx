import * as React from "react";
import { Navbar, NavbarBrand, Nav, PageHeader, Grid, Col } from 'react-bootstrap';
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
                    <Navbar fixedTop inverse collapseOnSelect>
                        <Navbar.Header>
                            <NavbarBrand>
								<div className="pixel-logo"/>
                                <h4>Jeremy Aguilon's Page</h4>
                            </NavbarBrand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav>
                               <NavLink exact to='/' onClick={this.clickHandler}>
                                    <h3>About Me</h3>
                                </NavLink>
                                <NavLink to='/professional' onClick={this.clickHandler}>
                                    <h3>Professional Experience</h3>
                                </NavLink>
                                <NavLink to='/education' onClick={this.clickHandler}>
                                    <h3>Education</h3>
                                </NavLink>
                                <NavLink to='/portfolio' onClick={this.clickHandler}>
                                    <h3>Portfolio</h3>
                                </NavLink>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <Col xs={12} className="page-banner">
                        <div className="pixel-logo"/>
                        <PageHeader className='page-name'>Jeremy Aguilon's Page</PageHeader>
                    </Col>
                    <Col xs={12} sm={8} id="content-wrapper">
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
        element!.style.webkitAnimation = 'none';
        setTimeout(function() {
            element!.style.webkitAnimation = '';
        }, 5);
        element!.classList.add('slide-out');
    }
}
