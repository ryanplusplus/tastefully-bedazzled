import React from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default () => {
  return (
    <Navbar>
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <NavLink exact to="/" className="nav-link">Notes</NavLink>
          <NavLink to="/new" className="nav-link">New</NavLink>
          <NavLink to="/settings" className="nav-link">Settings</NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
