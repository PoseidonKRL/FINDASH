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

  const modalBg = theme === 'neon' ? 'bg-card-bg border-border-color' : 'bg-dark-blue-card border-dark-blue-border';
  const inputBg = theme === 'neon' ? 'bg-dark-bg border-border-color focus:ring-neon-cyan focus:border-neon-cyan' : 'bg-dark-blue-bg border-dark-blue-border focus:ring-primary-blue focus:border-primary-blue';
  const primaryButton = theme === 'neon' ? 'bg-neon-cyan text-black' : 'bg-primary-blue text-white hover:bg-primary-blue-hover';
  const secondaryButton = theme === 'neon' ? 'bg-border-color hover:bg-border-color/80' : 'bg-dark-blue-border hover:bg-dark-blue-border/80';

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 transition-opacity duration-300"
         onClick={onClose}
    >
      <div className={`rounded-2xl p-6 w-full max-w-sm m-4 border shadow-2xl transition-transform duration-300 transform scale-95 ${isOpen && '!scale-100'} ${modalBg}`}
           onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-light-text">{isEditing ? 'Editar Meta' : 'Adicionar Meta'}</h2>
          <button onClick={onClose} className="text-medium-text hover:text-light-text">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-medium-text mb-1">Nome da Meta</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`mt-1 block w-full border rounded-lg shadow-sm py-2 px-3 text-light-text focus:outline-none focus:ring-2 ${inputBg}`}
              placeholder="Ex: Viagem para a praia"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-medium-text mb-1">Descrição</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`mt-1 block w-full border rounded-lg shadow-sm py-2 px-3 text-light-text focus:outline-none focus:ring-2 ${inputBg}`}
              placeholder="Detalhes da meta (opcional)"
            />
          </div>
           <div className="grid grid-cols-2 gap-4">
            {isEditing && (
                <div>
                    <label htmlFor="currentAmount" className="block text-sm font-medium text-medium-text mb-1">Valor Atual</label>
                    <input
                    type="number"
                    id="currentAmount"
                    value={currentAmount}
                    onChange={(e) => setCurrentAmount(e.target.value)}
                    className={`mt-1 block w-full border rounded-lg shadow-sm py-2 px-3 text-light-text focus:outline-none focus:ring-2 ${inputBg}`}
                    placeholder="R$0,00"
                    required
                    />
                </div>
            )}
            <div className={isEditing ? 'col-span-1' : 'col-span-2'}>
                <label htmlFor="targetAmount" className="block text-sm font-medium text-medium-text mb-1">Valor Alvo</label>
                <input
                type="number"
                id="targetAmount"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                className={`mt-1 block w-full border rounded-lg shadow-sm py-2 px-3 text-light-text focus:outline-none focus:ring-2 ${inputBg}`}
                placeholder="R$0,00"
                required
                />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className={`px-4 py-2 text-sm font-medium text-light-text rounded-lg ${secondaryButton}`}>
              Cancelar
            </button>
            <button type="submit" className={`px-4 py-2 text-sm font-medium rounded-lg ${primaryButton}`}>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGoalModal;