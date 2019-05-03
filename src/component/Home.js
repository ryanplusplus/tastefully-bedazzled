import React from 'react';
import NoteGrid from './NoteGrid';
import NoNotes from './NoNotes';

export default (props) => {
  if(props.notes.length > 0) {
    return <NoteGrid
      notes={props.notes}
      onDelete={props.onDelete}
      onShare={props.onShare}
    />
  }
  else {
    return <NoNotes />
  }
};
