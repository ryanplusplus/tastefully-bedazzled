import React from 'react';
import CardColumns from 'react-bootstrap/CardColumns';
import Note from './Note';

export default (props) => {
  return (
    <CardColumns>
      {props.notes.map(({ id, data }) => {
        return (
          <Note
            model={props.model}
            id={id}
            key={id}
            title={data.title}
            body={data.body}
            onDelete={props.onDelete}
            onShare={props.onShare}
          />
        );
      })}
    </CardColumns>
  );
};
