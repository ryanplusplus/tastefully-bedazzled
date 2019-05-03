import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Notifications, { notify } from 'react-notify-toast';
import Model from '../notes/Model';
import Api from '../notes/Api';
import EditNote from './EditNote';
import Settings from './Settings';
import FourOhFour from './FourOhFour';
import Header from './Header';
import Home from './Home';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = { loaded: false, ids: [] };

    let key;
    try {
      key = document.cookie.match(/key=([^\s;]+)/)[1];
    }
    catch(e) {}

    Model(Api(), key).then(async (model) => {
      this.model = model;
      document.cookie = `key=${model.key}; expires=Thu, 18 Dec " + ${new Date().getFullYear() + 10} + " 12:00:00 UTC`;
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

  editNote = async ({ id, title, body }) => {
    await this.model.writeNote(id, { title, body });
    await this.updateState();
    this.props.history.push('/');
  };

  addSharedNote = async (id) => {
    await this.model.addNote(id);
    await this.updateState();
  };

  deleteNote = async (id) => {
    await this.model.deleteNote(id);
    this.updateState();
  };

  shareNote = async (id) => {
    const urlComponents = window.location.href.split('/');
    const url = `${urlComponents[0]}//${urlComponents[2]}`;
    await navigator.clipboard.writeText(`${url}/share/${id}`);
    notify.show('Share link copied to clipboard!');
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
        <Notifications />

        <Header />

        <Container fluid="true">
          <Switch>
            <Route exact path="/" component={() =>
              <Home
                model={this.model}
                notes={this.state.notes}
                onDelete={this.deleteNote}
                onShare={this.shareNote}
              />}
            />

            <Route path="/new" component={() =>
              <EditNote onSave={this.createNote} />}
            />

            <Route path="/settings" component={() =>
              <Settings
                currentKey={this.state.key}
                keyError={this.state.keyError}
                onKeyUpdate={this.updateKey}
              />}
            />

            <Route path="/edit/:id" component={(props) => {
              const id = props.match.params.id;
              const note = this.model.readNote(id);

              return (
                <EditNote
                  onSave={this.editNote}
                  id={id}
                  note={note}
                />
              );
            }} />

            <Route path="/share/:id" render={(props) => {
              this.addSharedNote(props.match.params.id);
              return <Redirect to="/" />;
            }} />

            <Route component={FourOhFour} />
          </Switch>
        </Container>
      </Container>
    );
  };
}
