import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';

const Home = () => {
  return <div>Home</div>
};

const Away = () => {
  return <div>Away</div>
};

const OhNo = () => {
  return <div>Oh derp</div>
};

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/away">Away</NavLink>
          <NavLink to="/garbage">Garbage</NavLink>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/away" component={Away} />
            <Route component={OhNo} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
