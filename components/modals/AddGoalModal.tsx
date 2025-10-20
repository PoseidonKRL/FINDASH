import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { XMarkIcon } from '../icons';
import { Goal } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  goalToEdit?: Goal | null;
}

const AddGoalModal: React.FC<AddGoalModalProps> = ({ isOpen, onClose, goalToEdit }) => {
  const { addGoal, updateGoal } = useAppContext();
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');

  const isEditing = !!goalToEdit;

  useEffect(() => {
    if (isOpen) {
      if (isEditing && goalToEdit) {
        setName(goalToEdit.name);
        setDescription(goalToEdit.description);
        setTargetAmount(String(goalToEdit.targetAmount));
        setCurrentAmount(String(goalToEdit.currentAmount));
      } else {
        setName('');
        setDescription('');
        setTargetAmount('');
        setCurrentAmount('0');
      }
    }
  }, [goalToEdit, isOpen, isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !targetAmount) return;

    if (isEditing && goalToEdit) {
      updateGoal({
        ...goalToEdit,
        name,
        description,
        targetAmount: parseFloat(targetAmount),
        currentAmount: parseFloat(currentAmount || '0'),
      });
    } else {
      addGoal({
        name,
        description,
        targetAmount: parseFloat(targetAmount),
        currentAmount: 0,
      });
    }
    onClose();
  };

  if (!isOpen) return null;

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
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 transition-opacity duration-300"
         onClick={onClose}
    >
      <div className={`rounded-2xl p-6 w-full max-w-sm m-4 border shadow-2xl transition-transform duration-300 transform scale-95 ${isOpen && '!scale-100'} ${styles.modalBg}`}
           onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-bold ${textClass}`}>{isEditing ? 'Editar Meta' : 'Adicionar Meta'}</h2>
          <button onClick={onClose} className={`${mediumTextClass} hover:${textClass}`}>
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className={`block text-sm font-medium ${mediumTextClass} mb-1`}>Nome da Meta</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`mt-1 block w-full border rounded-lg shadow-sm py-2 px-3 ${textClass} focus:outline-none focus:ring-2 ${styles.inputBg}`}
              placeholder="Ex: Viagem para a praia"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className={`block text-sm font-medium ${mediumTextClass} mb-1`}>Descrição</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`mt-1 block w-full border rounded-lg shadow-sm py-2 px-3 ${textClass} focus:outline-none focus:ring-2 ${styles.inputBg}`}
              placeholder="Detalhes da meta (opcional)"
            />
          </div>
           <div className="grid grid-cols-2 gap-4">
            {isEditing && (
                <div>
                    <label htmlFor="currentAmount" className={`block text-sm font-medium ${mediumTextClass} mb-1`}>Valor Atual</label>
                    <input
                    type="number"
                    id="currentAmount"
                    value={currentAmount}
                    onChange={(e) => setCurrentAmount(e.target.value)}
                    className={`mt-1 block w-full border rounded-lg shadow-sm py-2 px-3 ${textClass} focus:outline-none focus:ring-2 ${styles.inputBg}`}
                    placeholder="R$0,00"
                    required
                    />
                </div>
            )}
            <div className={isEditing ? 'col-span-1' : 'col-span-2'}>
                <label htmlFor="targetAmount" className={`block text-sm font-medium ${mediumTextClass} mb-1`}>Valor Alvo</label>
                <input
                type="number"
                id="targetAmount"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                className={`mt-1 block w-full border rounded-lg shadow-sm py-2 px-3 ${textClass} focus:outline-none focus:ring-2 ${styles.inputBg}`}
                placeholder="R$0,00"
                required
                />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className={`px-4 py-2 text-sm font-medium ${textClass} rounded-lg ${styles.secondaryButton}`}>
              Cancelar
            </button>
            <button type="submit" className={`px-4 py-2 text-sm font-medium rounded-lg ${styles.primaryButton}`}>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGoalModal;