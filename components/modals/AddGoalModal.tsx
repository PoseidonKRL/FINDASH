import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { XMarkIcon } from '../icons';
import { Goal } from '../../types';

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  goalToEdit?: Goal | null;
}

const AddGoalModal: React.FC<AddGoalModalProps> = ({ isOpen, onClose, goalToEdit }) => {
  const { addGoal, updateGoal } = useAppContext();
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

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 transition-opacity duration-300"
         onClick={onClose}
    >
      <div className={`bg-navy-800 rounded-2xl p-6 w-full max-w-sm m-4 border border-navy-700 shadow-2xl transition-transform duration-300 transform scale-95 ${isOpen && '!scale-100'}`}
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
              className="mt-1 block w-full bg-navy-900 border border-navy-700 rounded-lg shadow-sm py-2 px-3 text-light-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
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
              className="mt-1 block w-full bg-navy-900 border border-navy-700 rounded-lg shadow-sm py-2 px-3 text-light-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
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
                    className="mt-1 block w-full bg-navy-900 border border-navy-700 rounded-lg shadow-sm py-2 px-3 text-light-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
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
                className="mt-1 block w-full bg-navy-900 border border-navy-700 rounded-lg shadow-sm py-2 px-3 text-light-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="R$0,00"
                required
                />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-light-text bg-navy-700 rounded-lg hover:bg-navy-700/80">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGoalModal;