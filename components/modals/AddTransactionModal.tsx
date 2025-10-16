import React, { useState, useEffect, useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Transaction, TransactionType, SubItem } from '../../types';
import { XMarkIcon, PlusIcon, TrashIcon, ChevronUpIcon, ChevronDownIcon } from '../icons';
import { useTheme } from '../../context/ThemeContext';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionToEdit?: Transaction | null;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose, transactionToEdit }) => {
  const { addTransaction, updateTransaction, categories } = useAppContext();
  const { theme } = useTheme();
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [subItems, setSubItems] = useState<SubItem[]>([{ id: `si${Date.now()}`, description: '', amount: 0 }]);

  const isEditing = !!transactionToEdit;

  const totalAmount = useMemo(() => {
    return subItems.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  }, [subItems]);

  const resetForm = () => {
    setType(TransactionType.EXPENSE);
    setDescription('');
    setCategoryId('');
    setDate(new Date().toISOString().split('T')[0]);
    setNotes('');
    setSubItems([{ id: `si${Date.now()}`, description: '', amount: 0 }]);
  };

  useEffect(() => {
    if (isOpen) {
        if (isEditing && transactionToEdit) {
            setType(transactionToEdit.type);
            setDescription(transactionToEdit.description);
            setCategoryId(transactionToEdit.categoryId);
            setDate(new Date(transactionToEdit.date).toISOString().split('T')[0]);
            setNotes(transactionToEdit.notes || '');
            if (transactionToEdit.subItems && transactionToEdit.subItems.length > 0) {
              setSubItems(transactionToEdit.subItems);
            } else {
              setSubItems([{ id: `si${Date.now()}`, description: '', amount: transactionToEdit.amount }]);
            }
        } else {
            resetForm();
        }
    }
  }, [transactionToEdit, isOpen, isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalAmount <= 0 || !description || !categoryId || !date) return;
    
    const transactionData = {
        amount: totalAmount,
        description,
        categoryId,
        type,
        notes,
        subItems: subItems.filter(item => item.description && item.amount > 0),
        date: new Date(date + 'T00:00:00').toISOString()
    };

    if (isEditing) {
        updateTransaction({ ...transactionData, id: transactionToEdit.id });
    } else {
        addTransaction(transactionData);
    }
    
    onClose();
  };

  const handleSubItemChange = (index: number, field: 'description' | 'amount', value: string) => {
    const newSubItems = [...subItems];
    newSubItems[index] = { 
      ...newSubItems[index], 
      [field]: field === 'amount' ? parseFloat(value) || 0 : value 
    };
    setSubItems(newSubItems);
  };
  
  const addSubItem = () => {
    setSubItems([...subItems, { id: `si${Date.now()}`, description: '', amount: 0 }]);
  };

  const removeSubItem = (index: number) => {
    if (subItems.length > 1) {
      const newSubItems = subItems.filter((_, i) => i !== index);
      setSubItems(newSubItems);
    }
  };
  
  const moveSubItem = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === subItems.length - 1) return;

    const newSubItems = [...subItems];
    const itemToMove = newSubItems[index];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    
    newSubItems[index] = newSubItems[swapIndex];
    newSubItems[swapIndex] = itemToMove;

    setSubItems(newSubItems);
  };

  const filteredCategories = categories.filter(c => c.type === type);

  if (!isOpen) return null;

  const modalBg = theme === 'neon' ? 'bg-card-bg border-border-color' : 'bg-dark-blue-card border-dark-blue-border';
  const inputBg = theme === 'neon' ? 'bg-dark-bg border-border-color focus:ring-neon-cyan focus:border-neon-cyan' : 'bg-dark-blue-bg border-dark-blue-border focus:ring-primary-blue focus:border-primary-blue';
  const subItemBg = theme === 'neon' ? 'bg-dark-bg' : 'bg-dark-blue-bg';
  const subItemInputBg = theme === 'neon' ? 'bg-card-bg border-border-color focus:ring-neon-cyan' : 'bg-dark-blue-card border-dark-blue-border focus:ring-primary-blue';
  const hoverColor = theme === 'neon' ? 'hover:bg-border-color' : 'hover:bg-dark-blue-border';
  const primaryButton = theme === 'neon' ? 'bg-neon-cyan text-black hover:bg-neon-cyan/80' : 'bg-primary-blue text-white hover:bg-primary-blue-hover';
  const secondaryButton = theme === 'neon' ? 'bg-border-color hover:bg-border-color/80' : 'bg-dark-blue-border hover:bg-dark-blue-border/80';
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 transition-opacity duration-300"
         onClick={onClose}
    >
      <div className={`rounded-2xl p-6 w-full max-w-lg m-4 border shadow-2xl transition-transform duration-300 transform scale-95 ${isOpen && '!scale-100'} ${modalBg}`}
           onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-light-text">{isEditing ? 'Editar Transação' : 'Adicionar Transação'}</h2>
          <button onClick={onClose} className="text-medium-text hover:text-light-text">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
            <div className={`grid grid-cols-2 gap-2 p-1 rounded-lg ${theme === 'neon' ? 'bg-dark-bg' : 'bg-dark-blue-bg'}`}>
                <button type="button" onClick={() => setType(TransactionType.EXPENSE)} className={`py-2 rounded-md font-semibold text-sm transition-colors ${type === TransactionType.EXPENSE ? (theme === 'neon' ? 'bg-neon-pink text-white' : 'bg-expense-red text-white') : `text-medium-text ${hoverColor}`}`}>
                    Despesa
                </button>
                <button type="button" onClick={() => setType(TransactionType.INCOME)} className={`py-2 rounded-md font-semibold text-sm transition-colors ${type === TransactionType.INCOME ? (theme === 'neon' ? 'bg-neon-green text-black' : 'bg-income-green text-white') : `text-medium-text ${hoverColor}`}`}>
                    Receita
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-medium-text mb-1">Descrição Principal</label>
                    <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} className={`mt-1 block w-full border rounded-lg shadow-sm py-2 px-3 text-light-text focus:outline-none focus:ring-2 ${inputBg}`} required />
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-medium-text mb-1">Categoria</label>
                    <select id="category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className={`mt-1 block w-full border rounded-lg shadow-sm py-2 px-3 text-light-text focus:outline-none focus:ring-2 ${inputBg}`} required>
                        <option value="">Selecione</option>
                        {filteredCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-medium-text mb-1">Data</label>
                    <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className={`mt-1 block w-full border rounded-lg shadow-sm py-2 px-3 text-light-text focus:outline-none focus:ring-2 ${inputBg}`} required/>
                </div>
            </div>
          
            <div className="space-y-3 pt-2">
                <h3 className="text-md font-semibold text-light-text">Itens</h3>
                {subItems.map((item, index) => (
                    <div key={item.id} className={`space-y-2 p-3 rounded-lg ${subItemBg}`}>
                        <input type="text" value={item.description} onChange={e => handleSubItemChange(index, 'description', e.target.value)} placeholder="Descrição do item" className={`w-full border rounded-lg py-2 px-3 text-sm text-light-text focus:outline-none focus:ring-1 ${subItemInputBg}`} />
                        <input type="number" value={item.amount || ''} onChange={e => handleSubItemChange(index, 'amount', e.target.value)} placeholder="R$0,00" className={`w-full border rounded-lg py-2 px-3 text-sm text-light-text focus:outline-none focus:ring-1 ${subItemInputBg}`} />
                        <div className="flex items-center gap-1">
                            <button type="button" onClick={() => moveSubItem(index, 'up')} disabled={index === 0} className={`text-medium-text p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed ${hoverColor}`} aria-label="Mover item para cima">
                                <ChevronUpIcon className="w-5 h-5" />
                            </button>
                            <button type="button" onClick={() => moveSubItem(index, 'down')} disabled={index === subItems.length - 1} className={`text-medium-text p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed ${hoverColor}`} aria-label="Mover item para baixo">
                                <ChevronDownIcon className="w-5 h-5" />
                            </button>
                            {subItems.length > 1 && (
                                <button type="button" onClick={() => removeSubItem(index)} className={`text-medium-text p-2 rounded-md ${hoverColor} ${theme === 'neon' ? 'hover:text-neon-pink' : 'hover:text-expense-red'}`}>
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                <button type="button" onClick={addSubItem} className={`flex items-center space-x-2 text-sm font-semibold ${theme === 'neon' ? 'text-neon-cyan hover:text-neon-cyan/80' : 'text-primary-blue hover:text-primary-blue-hover'}`}>
                    <PlusIcon className="w-4 h-4" />
                    <span>Adicionar Item</span>
                </button>
            </div>
             <div className={`border-t pt-4 ${theme === 'neon' ? 'border-border-color' : 'border-dark-blue-border'}`}>
                <p className="text-lg font-bold text-right text-light-text">
                    Total: <span className={type === TransactionType.INCOME ? (theme === 'neon' ? 'text-neon-green' : 'text-income-green') : (theme === 'neon' ? 'text-neon-pink' : 'text-expense-red')}>{totalAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </p>
            </div>
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-medium-text mb-1">Anotações</label>
              <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className={`mt-1 block w-full border rounded-lg shadow-sm py-2 px-3 text-light-text focus:outline-none focus:ring-2 ${inputBg}`} placeholder="Adicione detalhes (opcional)"></textarea>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onClose} className={`px-4 py-2 text-sm font-medium text-light-text rounded-lg ${secondaryButton}`}>
                Cancelar
                </button>
                <button type="submit" className={`px-4 py-2 text-sm font-bold rounded-lg ${primaryButton}`}>
                Salvar
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;