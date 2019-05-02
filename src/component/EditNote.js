import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default class extends Component {
  constructor(props) {
    super(props);

    if(this.props.note) {
      this.state = {
        ready: false
      };

      this.props.note.then((note) => {
        this.setState({
          ready: true,
          title: note.title,
          body: note.body
        });
      });
    }
    else {
      this.state = {
        ready: true
      }
    }
  }

  onSave = async (e) => {
    e.preventDefault();
    this.props.onSave({ id: this.props.id, title: this.title.value, body: this.body.value });
  };

  render() {
    return (
      !this.state.ready? <div>busy</div> : <Col xs={12} md={6} lg={4}>
        <Form onSubmit={this.onSave} >
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control required type="text" defaultValue={this.state.title} ref={(title) => this.title = title} />
            <Form.Control.Feedback type="invalid">
              Please specify a title
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="body">
            <Form.Label>Body</Form.Label>
            <Form.Control as="textarea" rows="7" defaultValue={this.state.body} ref={(body) => this.body = body} />
          </Form.Group>

          <Button className="float-right" variant="light" type="submit">
            Save
          </Button>
        </Form>
      </Col>
    );
  }
};
