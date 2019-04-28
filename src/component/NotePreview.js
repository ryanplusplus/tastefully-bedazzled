import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

export default class extends Component {
  state = {
    title: '',
    body: '',
    loaded: false
  };

  componentDidMount = async () => {
    const note = await this.props.model.readNote(this.props.id);

    this.setState({
      title: note.title,
      body: note.body,
      loaded: true
    });
  };

  render = () => {
    return (
      <Card>
        <Card.Header>
          <div className="font-weight-bold">{this.state.title}</div>
        </Card.Header>
        <Card.Body>
          {this.state.body}
        </Card.Body>
      </Card>
    );
  };
};
