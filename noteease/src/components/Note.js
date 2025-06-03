import React from 'react';

/**
 * Note component for displaying a note item in the list
 * 
 * @param {Object} note - Note object containing title, content, etc.
 * @param {function} onNoteClick - Handler for when note is clicked
 */
const Note = ({ note, onNoteClick }) => {
  return (
    <div className="note-card" onClick={() => onNoteClick(note.id)}>
      <h3 className="note-title">{note.title}</h3>
      <p className="note-snippet">{note.content}</p>
      <div className="note-footer">
        <div className="note-date">{note.date}</div>
        {note.categories && note.categories.length > 0 && (
          <div className="note-categories">
            {note.categories.map((category, index) => (
              <span key={index} className="note-category">
                {category}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Note;
