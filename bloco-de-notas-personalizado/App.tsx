
import React, { useState, useEffect, useCallback } from 'react';
import { Note } from './types';
import { DEFAULT_NOTE_COLOR } from './constants';
import Header from './components/Header';
import NoteCard from './components/NoteCard';
import NoteEditor from './components/NoteEditor';
import NoteViewer from './components/NoteViewer'; // Importar o novo componente
import Button from './components/Button';

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [viewingNote, setViewingNote] = useState<Note | null>(null); // Estado para a nota em visualização
  const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false); // Estado para visibilidade do visualizador

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes-app-data');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes-app-data', JSON.stringify(notes));
  }, [notes]);

  const handleAddNoteClick = useCallback(() => {
    setEditingNote(null);
    setIsEditorOpen(true);
  }, []);

  const handleEditNoteClick = useCallback((note: Note) => {
    setEditingNote(note);
    setIsEditorOpen(true);
  }, []);

  const handleCloseEditor = useCallback(() => {
    setIsEditorOpen(false);
    setEditingNote(null);
  }, []);

  const handleSaveNote = useCallback((noteToSave: Omit<Note, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) => {
    const now = Date.now();
    if (editingNote && noteToSave.id) {
      setNotes(prevNotes => 
        prevNotes.map(n => 
          n.id === noteToSave.id ? { ...n, ...noteToSave, updatedAt: now } : n
        )
      );
    } else {
      const newNote: Note = {
        ...noteToSave,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
        color: noteToSave.color || DEFAULT_NOTE_COLOR,
      };
      setNotes(prevNotes => [newNote, ...prevNotes]);
    }
    handleCloseEditor();
  }, [editingNote, handleCloseEditor]);

  const handleDeleteNote = useCallback((id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta nota?")) {
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    }
  }, []);

  const handleOpenViewer = useCallback((note: Note) => {
    setViewingNote(note);
    setIsViewerOpen(true);
  }, []);

  const handleCloseViewer = useCallback(() => {
    setIsViewerOpen(false);
    setViewingNote(null);
  }, []);

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a,b) => b.updatedAt - a.updatedAt);


  return (
    <div className="min-h-screen text-slate-200 flex flex-col">
      <Header onAddNoteClick={handleAddNoteClick} />
      
      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
             <h2 className="text-2xl font-semibold text-slate-300">Minhas Notas</h2>
             <div className="w-full sm:w-auto max-w-xs">
               <input
                type="text"
                placeholder="Buscar notas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 text-slate-200 placeholder-slate-400 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
              />
             </div>
          </div>

          {filteredNotes.length === 0 && !searchTerm && (
            <div className="text-center py-10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-slate-500 mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              <p className="text-slate-400 text-lg">Nenhuma nota ainda.</p>
              <p className="text-slate-500">Clique em "Adicionar Nota" no cabeçalho para criar uma!</p>
            </div>
          )}

          {filteredNotes.length === 0 && searchTerm && (
             <div className="text-center py-10">
              <p className="text-slate-400 text-lg">Nenhuma nota encontrada para "{searchTerm}".</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredNotes.map(note => (
              <NoteCard 
                key={note.id} 
                note={note} 
                onEdit={() => handleEditNoteClick(note)} 
                onDelete={() => handleDeleteNote(note.id)} 
                onExpand={() => handleOpenViewer(note)} // Passar o handler
              />
            ))}
          </div>
        </div>
      </main>

      {isEditorOpen && (
        <NoteEditor 
          isOpen={isEditorOpen} 
          onClose={handleCloseEditor} 
          onSave={handleSaveNote}
          initialNote={editingNote} 
        />
      )}

      {isViewerOpen && viewingNote && ( // Renderizar o NoteViewer
        <NoteViewer
          isOpen={isViewerOpen}
          onClose={handleCloseViewer}
          note={viewingNote}
        />
      )}
      
      <footer className="text-center p-4 text-slate-500 text-sm">
        Feito com ❤️ e React.
      </footer>
    </div>
  );
};

export default App;
