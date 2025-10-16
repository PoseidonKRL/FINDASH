import React from 'react';
import { XMarkIcon, ExclamationTriangleIcon } from '../icons';
import { useTheme } from '../../context/ThemeContext';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  const { theme } = useTheme();

  if (!isOpen) return null;

  const modalBg = theme === 'neon' ? 'bg-card-bg border-border-color' : 'bg-dark-blue-card border-dark-blue-border';
  const secondaryButton = theme === 'neon' ? 'bg-border-color hover:bg-border-color/80' : 'bg-dark-blue-border hover:bg-dark-blue-border/80';
  const confirmButton = theme === 'neon' ? 'bg-neon-pink text-white hover:bg-neon-pink/80' : 'bg-expense-red text-white hover:bg-red-500';
  const iconColor = theme === 'neon' ? 'text-neon-pink' : 'text-expense-red';

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className={`rounded-2xl p-6 w-full max-w-sm m-4 border shadow-2xl transition-transform duration-300 transform scale-95 ${isOpen && '!scale-100'} ${modalBg}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="text-center">
            <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4 ${theme === 'neon' ? 'bg-neon-pink/10' : 'bg-expense-red/10'}`}>
                <ExclamationTriangleIcon className={`h-6 w-6 ${iconColor}`} aria-hidden="true" />
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
                className={`px-4 py-2 text-sm font-medium text-light-text rounded-lg w-full ${secondaryButton}`}
            >
                Cancelar
            </button>
            <button 
                type="button" 
                onClick={onConfirm} 
                className={`px-4 py-2 text-sm font-medium rounded-lg w-full ${confirmButton}`}
            >
                Confirmar
            </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;