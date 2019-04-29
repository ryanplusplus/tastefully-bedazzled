import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faEdit);
library.add(faTrashAlt);

export default (props) => {
  return (
    <Card>
      <Card.Header>
        <Container fluid="true">
          <Row>
            <Col className="p-0">
              <div className="float-left font-weight-bold">{props.title}</div>
            </Col>
            <Col className="p-0">
              <div className="float-right">
                <Button
                  className="p-0"
                  variant="link"
                  onClick={() => props.onEdit(props.id)}
                >
                  <FontAwesomeIcon style={{ color: "black" }} icon="edit" />
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button
                className="p-0"
                  variant="link"
                  onClick={() => props.onDelete(props.id)}
                >
                  <FontAwesomeIcon style={{ color: "black" }} icon="trash-alt" />
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Card.Header>

      <Card.Body>
        {props.body}
      </Card.Body>
    </Card>
  );
};
