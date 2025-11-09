import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6 transform transition-all duration-300 animate-scaleIn"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3 mb-4">
          <h3 id="modal-title" className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
          <button onClick={onClose} aria-label="Close modal" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <i className="fas fa-times text-2xl"></i>
          </button>
        </div>
        <div>
          {children}
        </div>
      </div>
       <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};
