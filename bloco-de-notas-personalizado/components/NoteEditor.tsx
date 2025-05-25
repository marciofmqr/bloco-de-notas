
import React, { useState, useEffect, useCallback } from 'react';
import { Note } from '../types';
import { NOTE_COLORS, DEFAULT_NOTE_COLOR } from '../constants';
import Button from './Button';

interface NoteEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) => void;
  initialNote?: Note | null;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ isOpen, onClose, onSave, initialNote }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [color, setColor] = useState<string>(DEFAULT_NOTE_COLOR);

  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title);
      setContent(initialNote.content);
      setColor(initialNote.color);
    } else {
      setTitle('');
      setContent('');
      setColor(DEFAULT_NOTE_COLOR);
    }
  }, [initialNote, isOpen]); // Rerun if isOpen changes to reset form for new notes

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
        alert("O título não pode estar vazio.");
        return;
    }
    onSave({
      id: initialNote?.id,
      title,
      content,
      color,
    });
  }, [title, content, color, initialNote, onSave]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-[100] transition-opacity duration-300 ease-in-out" onClick={onClose}>
      <div 
        className="bg-slate-800 text-slate-200 rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-lg transform transition-all duration-300 ease-in-out scale-100"
        onClick={(e) => e.stopPropagation()} // Prevent click inside from closing modal
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-slate-100">
            {initialNote ? 'Editar Nota' : 'Nova Nota'}
          </h2>
          <Button onClick={onClose} variant="ghost" size="sm" className="text-slate-400 hover:text-slate-300 hover:bg-slate-700 p-2 rounded-full focus:ring-offset-slate-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="title" className="block text-sm font-medium text-slate-400 mb-1">
              Título
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 text-slate-100 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="content" className="block text-sm font-medium text-slate-400 mb-1">
              Conteúdo
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 text-slate-100 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors resize-y"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-400 mb-2">
              Cor da Nota
            </label>
            <div className="flex flex-wrap gap-2">
              {NOTE_COLORS.map(c => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-full ${c} border-2 transition-all duration-150 ${color === c ? 'ring-2 ring-offset-2 ring-offset-slate-800 ring-sky-500 border-white' : 'border-transparent hover:border-slate-500'}`}
                  aria-label={`Selecionar cor ${c.split('-')[1]}`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-700">
            <Button type="button" onClick={onClose} variant="secondary" className="focus:ring-offset-slate-800">
              Cancelar
            </Button>
            <Button type="submit" variant="primary" className="focus:ring-offset-slate-800">
              {initialNote ? 'Salvar Alterações' : 'Criar Nota'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteEditor;