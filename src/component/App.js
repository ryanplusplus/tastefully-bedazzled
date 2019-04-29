import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Model from '../notes/Model';
import Api from '../notes/Api';
import CreateNote from './CreateNote';
import Settings from './Settings';
import FourOhFour from './FourOhFour';
import Header from './Header';
import NotePreviewGrid from './NotePreviewGrid';
import Note from './Note';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = { loaded: false, ids: [] };

    Model(Api()).then(async (model) => {
      this.model = model;
      this.updateState({ loaded: true });
    });
  };

  updateState = async (overrides = {}) => {
    const ids = await this.model.listNotes();
    const notes = await Promise.all(ids.map(async (id) => {
      return { id, data: await this.model.readNote(id) };
    }));
    this.setState(Object.assign({
      key: this.model.key,
      notes,
      keyError: false
    }, overrides));
  };

  createNote = async ({ title, body }) => {
    await this.model.createNote({ title, body });
    await this.updateState();
    this.props.history.push('/');
  };

  deleteNote = async (id) => {
    await this.model.deleteNote(id);
    this.updateState();
  };

  updateKey = async (key) => {
    if(await this.model.validKey(key)) {
      await this.model.setKey(key);
      await this.updateState();
    }
    else {
      this.setState({
        keyError: true
      });
    }
  };

  render = () => {
    return (
      this.state.loaded && <Container fluid="true">
        <Header />

        <Container fluid="true">
          <Switch>
            <Route exact path="/" component={() => <NotePreviewGrid model={this.model} notes={this.state.notes} onDelete={this.deleteNote} />} />
            <Route path="/new" component={() => <CreateNote onSave={this.createNote} />} />
            <Route path="/settings" component={() => <Settings currentKey={this.state.key} keyError={this.state.keyError} onKeyUpdate={this.updateKey} />} />
            <Route path="/note/:id" component={() => <Note model={this.model} />} />
            <Route component={FourOhFour} />
          </Switch>
        </Container>
      </Container>
    );
  };
}
