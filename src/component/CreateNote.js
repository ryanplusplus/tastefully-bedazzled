import React from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default (props) => {
  let body, title;

  const onSave = async (e) => {
    e.preventDefault();
    props.onSave({ title: title.value, body: body.value });
  };

  return (
    <Col xs={12} md={6} lg={4}>
      <Form onSubmit={onSave} >
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control required type="text" ref={(_title) => title = _title} />
          <Form.Control.Feedback type="invalid">
            Please specify a title
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="body">
          <Form.Label>Body</Form.Label>
          <Form.Control as="textarea" rows="7" ref={(_body) => body = _body} />
        </Form.Group>

        <Button className="float-right" variant="light" type="submit">
          Save
        </Button>
      </Form>
    </Col>
  );
};
