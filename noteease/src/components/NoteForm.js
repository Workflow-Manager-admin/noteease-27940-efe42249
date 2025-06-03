import React, { useState, useEffect } from 'react';

/**
 * NoteForm component for creating and editing notes
 * 
 * @param {Object|null} note - Note object to edit, or null for a new note
 * @param {function} onSave - Handler for saving the note
 * @param {function} onCancel - Handler for canceling the operation
 * @param {function} onDelete - Handler for deleting the note (only in edit mode)
 */
const NoteForm = ({ note, onSave, onCancel, onDelete }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [categories, setCategories] = useState([]);
  
  // Initialize form when note is provided (edit mode)
  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setContent(note.content || '');
      setCategories(note.categories || []);
    } else {
      // Clear form for new note
      setTitle('');
      setContent('');
      setCategories([]);
    }
  }, [note]);

  const handleAddCategory = () => {
    if (categoryInput.trim() && !categories.includes(categoryInput.trim())) {
      setCategories([...categories, categoryInput.trim()]);
      setCategoryInput('');
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setCategories(categories.filter(category => category !== categoryToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!title.trim()) {
      alert('Please enter a title for your note');
      return;
    }

    const updatedNote = {
      id: note ? note.id : Date.now(),
      title: title.trim(),
      content: content.trim(),
      categories,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    };
    
    onSave(updatedNote);
  };

  const isEditMode = !!note;

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          type="text"
          id="title"
          className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="content" className="form-label">Content</label>
        <textarea
          id="content"
          className="form-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your note here..."
        />
      </div>

      <div className="form-group">
        <label className="form-label">Categories</label>
        <div className="category-input">
          <input
            type="text"
            className="form-input"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            placeholder="Add a category"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddCategory();
              }
            }}
          />
          <button
            type="button"
            className="btn"
            onClick={handleAddCategory}
          >
            +
          </button>
        </div>

        {categories.length > 0 && (
          <div className="selected-categories">
            {categories.map((category, index) => (
              <div key={index} className="category-chip">
                {category}
                <span
                  style={{ marginLeft: '5px', cursor: 'pointer' }}
                  onClick={() => handleRemoveCategory(category)}
                >
                  ×
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="form-actions">
        {isEditMode && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onDelete(note.id)}
          >
            Delete
          </button>
        )}
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn">
          {isEditMode ? 'Update' : 'Create'} Note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
