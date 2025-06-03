import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CategoryFilters from './CategoryFilters';
import NotesList from './NotesList';
import NoteForm from './NoteForm';

/**
 * MainContainer component that serves as the primary container for the NoteEase application
 */
const MainContainer = () => {
  // State for notes and filtered notes
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  
  // State for search and filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  
  // State for note editing
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  
  // Initialize with some example notes
  useEffect(() => {
    const exampleNotes = [
      {
        id: 1,
        title: 'Welcome to NoteEase',
        content: 'This is a simple note-taking application. You can create, edit, delete, search, and categorize notes.',
        categories: ['Welcome', 'Info'],
        date: 'May 20, 2023'
      },
      {
        id: 2,
        title: 'How to use NoteEase',
        content: 'Click the + button to add a new note. Click on a note to edit it. Use the search bar to find notes and the category filters to organize them.',
        categories: ['Tutorial', 'Help'],
        date: 'May 21, 2023'
      }
    ];
    
    setNotes(exampleNotes);
  }, []);
  
  // Apply filters whenever notes, searchTerm or activeCategory changes
  useEffect(() => {
    filterNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes, searchTerm, activeCategory]);
  
  // Extract all unique categories from notes
  const allCategories = React.useMemo(() => {
    const categoriesSet = new Set();
    notes.forEach(note => {
      if (note.categories) {
        note.categories.forEach(category => categoriesSet.add(category));
      }
    });
    return Array.from(categoriesSet);
  }, [notes]);
  
  // Filter notes based on search term and active category
  const filterNotes = () => {
    let filtered = [...notes];
    
    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        note => note.title.toLowerCase().includes(searchLower) || 
               note.content.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by category
    if (activeCategory) {
      filtered = filtered.filter(
        note => note.categories && note.categories.includes(activeCategory)
      );
    }
    
    setFilteredNotes(filtered);
  };
  
  // Handle opening the note form modal
  const handleAddNote = () => {
    setCurrentNote(null);
    setIsModalOpen(true);
  };
  
  // Handle opening an existing note for editing
  const handleNoteClick = (noteId) => {
    const noteToEdit = notes.find(note => note.id === noteId);
    if (noteToEdit) {
      setCurrentNote(noteToEdit);
      setIsModalOpen(true);
    }
  };
  
  // Save a new or updated note
  const handleSaveNote = (updatedNote) => {
    if (currentNote) {
      // Update existing note
      setNotes(notes.map(note => 
        note.id === updatedNote.id ? updatedNote : note
      ));
    } else {
      // Add new note
      setNotes([updatedNote, ...notes]);
    }
    setIsModalOpen(false);
  };
  
  // Delete a note
  const handleDeleteNote = (noteId) => {
    setNotes(notes.filter(note => note.id !== noteId));
    setIsModalOpen(false);
  };
  
  return (
    <div className="main-container">
      <div className="container">
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />
        
        <CategoryFilters 
          categories={allCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        
        <NotesList 
          notes={filteredNotes} 
          onNoteClick={handleNoteClick} 
        />
      </div>
      
      {/* Floating Action Button for adding new notes */}
      <button className="fab" onClick={handleAddNote}>+</button>
      
      {/* Modal for adding/editing notes */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">
                {currentNote ? 'Edit Note' : 'Add New Note'}
              </div>
              <button 
                className="modal-close" 
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>
            <NoteForm 
              note={currentNote}
              onSave={handleSaveNote}
              onCancel={() => setIsModalOpen(false)}
              onDelete={handleDeleteNote}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContainer;
