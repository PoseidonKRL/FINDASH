import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Goal } from '../types';
import { PencilIcon, TrashIcon, PlusIcon } from './icons';
import AddGoalModal from './modals/AddGoalModal';
import ConfirmationModal from './modals/ConfirmationModal';
import { useTheme } from '../context/ThemeContext';

const GoalCard: React.FC<{ goal: Goal; onEdit: (goal: Goal) => void; onDelete: (goalId: string) => void; }> = ({ goal, onEdit, onDelete }) => {
  const { theme } = useTheme();
  const progress = goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0;
  const formatCurrency = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  
    const styles = {
        dark: {
            card: 'bg-dark-blue-card border-dark-blue-border',
            progressBarBg: 'bg-dark-blue-bg',
            progressFill: 'bg-primary-blue',
            primaryText: 'text-primary-blue',
            expenseTextHover: 'hover:text-expense-red'
        },
        neon: {
            card: 'bg-card-bg border-border-color',
            progressBarBg: 'bg-dark-bg',
            progressFill: 'bg-neon-cyan',
            primaryText: 'text-neon-cyan',
            expenseTextHover: 'hover:text-neon-pink'
        },
        minimal: {
            card: 'bg-minimal-card border-minimal-border',
            progressBarBg: 'bg-gray-200',
            progressFill: 'bg-minimal-accent',
            primaryText: 'text-minimal-accent',
            expenseTextHover: 'hover:text-minimal-expense'
        },
        brutalist: {
            card: 'brutalist-card',
            progressBarBg: 'bg-brutalist-bg border border-brutalist-border',
            progressFill: 'bg-brutalist-accent',
            primaryText: 'text-brutalist-accent',
            expenseTextHover: 'hover:text-brutalist-expense'
        },
        glass: {
            card: 'bg-white/10 border-white/20 backdrop-blur-md',
            progressBarBg: 'bg-white/10',
            progressFill: 'bg-glass-accent',
            primaryText: 'text-glass-accent',
            expenseTextHover: 'hover:text-expense-red'
        },
        cyberpunk: {
            card: 'bg-cyber-card border-cyber-border',
            progressBarBg: 'bg-cyber-bg',
            progressFill: 'bg-cyber-accent',
            primaryText: 'text-cyber-accent',
            expenseTextHover: 'hover:text-cyber-expense'
        }
    }[theme];

    const textClass = (theme === 'minimal' || theme === 'brutalist') ? 'text-minimal-text' : 'text-light-text';
    const mediumTextClass = (theme === 'minimal' || theme === 'brutalist') ? 'text-minimal-medium-text' : 'text-medium-text';


  return (
    <div className={`p-6 rounded-2xl border space-y-4 ${styles.card}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`text-lg font-bold ${textClass}`}>{goal.name}</h3>
          <p className={`text-sm ${mediumTextClass}`}>{goal.description}</p>
        </div>
        <div className="flex space-x-2">
            <button onClick={() => onEdit(goal)} className={`${mediumTextClass} hover:${styles.primaryText}`}><PencilIcon className="w-5 h-5" /></button>
            <button onClick={() => onDelete(goal.id)} className={`${mediumTextClass} ${styles.expenseTextHover}`}><TrashIcon className="w-5 h-5" /></button>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-baseline mb-1">
          <p className={`text-sm ${textClass}`}>{formatCurrency(goal.currentAmount)} / <span className={`${mediumTextClass}`}>{formatCurrency(goal.targetAmount)}</span></p>
          <p className={`text-sm font-bold ${styles.primaryText}`}>{progress.toFixed(0)}%</p>
        </div>
        <div className={`w-full rounded-full h-2.5 ${styles.progressBarBg}`}>
          <div className={`${styles.progressFill} h-2.5 rounded-full`} style={{ width: `${progress > 100 ? 100 : progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};


const GoalsPage: React.FC = () => {
    const { goals, deleteGoal } = useAppContext();
    const { theme } = useTheme();
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
    
    const styles = {
        dark: {
            card: 'bg-dark-blue-card border-dark-blue-border',
            button: 'bg-primary-blue text-white hover:bg-primary-blue-hover',
            accentText: 'text-primary-blue'
        },
        neon: {
            card: 'bg-card-bg border-border-color',
            button: 'bg-neon-cyan text-black',
            accentText: 'text-neon-cyan'
        },
        minimal: {
            card: 'bg-minimal-card border-minimal-border',
            button: 'bg-minimal-accent text-white',
            accentText: 'text-minimal-accent'
        },
        brutalist: {
            card: 'brutalist-card',
            button: 'brutalist-button bg-brutalist-accent text-white',
            accentText: 'text-brutalist-accent'
        },
        glass: {
            card: 'bg-white/10 border-white/20 backdrop-blur-md',
            button: 'bg-glass-accent text-black',
            accentText: 'text-glass-accent'
        },
        cyberpunk: {
            card: 'bg-cyber-card border-cyber-border',
            button: 'bg-cyber-accent text-black',
            accentText: 'text-cyber-accent'
        }
    }[theme];

    const textClass = (theme === 'minimal' || theme === 'brutalist') ? 'text-minimal-text' : 'text-light-text';
    const mediumTextClass = (theme === 'minimal' || theme === 'brutalist') ? 'text-minimal-medium-text' : 'text-medium-text';

    return (
        <div className="p-4 md:p-8 space-y-6">
            <header className="flex flex-wrap justify-between items-center gap-4 py-4">
                <h1 className={`text-3xl font-bold ${textClass}`}>Minhas Metas</h1>
                <button 
                    onClick={handleOpenAddModal}
                    className={`flex items-center space-x-2 font-semibold px-4 py-2 rounded-lg ${styles.button}`}
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
                <div className={`text-center py-16 rounded-2xl border ${styles.card}`}>
                    <p className={`${mediumTextClass}`}>Você ainda não tem nenhuma meta.</p>
                    <button onClick={handleOpenAddModal} className={`mt-4 font-semibold ${styles.accentText}`}>
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