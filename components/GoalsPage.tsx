import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Goal } from '../types';
import { PencilIcon, TrashIcon, PlusIcon } from './icons';
import AddGoalModal from './modals/AddGoalModal';
import ConfirmationModal from './modals/ConfirmationModal';

const GoalCard: React.FC<{ goal: Goal; onEdit: (goal: Goal) => void; onDelete: (goalId: string) => void; }> = ({ goal, onEdit, onDelete }) => {
  const progress = goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0;
  const formatCurrency = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className="bg-navy-800 p-6 rounded-2xl border border-navy-700 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-light-text">{goal.name}</h3>
          <p className="text-sm text-medium-text">{goal.description}</p>
        </div>
        <div className="flex space-x-2">
            <button onClick={() => onEdit(goal)} className="text-medium-text hover:text-primary"><PencilIcon className="w-5 h-5" /></button>
            <button onClick={() => onDelete(goal.id)} className="text-medium-text hover:text-expense"><TrashIcon className="w-5 h-5" /></button>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-baseline mb-1">
          <p className="text-sm text-light-text">{formatCurrency(goal.currentAmount)} / <span className="text-medium-text">{formatCurrency(goal.targetAmount)}</span></p>
          <p className="text-sm text-primary font-bold">{progress.toFixed(0)}%</p>
        </div>
        <div className="w-full bg-navy-900 rounded-full h-2.5">
          <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress > 100 ? 100 : progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};


const GoalsPage: React.FC = () => {
    const { goals, deleteGoal } = useAppContext();
    const [isAddGoalModalOpen, setAddGoalModalOpen] = useState(false);
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
    const [goalToEdit, setGoalToEdit] = useState<Goal | null>(null);
    const [goalToDelete, setGoalToDelete] = useState<string | null>(null);

    const handleOpenAddModal = () => {
        setGoalToEdit(null);
        setAddGoalModalOpen(true);
    };

    const handleOpenEditModal = (goal: Goal) => {
        setGoalToEdit(goal);
        setAddGoalModalOpen(true);
    }
    
    const handleOpenDeleteConfirm = (goalId: string) => {
        setGoalToDelete(goalId);
        setConfirmModalOpen(true);
    }
    
    const handleDeleteGoal = () => {
        if (goalToDelete) {
            deleteGoal(goalToDelete);
        }
        setConfirmModalOpen(false);
        setGoalToDelete(null);
    }

    return (
        <div className="p-4 md:p-8 space-y-6">
            <header className="flex flex-wrap justify-between items-center gap-4 py-4">
                <h1 className="text-3xl font-bold text-light-text">Minhas Metas</h1>
                <button 
                    onClick={handleOpenAddModal}
                    className="flex items-center space-x-2 bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-hover"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Nova Meta</span>
                </button>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goals.map(goal => (
                    <GoalCard 
                        key={goal.id} 
                        goal={goal} 
                        onEdit={handleOpenEditModal}
                        onDelete={handleOpenDeleteConfirm}
                    />
                ))}
            </div>

            {goals.length === 0 && (
                <div className="text-center py-16 bg-navy-800 rounded-2xl border border-navy-700">
                    <p className="text-medium-text">Você ainda não tem nenhuma meta.</p>
                    <button onClick={handleOpenAddModal} className="mt-4 text-primary font-semibold">
                        Crie sua primeira meta!
                    </button>
                </div>
            )}

            <AddGoalModal 
                isOpen={isAddGoalModalOpen}
                onClose={() => setAddGoalModalOpen(false)}
                goalToEdit={goalToEdit}
            />

            <ConfirmationModal 
                isOpen={isConfirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                onConfirm={handleDeleteGoal}
                title="Confirmar Exclusão"
                message="Você tem certeza que deseja excluir esta meta? Esta ação não pode ser desfeita."
            />
        </div>
    );
};

export default GoalsPage;