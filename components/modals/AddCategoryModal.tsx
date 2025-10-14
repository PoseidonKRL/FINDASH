import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { TransactionType } from '../../types';
import { XMarkIcon, ICON_MAP } from '../icons';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ isOpen, onClose }) => {
  const { addCategory } = useAppContext();
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 transition-opacity duration-300"
         onClick={onClose}
    >
      <div className={`bg-navy-800 rounded-2xl p-6 w-full max-w-md m-4 border border-navy-700 shadow-2xl transition-transform duration-300 transform scale-95 ${isOpen && '!scale-100'}`}
           onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-light-text">Adicionar Categoria</h2>
          <button onClick={onClose} className="text-medium-text hover:text-light-text">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-medium-text mb-1">Nome</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full bg-navy-900 border border-navy-700 rounded-lg shadow-sm py-2 px-3 text-light-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" required />
            </div>

            <div>
                <label className="block text-sm font-medium text-medium-text mb-1">Tipo</label>
                <div className="grid grid-cols-2 gap-2 bg-navy-900 p-1 rounded-lg">
                    <button type="button" onClick={() => setType(TransactionType.EXPENSE)} className={`py-2 rounded-md font-semibold text-sm transition-colors ${type === TransactionType.EXPENSE ? 'bg-expense text-white' : 'text-medium-text hover:bg-navy-700'}`}>
                        Despesa
                    </button>
                    <button type="button" onClick={() => setType(TransactionType.INCOME)} className={`py-2 rounded-md font-semibold text-sm transition-colors ${type === TransactionType.INCOME ? 'bg-income text-white' : 'text-medium-text hover:bg-navy-700'}`}>
                        Receita
                    </button>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-medium-text mb-1">Ícone</label>
                <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 bg-navy-900 p-2 rounded-lg max-h-32 overflow-y-auto">
                    {iconList.map(iconKey => {
                        const IconComponent = ICON_MAP[iconKey];
                        const isActive = selectedIcon === iconKey;
                        return (
                            <button
                                type="button"
                                key={iconKey}
                                onClick={() => setSelectedIcon(iconKey)}
                                className={`flex items-center justify-center p-2 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'bg-navy-800 text-medium-text hover:bg-navy-700'}`}
                            >
                                <IconComponent className="w-6 h-6" />
                            </button>
                        )
                    })}
                </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-light-text bg-navy-700 rounded-lg hover:bg-navy-700/80">
                Cancelar
                </button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover">
                Salvar Categoria
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
