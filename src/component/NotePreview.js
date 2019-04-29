import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default (props) => {
  return (
    <Card>
      <Card.Header>
        <div className="font-weight-bold">{props.title}</div>
      </Card.Header>
      <Card.Body>
        {props.body}
      </Card.Body>
      <Card.Footer className="p-0">
        <div className="text-right">
          <Button
            variant="light"
            onClick={() => props.onEdit(props.id)}
          >
            Edit
          </Button>
          <Button
            variant="light"
            onClick={() => props.onDelete(props.id)}
          >
            Delete
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};
