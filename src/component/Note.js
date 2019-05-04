import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt, faShareSquare } from '@fortawesome/free-solid-svg-icons'
import { LinkContainer } from 'react-router-bootstrap';

library.add(faEdit);
library.add(faTrashAlt);
library.add(faShareSquare);

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
                  onClick={() => props.onShare(props.id)}
                >
                  <FontAwesomeIcon style={{ color: "black" }} icon="share-square" />
                </Button>
                &nbsp;&nbsp;&nbsp;
                <LinkContainer to={`edit/${props.id}`}>
                  <Button
                    className="p-0"
                    variant="link"
                  >
                    <FontAwesomeIcon style={{ color: "black" }} icon="edit" />
                  </Button>
                </LinkContainer>
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
        <pre>{props.body}</pre>
      </Card.Body>
    </Card>
  );
};
