import React from 'react';
import Note from './Note';

/**
 * NotesList component for displaying multiple notes
 * 
 * @param {Array} notes - Array of note objects to display
 * @param {function} onNoteClick - Handler for when a note is clicked
 */
const NotesList = ({ notes, onNoteClick }) => {
  if (!notes || notes.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📝</div>
        <div className="empty-state-text">No notes found</div>
        <p>Create a new note by clicking the + button</p>
      </div>
    );
  }

  return (
    <div className="notes-list">
      {notes.map(note => (
        <Note 
          key={note.id} 
          note={note} 
          onNoteClick={onNoteClick} 
        />
      ))}
    </div>
  );
};

export default NotesList;
