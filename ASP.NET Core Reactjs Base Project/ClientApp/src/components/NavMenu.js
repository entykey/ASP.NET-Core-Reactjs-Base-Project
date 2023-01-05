import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

import { isLoggedIn, getUser } from '../utils/helpers';
import { logout } from './users/Logout';


export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

    render() {
        let auth = isLoggedIn()
            ?
            <NavItem className="d-sm-inline-flex flex-sm-row-reverse">
                {/*TODO: getUser can go to user profile page :)*/}
                <NavLink tag={Link} eventKey={1} to="/">{`${getUser()}`}</NavLink>
                <NavLink tag={Link} eventKey={2} to="/" onClick={logout}>Logout</NavLink>
            </NavItem>
            : <NavItem className="d-sm-inline-flex flex-sm-row-reverse">
                <NavLink tag={Link} className="text-dark" eventKey={1} to="/login">Login</NavLink>
                <NavLink tag={Link} className="text-dark" eventKey={2} to="/register">Register</NavLink>
            </NavItem >
        //let example = isLoggedIn()
        //    ?
        //    <NavLink>
        //        <NavItem eventKey={1} href="/users">Users</NavItem>
        //        <NavItem eventKey={2} href="/example">Example</NavItem>
        //        <NavItem eventKey={3} href="/about">About</NavItem>
        //    </NavLink>
        //    : <NavLink>
        //        <NavItem eventKey={1} href="/users">Users</NavItem>
        //        <NavItem eventKey={2} href="/about">About</NavItem>
        //    </NavLink>
      return (
          //<Navbar inverse collapseOnSelect fixedTop>
          //    <Navbar.Header>
          //        <Navbar.Brand>
          //            <a href="/">ASP.NET Core ReactJS</a>
          //        </Navbar.Brand>
          //        <Navbar.Toggle />
          //    </Navbar.Header>
          //    <Navbar.Collapse>
          //        {example}
          //        {auth}
          //    </Navbar.Collapse>
          //</Navbar>
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
          <NavbarBrand tag={Link} to="/">ASP.NET_Core_Reactjs_Base_Project</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/fetch-data-custom">Fetch data custom</NavLink>
              </NavItem>
                {auth}
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
