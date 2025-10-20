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
  const [totalAmount, setTotalAmount] = useState<number | string>('');
  const [categoryId, setCategoryId] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [subItems, setSubItems] = useState<SubItem[]>([{ id: `si${Date.now()}`, description: '', amount: 0 }]);

  const isEditing = !!transactionToEdit;

  const { subItemsSum, remainder } = useMemo(() => {
    const sum = subItems.reduce((s, item) => s + Number(item.amount || 0), 0);
    const rem = type === TransactionType.EXPENSE ? Number(totalAmount || 0) - sum : 0;
    return { subItemsSum: sum, remainder: rem };
  }, [subItems, totalAmount, type]);

  const finalTransactionAmount = useMemo(() => {
    if (type === TransactionType.EXPENSE) {
      return Number(totalAmount || 0);
    }
    return subItemsSum;
  }, [subItemsSum, totalAmount, type]);

  const resetForm = () => {
    setType(TransactionType.EXPENSE);
    setDescription('');
    setTotalAmount('');
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

            if (transactionToEdit.type === TransactionType.EXPENSE) {
                setTotalAmount(transactionToEdit.amount);
                const userSubItems = transactionToEdit.subItems?.filter(si => si.description !== 'Sobra');

                if (userSubItems && userSubItems.length > 0) {
                    setSubItems(userSubItems);
                } else {
                    setSubItems([{ id: `si${Date.now()}`, description: '', amount: 0 }]);
                }
            } else { // Handle Income
                setTotalAmount('');
                if (transactionToEdit.subItems && transactionToEdit.subItems.length > 0) {
                  setSubItems(transactionToEdit.subItems);
                } else {
                  setSubItems([{ id: `si${Date.now()}`, description: '', amount: transactionToEdit.amount }]);
                }
            }
        } else {
            resetForm();
        }
    }
  }, [transactionToEdit, isOpen, isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (finalTransactionAmount <= 0 || !description || !categoryId || !date) return;
    
    let finalSubItems = subItems.filter(item => item.description && item.amount > 0);

    if (type === TransactionType.EXPENSE && remainder > 0.001) { // Epsilon for float issues
        finalSubItems.push({
            id: `si${Date.now()}_sobra`,
            description: 'Sobra',
            amount: remainder
        });
    }

    const transactionData = {
        amount: finalTransactionAmount,
        description,
        categoryId,
        type,
        notes,
        subItems: finalSubItems.length > 0 ? finalSubItems : undefined,
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
  
  const styles = {
    dark: {
        modalBg: 'bg-dark-blue-card border-dark-blue-border',
        inputBg: 'bg-dark-blue-bg border-dark-blue-border focus:ring-primary-blue focus:border-primary-blue',
        subItemBg: 'bg-dark-blue-bg',
        subItemInputBg: 'bg-dark-blue-card border-dark-blue-border focus:ring-primary-blue',
        hoverColor: 'hover:bg-dark-blue-border',
        primaryButton: 'bg-primary-blue text-white hover:bg-primary-blue-hover',
        secondaryButton: 'bg-dark-blue-border hover:bg-dark-blue-border/80',
        expenseButton: 'bg-expense-red text-white',
        incomeButton: 'bg-income-green text-white',
        incomeText: 'text-income-green',
        expenseText: 'text-expense-red',
        accentText: 'text-primary-blue hover:text-primary-blue-hover',
    },
    neon: {
        modalBg: 'bg-card-bg border-border-color',
        inputBg: 'bg-dark-bg border-border-color focus:ring-neon-cyan focus:border-neon-cyan',
        subItemBg: 'bg-dark-bg',
        subItemInputBg: 'bg-card-bg border-border-color focus:ring-neon-cyan',
        hoverColor: 'hover:bg-border-color',
        primaryButton: 'bg-neon-cyan text-black hover:bg-neon-cyan/80',
        secondaryButton: 'bg-border-color hover:bg-border-color/80',
        expenseButton: 'bg-neon-pink text-white',
        incomeButton: 'bg-neon-green text-black',
        incomeText: 'text-neon-green',
        expenseText: 'text-neon-pink',
        accentText: 'text-neon-cyan hover:text-neon-cyan/80',
    },
    minimal: {
        modalBg: 'bg-minimal-card border-minimal-border',
        inputBg: 'bg-gray-50 border-minimal-border focus:ring-minimal-accent focus:border-minimal-accent',
        subItemBg: 'bg-gray-50',
        subItemInputBg: 'bg-minimal-card border-minimal-border focus:ring-minimal-accent',
        hoverColor: 'hover:bg-gray-200',
        primaryButton: 'bg-minimal-accent text-white',
        secondaryButton: 'bg-gray-200 hover:bg-gray-300',
        expenseButton: 'bg-minimal-expense text-white',
        incomeButton: 'bg-minimal-income text-white',
        incomeText: 'text-minimal-income',
        expenseText: 'text-minimal-expense',
        accentText: 'text-minimal-accent',
    },
    brutalist: {
        modalBg: 'brutalist-card bg-white',
        inputBg: 'bg-white border-brutalist-border focus:ring-brutalist-accent focus:border-brutalist-accent',
        subItemBg: 'bg-white border border-brutalist-border',
        subItemInputBg: 'bg-white border-brutalist-border focus:ring-brutalist-accent',
        hoverColor: 'hover:bg-yellow-200',
        primaryButton: 'brutalist-button bg-brutalist-accent text-white',
        secondaryButton: 'brutalist-button bg-gray-200',
        expenseButton: 'brutalist-button bg-brutalist-expense text-white',
        incomeButton: 'brutalist-button bg-brutalist-income text-white',
        incomeText: 'text-brutalist-income',
        expenseText: 'text-brutalist-expense',
        accentText: 'text-brutalist-accent',
    },
    glass: {
        modalBg: 'bg-white/10 border-white/20 backdrop-blur-md',
        inputBg: 'bg-white/5 border-white/10 focus:ring-glass-accent focus:border-glass-accent',
        subItemBg: 'bg-white/5',
        subItemInputBg: 'bg-white/10 border-white/20 focus:ring-glass-accent',
        hoverColor: 'hover:bg-white/20',
        primaryButton: 'bg-glass-accent text-black',
        secondaryButton: 'bg-white/10 hover:bg-white/20',
        expenseButton: 'bg-expense-red text-white',
        incomeButton: 'bg-income-green text-white',
        incomeText: 'text-income-green',
        expenseText: 'text-expense-red',
        accentText: 'text-glass-accent',
    },
    cyberpunk: {
        modalBg: 'bg-cyber-card border-cyber-border',
        inputBg: 'bg-cyber-bg border-cyber-border focus:ring-cyber-accent focus:border-cyber-accent',
        subItemBg: 'bg-cyber-bg',
        subItemInputBg: 'bg-cyber-card border-cyber-border focus:ring-cyber-accent',
        hoverColor: 'hover:bg-cyber-border',
        primaryButton: 'bg-cyber-accent text-black',
        secondaryButton: 'bg-cyber-border hover:bg-cyber-border/80',
        expenseButton: 'bg-cyber-expense text-white',
        incomeButton: 'bg-cyber-income text-black',
        incomeText: 'text-cyber-income',
        expenseText: 'text-cyber-expense',
        accentText: 'text-cyber-accent',
    }
  }[theme];
  
  const textClass = (theme === 'minimal' || theme === 'brutalist') ? 'text-minimal-text' : 'text-light-text';
  const mediumTextClass = (theme === 'minimal' || theme === 'brutalist') ? 'text-minimal-medium-text' : 'text-medium-text';
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 transition-opacity duration-300"
         onClick={onClose}
    >
      <div className={`rounded-2xl p-6 w-full max-w-lg m-4 border shadow-2xl transition-transform duration-300 transform scale-95 ${isOpen && '!scale-100'} ${styles.modalBg}`}
           onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-bold ${textClass}`}>{isEditing ? 'Editar Transação' : 'Adicionar Transação'}</h2>
          <button onClick={onClose} className={`${mediumTextClass} hover:${textClass}`}>
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
            <div className={`grid grid-cols-2 gap-2 p-1 rounded-lg ${styles.inputBg}`}>
                <button type="button" onClick={() => setType(TransactionType.EXPENSE)} className={`py-2 rounded-md font-semibold text-sm transition-colors ${type === TransactionType.EXPENSE ? styles.expenseButton : `${mediumTextClass} ${styles.hoverColor}`}`}>
                    Despesa
                </button>
                <button type="button" onClick={() => setType(TransactionType.INCOME)} className={`py-2 rounded-md font-semibold text-sm transition-colors ${type === TransactionType.INCOME ? styles.incomeButton : `${mediumTextClass} ${styles.hoverColor}`}`}>
                    Receita
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <label htmlFor="description" className={`block text-sm font-medium ${mediumTextClass} mb-1`}>Descrição Principal</label>
                    <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} className={`mt-1 block w-full border rounded-lg shadow-sm py-2 px-3 ${textClass} focus:outline-none focus:ring-2 ${styles.inputBg}`} required />
                </div>

                {type === TransactionType.EXPENSE && (
                  <div className="md:col-span-2">
                      <label htmlFor="totalAmount" className={`block text-sm font-medium ${mediumTextClass} mb-1`}>Valor Inicial</label>
                      <input type="number" step="0.01" id="totalAmount" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} placeholder="R$0,00" className={`mt-1 block w-full border rounded-lg shadow-sm py-2 px-3 ${textClass} focus:outline-none focus:ring-2 ${styles.inputBg}`} required />
                  </div>
                )}
                
                <div>
                    <label htmlFor="category" className={`block text-sm font-medium ${mediumTextClass} mb-1`}>Categoria</label>
                    <select id="category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className={`mt-1 block w-full border rounded-lg shadow-sm py-2 px-3 ${textClass} focus:outline-none focus:ring-2 ${styles.inputBg}`} required>
                        <option value="">Selecione</option>
                        {filteredCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="date" className={`block text-sm font-medium ${mediumTextClass} mb-1`}>Data</label>
                    <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className={`mt-1 block w-full border rounded-lg shadow-sm py-2 px-3 ${textClass} focus:outline-none focus:ring-2 ${styles.inputBg}`} required/>
                </div>
            </div>
          
            <div className="space-y-3 pt-2">
                <h3 className={`text-md font-semibold ${textClass}`}>Itens</h3>
                {subItems.map((item, index) => (
                    <div key={item.id} className={`space-y-2 p-3 rounded-lg ${styles.subItemBg}`}>
                        <input type="text" value={item.description} onChange={e => handleSubItemChange(index, 'description', e.target.value)} placeholder="Descrição do item" className={`w-full border rounded-lg py-2 px-3 text-sm ${textClass} focus:outline-none focus:ring-1 ${styles.subItemInputBg}`} />
                        <input type="number" step="0.01" value={item.amount || ''} onChange={e => handleSubItemChange(index, 'amount', e.target.value)} placeholder="R$0,00" className={`w-full border rounded-lg py-2 px-3 text-sm ${textClass} focus:outline-none focus:ring-1 ${styles.subItemInputBg}`} />
                        <div className="flex items-center gap-1">
                            <button type="button" onClick={() => moveSubItem(index, 'up')} disabled={index === 0} className={`${mediumTextClass} p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed ${styles.hoverColor}`} aria-label="Mover item para cima">
                                <ChevronUpIcon className="w-5 h-5" />
                            </button>
                            <button type="button" onClick={() => moveSubItem(index, 'down')} disabled={index === subItems.length - 1} className={`${mediumTextClass} p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed ${styles.hoverColor}`} aria-label="Mover item para baixo">
                                <ChevronDownIcon className="w-5 h-5" />
                            </button>
                            {subItems.length > 1 && (
                                <button type="button" onClick={() => removeSubItem(index)} className={`${mediumTextClass} p-2 rounded-md ${styles.hoverColor} hover:${styles.expenseText}`}>
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                <button type="button" onClick={addSubItem} className={`flex items-center space-x-2 text-sm font-semibold ${styles.accentText}`}>
                    <PlusIcon className="w-4 h-4" />
                    <span>Adicionar Item</span>
                </button>
            </div>

            <div className={`border-t pt-4 space-y-2 ${(theme === 'dark' || theme === 'glass') ? 'border-dark-blue-border' : (theme === 'minimal' || theme === 'brutalist') ? 'border-minimal-border' : 'border-border-color'}`}>
                {type === TransactionType.EXPENSE && Number(totalAmount) > 0 && (
                    <div className="flex justify-between items-center">
                        <p className={`text-md font-semibold ${mediumTextClass}`}>Sobra:</p>
                        <p className={`text-md font-semibold ${styles.incomeText}`}>
                            {remainder.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </p>
                    </div>
                )}
                <div className="flex justify-between items-center">
                    <p className={`text-lg font-bold ${textClass}`}>Total:</p>
                    <p className={`text-lg font-bold ${type === TransactionType.INCOME ? styles.incomeText : styles.expenseText}`}>
                        {finalTransactionAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                </div>
            </div>

            <div>
              <label htmlFor="notes" className={`block text-sm font-medium ${mediumTextClass} mb-1`}>Anotações</label>
              <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className={`mt-1 block w-full border rounded-lg shadow-sm py-2 px-3 ${textClass} focus:outline-none focus:ring-2 ${styles.inputBg}`} placeholder="Adicione detalhes (opcional)"></textarea>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onClose} className={`px-4 py-2 text-sm font-medium ${textClass} rounded-lg ${styles.secondaryButton}`}>
                Cancelar
                </button>
                <button type="submit" className={`px-4 py-2 text-sm font-bold rounded-lg ${styles.primaryButton}`}>
                Salvar
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;