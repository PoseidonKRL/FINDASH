import React from 'react';
import { XMarkIcon, ExclamationTriangleIcon } from '../icons';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className={`bg-navy-800 rounded-2xl p-6 w-full max-w-sm m-4 border border-navy-700 shadow-2xl transition-transform duration-300 transform scale-95 ${isOpen && '!scale-100'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-500/10 mb-4">
                <ExclamationTriangleIcon className="h-6 w-6 text-expense" aria-hidden="true" />
            </div>
            <h3 className="text-lg leading-6 font-bold text-light-text" id="modal-title">
                {title}
            </h3>
            <div className="mt-2">
                <p className="text-sm text-medium-text">
                    {message}
                </p>
            </div>
        </div>
        <div className="mt-5 sm:mt-6 flex justify-center space-x-3">
            <button 
                type="button" 
                onClick={onClose} 
                className="px-4 py-2 text-sm font-medium text-light-text bg-navy-700 rounded-lg hover:bg-navy-700/80 w-full"
            >
                Cancelar
            </button>
            <button 
                type="button" 
                onClick={onConfirm} 
                className="px-4 py-2 text-sm font-medium text-white bg-expense rounded-lg hover:bg-red-500 w-full"
            >
                Confirmar
            </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;