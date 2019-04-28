import React, { Component } from 'react';
import CardColumns from 'react-bootstrap/CardColumns';
import NotePreview from './NotePreview';

export default class extends Component {
  state = {
    notes: []
  };

  componentDidMount = async () => {
    this.setState({
      notes: await this.props.model.listNotes()
    });
  };

  render = () => {
    return (
      <CardColumns>
        {this.state.notes.map((id) => {
          return (
            <NotePreview model={this.props.model} id={id} key={id} />
          );
        })}
      </CardColumns>
    );
  };
};
