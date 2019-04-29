import React from 'react';
import CardColumns from 'react-bootstrap/CardColumns';
import NotePreview from './NotePreview';

export default (props) => {
  return (
    <CardColumns>
      {props.notes.map(({ id, data }) => {
        return (
          <NotePreview
            model={props.model}
            id={id}
            key={id}
            title={data.title}
            body={data.body}
            onDelete={props.onDelete}
          />
        );
      })}
    </CardColumns>
  );
};
