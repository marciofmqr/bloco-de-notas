
import React from 'react';
import Button from './Button';

interface HeaderProps {
  onAddNoteClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddNoteClick }) => {
  return (
    <header className="bg-sky-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 md:px-8 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 inline-block mr-2 align-text-bottom">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
          Bloco de Notas Personalizado
        </h1>
        <Button onClick={onAddNoteClick} variant="primary" className="bg-sky-500 hover:bg-sky-600 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Adicionar Nota
        </Button>
      </div>
    </header>
  );
};

export default Header;