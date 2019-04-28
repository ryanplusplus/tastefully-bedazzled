import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class extends Component {
  onSubmit = async (e) => {
    e.preventDefault();
    this.props.onSubmit({ title: this.title.value, body: this.body.value });
  };

  render = () => {
    return (
      <Form onSubmit={this.onSubmit} >
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" ref={(title) => this.title = title} />
        </Form.Group>

        <Form.Group controlId="body">
          <Form.Label>Body</Form.Label>
          <Form.Control type="text" ref={(body) => this.body = body} />
        </Form.Group>

        <Button variant="light" type="submit">
          Save
        </Button>
      </Form>
    )
  };
};
