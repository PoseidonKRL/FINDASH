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

  const styles = {
    dark: {
        modalBg: 'bg-dark-blue-card border-dark-blue-border',
        secondaryButton: 'bg-dark-blue-border hover:bg-dark-blue-border/80',
        confirmButton: 'bg-expense-red text-white hover:bg-red-500',
        iconColor: 'text-expense-red',
        iconBg: 'bg-expense-red/10'
    },
    neon: {
        modalBg: 'bg-card-bg border-border-color',
        secondaryButton: 'bg-border-color hover:bg-border-color/80',
        confirmButton: 'bg-neon-pink text-white hover:bg-neon-pink/80',
        iconColor: 'text-neon-pink',
        iconBg: 'bg-neon-pink/10'
    },
    minimal: {
        modalBg: 'bg-minimal-card border-minimal-border',
        secondaryButton: 'bg-gray-200 hover:bg-gray-300',
        confirmButton: 'bg-minimal-expense text-white hover:bg-red-600',
        iconColor: 'text-minimal-expense',
        iconBg: 'bg-minimal-expense/10'
    },
    brutalist: {
        modalBg: 'brutalist-card bg-white',
        secondaryButton: 'brutalist-button bg-gray-200',
        confirmButton: 'brutalist-button bg-brutalist-expense text-white',
        iconColor: 'text-brutalist-expense',
        iconBg: 'bg-brutalist-expense/10'
    },
    glass: {
        modalBg: 'bg-white/10 border-white/20 backdrop-blur-md',
        secondaryButton: 'bg-white/10 hover:bg-white/20',
        confirmButton: 'bg-expense-red text-white hover:bg-red-500',
        iconColor: 'text-expense-red',
        iconBg: 'bg-expense-red/10'
    },
    cyberpunk: {
        modalBg: 'bg-cyber-card border-cyber-border',
        secondaryButton: 'bg-cyber-border hover:bg-cyber-border/80',
        confirmButton: 'bg-cyber-expense text-white hover:bg-red-500',
        iconColor: 'text-cyber-expense',
        iconBg: 'bg-cyber-expense/10'
    }
  }[theme];

  const textClass = (theme === 'minimal' || theme === 'brutalist') ? 'text-minimal-text' : 'text-light-text';
  const mediumTextClass = (theme === 'minimal' || theme === 'brutalist') ? 'text-minimal-medium-text' : 'text-medium-text';


  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className={`rounded-2xl p-6 w-full max-w-sm m-4 border shadow-2xl transition-transform duration-300 transform scale-95 ${isOpen && '!scale-100'} ${styles.modalBg}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="text-center">
            <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4 ${styles.iconBg}`}>
                <ExclamationTriangleIcon className={`h-6 w-6 ${styles.iconColor}`} aria-hidden="true" />
            </div>
            <h3 className={`text-lg leading-6 font-bold ${textClass}`} id="modal-title">
                {title}
            </h3>
            <div className="mt-2">
                <p className={`text-sm ${mediumTextClass}`}>
                    {message}
                </p>
            </div>
        </div>
        <div className="mt-5 sm:mt-6 flex justify-center space-x-3">
            <button 
                type="button" 
                onClick={onClose} 
                className={`px-4 py-2 text-sm font-medium ${textClass} rounded-lg w-full ${styles.secondaryButton}`}
            >
                Cancelar
            </button>
            <button 
                type="button" 
                onClick={onConfirm} 
                className={`px-4 py-2 text-sm font-medium rounded-lg w-full ${styles.confirmButton}`}
            >
                Confirmar
            </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;