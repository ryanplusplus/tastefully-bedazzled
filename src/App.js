import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const Home = () => {
  return <div>Home</div>
};

const Away = () => {
  return <div>Away</div>
};

const OhNo = () => {
  return <div>Oh derp</div>
};

const Header = () => {
  return (
    <Navbar expand="lg">
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <NavLink exact to="/" className="nav-link">Home</NavLink>
          <NavLink to="/away" className="nav-link">Away</NavLink>
          <NavLink to="/garbage" className="nav-link">Garbage</NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

class App extends Component {
  render() {
    return (
      <Container fluid="true">
        <BrowserRouter>
          <Header />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/away" component={Away} />
            <Route component={OhNo} />
          </Switch>
        </BrowserRouter>
      </Container>
    );
  }
}

export default App;
