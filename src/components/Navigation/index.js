import React from 'react';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';
import { compose } from 'recompose';
import { AuthUserContext } from '../Session';
import { Navbar, Nav } from 'react-bootstrap';

const NavigationAuthBase = (props) => (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand href='#' onClick={() => props.history.push(ROUTES.HOME)}>Site Maker</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link a="href" onClick={() => props.history.push(ROUTES.ACCOUNT)}>Account</Nav.Link>
        <Nav.Link a="href" onClick={() => props.history.push(ROUTES.HOME)}>Home</Nav.Link>
        <Nav.Link a="href" onClick={() => props.history.push(ROUTES.TEMPLATE)}>Templates</Nav.Link>
        <Nav.Link a="href" onClick={() => props.history.push(ROUTES.MYTEMPLATE)}>My Templates</Nav.Link>
      </Nav>
      <Nav>
        <SignOutButton />
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)


const NavigationNonAuthBase = (props) => (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand href='#' onClick={() => props.history.push(ROUTES.HOME)}>Site Maker</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
      </Nav>
      <Nav>
        <Nav.Link a="href" onClick={() => props.history.push(ROUTES.SIGN_IN)}>Login</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

const NavigationNonAuth = compose(
  withRouter
  )(NavigationNonAuthBase);

const NavigationAuth = compose(
withRouter
)(NavigationAuthBase);

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

export default Navigation;