import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Transaction } from '../../types';
import { XMarkIcon } from '../icons';
import { useTheme } from '../../context/ThemeContext';

interface DuplicateTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionToDuplicate: Transaction | null;
}

const DuplicateTransactionModal: React.FC<DuplicateTransactionModalProps> = ({ isOpen, onClose, transactionToDuplicate }) => {
  const { addTransaction } = useAppContext();
  const { theme } = useTheme();
  const [newDate, setNewDate] = useState('');

  useEffect(() => {
    if (transactionToDuplicate) {
      const originalDate = new Date(transactionToDuplicate.date);
      // Default to next month
      originalDate.setMonth(originalDate.getMonth() + 1);
      // Format to YYYY-MM-DD for the date input
      const year = originalDate.getFullYear();
      const month = String(originalDate.getMonth() + 1).padStart(2, '0');
      const day = String(originalDate.getDate()).padStart(2, '0');
      setNewDate(`${year}-${month}-${day}`);
    }
  }, [transactionToDuplicate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionToDuplicate || !newDate) return;

    // Create a new transaction object, but without the id
    const newTransactionData: Omit<Transaction, 'id'> = {
      ...transactionToDuplicate,
      date: new Date(newDate).toISOString(),
    };
    
    // The id will be created by addTransaction
    const { id, ...rest } = newTransactionData as Transaction;

    addTransaction(rest);
    onClose();
  };

  if (!isOpen || !transactionToDuplicate) return null;
  
  const styles = {
    dark: {
        modalBg: 'bg-dark-blue-card border-dark-blue-border',
        inputBg: 'bg-dark-blue-bg border-dark-blue-border focus:ring-primary-blue focus:border-primary-blue',
        primaryButton: 'bg-primary-blue text-white hover:bg-primary-blue-hover',
        secondaryButton: 'bg-dark-blue-border hover:bg-dark-blue-border/80',
    },
    neon: {
        modalBg: 'bg-card-bg border-border-color',
        inputBg: 'bg-dark-bg border-border-color focus:ring-neon-cyan focus:border-neon-cyan',
        primaryButton: 'bg-neon-cyan text-black',
        secondaryButton: 'bg-border-color hover:bg-border-color/80',
    },
    minimal: {
        modalBg: 'bg-minimal-card border-minimal-border',
        inputBg: 'bg-gray-50 border-minimal-border focus:ring-minimal-accent focus:border-minimal-accent',
        primaryButton: 'bg-minimal-accent text-white',
        secondaryButton: 'bg-gray-200 hover:bg-gray-300',
    },
    brutalist: {
        modalBg: 'brutalist-card bg-white',
        inputBg: 'bg-white border-brutalist-border focus:ring-brutalist-accent focus:border-brutalist-accent',
        primaryButton: 'brutalist-button bg-brutalist-accent text-white',
        secondaryButton: 'brutalist-button bg-gray-200',
    },
    glass: {
        modalBg: 'bg-white/10 border-white/20 backdrop-blur-md',
        inputBg: 'bg-white/5 border-white/10 focus:ring-glass-accent focus:border-glass-accent',
        primaryButton: 'bg-glass-accent text-black',
        secondaryButton: 'bg-white/10 hover:bg-white/20',
    },
    cyberpunk: {
        modalBg: 'bg-cyber-card border-cyber-border',
        inputBg: 'bg-cyber-bg border-cyber-border focus:ring-cyber-accent focus:border-cyber-accent',
        primaryButton: 'bg-cyber-accent text-black',
        secondaryButton: 'bg-cyber-border hover:bg-cyber-border/80',
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
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-bold ${textClass}`}>Duplicar Transação</h2>
          <button onClick={onClose} className={`${mediumTextClass} hover:${textClass}`}>
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <p className={`${mediumTextClass} mb-4`}>
          Duplicar "<span className={`font-semibold ${textClass}`}>{transactionToDuplicate.description}</span>" para uma nova data.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="newDate" className={`block text-sm font-medium ${mediumTextClass} mb-1`}>Nova Data</label>
            <input
              type="date"
              id="newDate"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className={`mt-1 block w-full border rounded-lg shadow-sm py-2 px-3 ${textClass} focus:outline-none focus:ring-2 ${styles.inputBg}`}
              required
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className={`px-4 py-2 text-sm font-medium ${textClass} rounded-lg ${styles.secondaryButton}`}>
              Cancelar
            </button>
            <button type="submit" className={`px-4 py-2 text-sm font-medium rounded-lg ${styles.primaryButton}`}>
              Duplicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DuplicateTransactionModal;