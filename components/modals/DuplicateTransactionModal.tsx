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

  const modalBg = theme === 'neon' ? 'bg-card-bg border-border-color' : 'bg-dark-blue-card border-dark-blue-border';
  const inputBg = theme === 'neon' ? 'bg-dark-bg border-border-color focus:ring-neon-cyan focus:border-neon-cyan' : 'bg-dark-blue-bg border-dark-blue-border focus:ring-primary-blue focus:border-primary-blue';
  const primaryButton = theme === 'neon' ? 'bg-neon-cyan text-black' : 'bg-primary-blue text-white hover:bg-primary-blue-hover';
  const secondaryButton = theme === 'neon' ? 'bg-border-color hover:bg-border-color/80' : 'bg-dark-blue-border hover:bg-dark-blue-border/80';

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className={`rounded-2xl p-6 w-full max-w-sm m-4 border shadow-2xl transition-transform duration-300 transform scale-95 ${isOpen && '!scale-100'} ${modalBg}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-light-text">Duplicar Transação</h2>
          <button onClick={onClose} className="text-medium-text hover:text-light-text">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <p className="text-medium-text mb-4">
          Duplicar "<span className="font-semibold text-light-text">{transactionToDuplicate.description}</span>" para uma nova data.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="newDate" className="block text-sm font-medium text-medium-text mb-1">Nova Data</label>
            <input
              type="date"
              id="newDate"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className={`mt-1 block w-full border rounded-lg shadow-sm py-2 px-3 text-light-text focus:outline-none focus:ring-2 ${inputBg}`}
              required
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className={`px-4 py-2 text-sm font-medium text-light-text rounded-lg ${secondaryButton}`}>
              Cancelar
            </button>
            <button type="submit" className={`px-4 py-2 text-sm font-medium rounded-lg ${primaryButton}`}>
              Duplicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DuplicateTransactionModal;