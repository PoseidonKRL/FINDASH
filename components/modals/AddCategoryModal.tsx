import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { TransactionType } from '../../types';
import { XMarkIcon, ICON_MAP } from '../icons';
import { useTheme } from '../../context/ThemeContext';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ isOpen, onClose }) => {
  const { addCategory } = useAppContext();
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [selectedIcon, setSelectedIcon] = useState('ShoppingCartIcon');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !selectedIcon) return;
    
    addCategory({
      name,
      type,
      icon: selectedIcon,
    });
    
    onClose();
    setName('');
    setType(TransactionType.EXPENSE);
    setSelectedIcon('ShoppingCartIcon');
  };
  
  const iconList = Object.keys(ICON_MAP);

  if (!isOpen) return null;

  const styles = {
    dark: {
        modalBg: 'bg-dark-blue-card border-dark-blue-border',
        inputBg: 'bg-dark-blue-bg border-dark-blue-border focus:ring-primary-blue focus:border-primary-blue',
        primaryButton: 'bg-primary-blue text-white hover:bg-primary-blue-hover',
        secondaryButton: 'bg-dark-blue-border hover:bg-dark-blue-border/80',
        controlBg: 'bg-dark-blue-bg',
        hoverColor: 'hover:bg-dark-blue-border',
        expenseButton: 'bg-expense-red text-white',
        incomeButton: 'bg-income-green text-white',
        iconActive: 'bg-primary-blue text-white',
        iconInactive: 'bg-dark-blue-card text-medium-text'
    },
    neon: {
        modalBg: 'bg-card-bg border-border-color',
        inputBg: 'bg-dark-bg border-border-color focus:ring-neon-cyan focus:border-neon-cyan',
        primaryButton: 'bg-neon-cyan text-black hover:bg-neon-cyan/80',
        secondaryButton: 'bg-border-color hover:bg-border-color/80',
        controlBg: 'bg-dark-bg',
        hoverColor: 'hover:bg-border-color',
        expenseButton: 'bg-neon-pink text-white',
        incomeButton: 'bg-neon-green text-black',
        iconActive: 'bg-neon-cyan text-black',
        iconInactive: 'bg-card-bg text-medium-text'
    },
     minimal: {
        modalBg: 'bg-minimal-card border-minimal-border',
        inputBg: 'bg-gray-50 border-minimal-border focus:ring-minimal-accent focus:border-minimal-accent',
        primaryButton: 'bg-minimal-accent text-white',
        secondaryButton: 'bg-gray-200 hover:bg-gray-300',
        controlBg: 'bg-gray-100',
        hoverColor: 'hover:bg-gray-200',
        expenseButton: 'bg-minimal-expense text-white',
        incomeButton: 'bg-minimal-income text-white',
        iconActive: 'bg-minimal-accent text-white',
        iconInactive: 'bg-white text-minimal-medium-text'
    },
    brutalist: {
        modalBg: 'brutalist-card bg-white',
        inputBg: 'bg-white border-brutalist-border focus:ring-brutalist-accent focus:border-brutalist-accent',
        primaryButton: 'brutalist-button bg-brutalist-accent text-white',
        secondaryButton: 'brutalist-button bg-gray-200',
        controlBg: 'bg-white border border-black',
        hoverColor: 'hover:bg-yellow-200',
        expenseButton: 'brutalist-button bg-brutalist-expense text-white',
        incomeButton: 'brutalist-button bg-brutalist-income text-white',
        iconActive: 'brutalist-button bg-brutalist-accent text-white',
        iconInactive: 'brutalist-button bg-white text-brutalist-text'
    },
    glass: {
        modalBg: 'bg-white/10 border-white/20 backdrop-blur-md',
        inputBg: 'bg-white/5 border-white/10 focus:ring-glass-accent focus:border-glass-accent',
        primaryButton: 'bg-glass-accent text-black',
        secondaryButton: 'bg-white/10 hover:bg-white/20',
        controlBg: 'bg-white/5',
        hoverColor: 'hover:bg-white/20',
        expenseButton: 'bg-expense-red text-white',
        incomeButton: 'bg-income-green text-white',
        iconActive: 'bg-glass-accent text-black',
        iconInactive: 'bg-white/10 text-medium-text'
    },
    cyberpunk: {
        modalBg: 'bg-cyber-card border-cyber-border',
        inputBg: 'bg-cyber-bg border-cyber-border focus:ring-cyber-accent focus:border-cyber-accent',
        primaryButton: 'bg-cyber-accent text-black',
        secondaryButton: 'bg-cyber-border hover:bg-cyber-border/80',
        controlBg: 'bg-cyber-bg',
        hoverColor: 'hover:bg-cyber-border',
        expenseButton: 'bg-cyber-expense text-white',
        incomeButton: 'bg-cyber-income text-black',
        iconActive: 'bg-cyber-accent text-black',
        iconInactive: 'bg-cyber-card text-medium-text'
    }
  }[theme];

  const textClass = (theme === 'minimal' || theme === 'brutalist') ? 'text-minimal-text' : 'text-light-text';
  const mediumTextClass = (theme === 'minimal' || theme === 'brutalist') ? 'text-minimal-medium-text' : 'text-medium-text';


  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 transition-opacity duration-300"
         onClick={onClose}
    >
      <div className={`rounded-2xl p-6 w-full max-w-md m-4 border shadow-2xl transition-transform duration-300 transform scale-95 ${isOpen && '!scale-100'} ${styles.modalBg}`}
           onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-bold ${textClass}`}>Adicionar Categoria</h2>
          <button onClick={onClose} className={`${mediumTextClass} hover:${textClass}`}>
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className={`block text-sm font-medium ${mediumTextClass} mb-1`}>Nome</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className={`mt-1 block w-full border rounded-lg shadow-sm py-2 px-3 ${textClass} focus:outline-none focus:ring-2 ${styles.inputBg}`} required />
            </div>

            <div>
                <label className={`block text-sm font-medium ${mediumTextClass} mb-1`}>Tipo</label>
                <div className={`grid grid-cols-2 gap-2 p-1 rounded-lg ${styles.controlBg}`}>
                    <button type="button" onClick={() => setType(TransactionType.EXPENSE)} className={`py-2 rounded-md font-semibold text-sm transition-colors ${type === TransactionType.EXPENSE ? styles.expenseButton : `${mediumTextClass} ${styles.hoverColor}`}`}>
                        Despesa
                    </button>
                    <button type="button" onClick={() => setType(TransactionType.INCOME)} className={`py-2 rounded-md font-semibold text-sm transition-colors ${type === TransactionType.INCOME ? styles.incomeButton : `${mediumTextClass} ${styles.hoverColor}`}`}>
                        Receita
                    </button>
                </div>
            </div>

            <div>
                <label className={`block text-sm font-medium ${mediumTextClass} mb-1`}>Ícone</label>
                <div className={`grid grid-cols-6 sm:grid-cols-8 gap-2 p-2 rounded-lg max-h-32 overflow-y-auto ${styles.controlBg}`}>
                    {iconList.map(iconKey => {
                        const IconComponent = ICON_MAP[iconKey];
                        const isActive = selectedIcon === iconKey;
                        return (
                            <button
                                type="button"
                                key={iconKey}
                                onClick={() => setSelectedIcon(iconKey)}
                                className={`flex items-center justify-center p-2 rounded-lg transition-colors ${isActive ? styles.iconActive : `${styles.iconInactive} ${styles.hoverColor}`}`}
                            >
                                <IconComponent className="w-6 h-6" />
                            </button>
                        )
                    })}
                </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onClose} className={`px-4 py-2 text-sm font-medium ${textClass} rounded-lg ${styles.secondaryButton}`}>
                Cancelar
                </button>
                <button type="submit" className={`px-4 py-2 text-sm font-medium rounded-lg ${styles.primaryButton}`}>
                Salvar Categoria
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;