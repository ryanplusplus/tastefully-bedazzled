import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Model from '../notes/Model';
import Api from '../notes/Api';
import CreateNote from './CreateNote';
import Settings from './Settings';
import FourOhFour from './FourOhFour';
import Header from './Header';
import NoteGrid from './NotePreviewGrid';
import Note from './Note';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = { loaded: false };

    Model(Api()).then((model) => {
      this.model = model;
      this.setState({
        loaded: true
      });
    });
  };

  createNote = async ({ title, body }) => {
    await this.model.createNote({ title, body });
    this.props.history.push('/');
  };

  render = () => {
    return (
      this.state.loaded && <Container fluid="true">
        <Header />

        <Container fluid="true">
          <Switch>
            <Route exact path="/" component={() => <NoteGrid model={this.model} />} />
            <Route path="/new" component={() => <CreateNote model={this.model} onSubmit={this.createNote} />} />
            <Route path="/settings" component={() => <Settings model={this.model} />} />
            <Route path="/note/:id" component={() => <Note model={this.model} />} />
            <Route component={FourOhFour} />
          </Switch>
        </Container>
      </Container>
    );
  };
}
