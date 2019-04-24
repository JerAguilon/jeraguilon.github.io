import * as React from "react";
import { Navbar, NavbarBrand, Nav, PageHeader, Grid, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'

import {
  PixelLogoAction,
  PixelLogoSize,
  PixelLogo
} from 'components/Logo'

import './Wrapper.css';

export interface WrapperProps {
  backgroundColor: string;
  pixelLogoAction: PixelLogoAction;
  shouldAffixSidePane: boolean;
}

export interface WrapperState {
  width: number;
  navExpanded: boolean;
}

export class Wrapper extends React.Component<WrapperProps, WrapperState> {
  public constructor(props: WrapperProps) {
    super(props);
    this.state = { width: -1, navExpanded: false };
    this.updateWidth = this.updateWidth.bind(this);
    this.setNavExpanded = this.setNavExpanded.bind(this);
  }

  public componentDidMount() {
    this.updateWidth();
    window.addEventListener('resize', this.updateWidth);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.updateWidth);
  }

  public render() {
    const { backgroundColor, children } = this.props;
    const style = {
      backgroundColor
    } as React.CSSProperties

    return (
      <div className={'component-wrapper'} style={style}>
        <Grid>
          {this.getBanner()}
          <Col xs={12} sm={10} id="content-wrapper">
            <Col xs={12} id="slide-panel">
              {children}
            </Col>
          </Col>
          {this.getSidebar()}
        </Grid>
      </div>
    );
  }

  private getBanner = () => {
    return this.isSmall
      ? (
        <Navbar fixedTop inverse onToggle={this.setNavExpanded} expanded={this.state.navExpanded} >
          <Navbar.Header>
            <NavbarBrand>
              <PixelLogo
                pixelLogoAction={this.props.pixelLogoAction}
                pixelLogoSize={PixelLogoSize.SMALL}
              />
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
              <NavLink to='/blog' onClick={this.clickHandler}>
                <h3>Blog</h3>
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )
      : (
        <>
          <Col md={12} className="page-banner">
            <PixelLogo
              pixelLogoAction={this.props.pixelLogoAction}
              pixelLogoSize={PixelLogoSize.MEDIUM}
            />
            <PageHeader className='page-name'>Jeremy Aguilon's Page</PageHeader>
          </Col>
        </>
      );
  }

  private getSidebar = () => {
    return !this.isSmall
      ? (
        <Col xs={12} sm={2}>
          <div className={"nav-pane " + (this.props.shouldAffixSidePane ? "affix" : "")}>
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
            <NavLink to='/blog' onClick={this.clickHandler}>
              <h3>Blog</h3>
            </NavLink>
          </div>
        </Col>
      ) : '';
  }

  private clickHandler = () => {
    const element = document.getElementById('slide-panel');
    element!.style.webkitAnimation = 'none';
    setTimeout(function () {
      element!.style.webkitAnimation = '';
    }, 5);
    element!.classList.add('slide-out');
    this.setState({ navExpanded: false });
  }

  private updateWidth() {
    this.setState({ width: window.innerWidth });
  }

  private get isSmall(): boolean {
    // edge case: when the component has constructed, the width is -1
    return this.state.width < 768 && this.state.width > 0;
  }

  private setNavExpanded(expanded) {
    this.setState({ navExpanded: expanded });
    this.forceUpdate();
  }
}
