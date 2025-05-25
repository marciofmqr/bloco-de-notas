import React, { useCallback } from 'react';
import { Note } from '../types';
import Button from './Button';

interface NoteCardProps {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  const formattedDate = new Date(note.updatedAt).toLocaleString('pt-BR', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  let accentColor = note.color;
  if (note.color.includes('-900')) {
    accentColor = note.color.replace('-900', '-700');
  } else if (note.color.includes('-800')) {
    accentColor = note.color.replace('-800', '-600');
  } else if (note.color.includes('-700')) {
     accentColor = note.color.replace('-700', '-500');
  }

  const sanitizeFilename = (name: string): string => {
    let sanitized = name.replace(/[^\w\s.-]/gi, '_'); // Replace non-alphanumeric (excluding whitespace, dots, hyphens) with underscore
    sanitized = sanitized.replace(/[\s_]+/g, '_'); // Replace multiple spaces/underscores with single underscore
    sanitized = sanitized.replace(/^_+|_+$/g, ''); // Trim leading/trailing underscores
    return sanitized.substring(0, 50) || 'nota'; // Limit length and provide default
  };

  const handleDownload = useCallback(() => {
    const filename = `${sanitizeFilename(note.title)}.txt`;
    const fileContent = `Título: ${note.title}\n\nConteúdo:\n${note.content}\n\n---\nÚltima atualização: ${formattedDate}`;
    
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [note, formattedDate]);

  return (
    <div className={`p-5 rounded-lg shadow-lg flex flex-col h-full transition-all duration-300 hover:shadow-xl ${note.color} relative overflow-hidden`}>
      <div className={`absolute top-0 left-0 h-2 w-full ${accentColor}`}></div>
      <h3 className="text-xl font-semibold text-slate-100 mb-2 truncate pt-2">{note.title}</h3>
      <p className="text-slate-300 text-sm mb-4 flex-grow whitespace-pre-wrap break-words overflow-y-auto max-h-40 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
        {note.content}
      </p>
      <p className="text-xs text-slate-400 mb-3 self-start">
        Última atualização: {formattedDate}
      </p>
      <div className="mt-auto flex flex-wrap justify-end gap-x-2 gap-y-1 border-t border-slate-700/50 pt-3">
        <Button onClick={handleDownload} variant="ghost" size="sm" className="focus:ring-offset-transparent text-sky-400 hover:text-sky-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Baixar
        </Button>
        <Button onClick={onEdit} variant="ghost" size="sm" className="focus:ring-offset-transparent">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
          </svg>
          Editar
        </Button>
        <Button onClick={onDelete} variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-slate-700 focus:ring-offset-transparent">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c1.153 0 2.242.078 3.223.224M5 5a2.25 2.25 0 012.25-2.25h9.75A2.25 2.25 0 0119 5m-9 1P9 5" />
          </svg>
          Excluir
        </Button>
      </div>
    </div>
  );
};

export default NoteCard;