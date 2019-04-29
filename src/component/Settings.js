import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default (props) => {
  let key;

  const onKeyUpdate = (e) => {
    e.preventDefault();
    props.onKeyUpdate(key.value);
  };

  return (
    <Col xs={12} md={3} lg={2}>
      <Form onSubmit={onKeyUpdate} >
        <Form.Group controlId="currentKeyLabel">
          <Form.Label>Current key</Form.Label>
        </Form.Group>

        <Form.Group controlId="currentKey">
          <Form.Label><code>{props.currentKey}</code></Form.Label>
        </Form.Group>

        <Form.Group controlId="newKey">
          <Form.Label>New key</Form.Label>
          <InputGroup>
            <Form.Control required type="text" ref={(_key) => key = _key} />
            <Button className="float-right" variant="light" type="submit">
              Save
            </Button>
          </InputGroup>
        </Form.Group>
      </Form>

      {props.keyError && <Alert variant="danger">Invalid key</Alert>}
    </Col>
  );
};
