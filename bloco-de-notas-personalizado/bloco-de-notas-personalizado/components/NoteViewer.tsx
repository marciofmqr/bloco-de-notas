
import React from 'react';
import { Note } from '../types';
import Button from './Button';

interface NoteViewerProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note; 
}

const NoteViewer: React.FC<NoteViewerProps> = ({ isOpen, onClose, note }) => {
  if (!isOpen) {
    return null;
  }

  let accentColor = note.color;
  if (note.color.includes('-900')) {
    accentColor = note.color.replace('-900', '-700');
  } else if (note.color.includes('-800')) {
    accentColor = note.color.replace('-800', '-600');
  } else if (note.color.includes('-700')) {
     accentColor = note.color.replace('-700', '-500');
  }

  const formattedDate = new Date(note.updatedAt).toLocaleString('pt-BR', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-[100] transition-opacity duration-300 ease-in-out" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="note-viewer-title"
    >
      <div
        className="bg-slate-800 text-slate-100 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-all duration-300 ease-in-out scale-100 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Impede que o clique dentro feche o modal
      >
        {/* Barra de acento de cor */}
        <div className={`absolute top-0 left-0 h-2.5 w-full ${accentColor}`}></div>
        
        {/* Cabeçalho do Modal */}
        <div className="flex justify-between items-center p-6 pt-8 border-b border-slate-700/70">
          <h2 id="note-viewer-title" className="text-2xl md:text-3xl font-semibold text-slate-50 truncate">
            {note.title}
          </h2>
          <Button 
            onClick={onClose} 
            variant="ghost" 
            size="sm" 
            className="text-slate-400 hover:text-slate-300 hover:bg-slate-700 p-2 rounded-full focus:ring-offset-slate-800"
            aria-label="Fechar visualizador de nota"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>

        {/* Conteúdo da Nota */}
        <div className="p-6 flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-700">
          <p className="text-slate-200 text-base md:text-lg whitespace-pre-wrap break-words">
            {note.content}
          </p>
        </div>
        
        {/* Rodapé do Modal */}
        <div className="p-4 text-xs text-slate-400 border-t border-slate-700/70 text-right">
          Última atualização: {formattedDate}
        </div>
      </div>
    </div>
  );
};

export default NoteViewer;
