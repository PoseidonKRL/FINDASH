import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Label, ReferenceArea } from 'recharts';
import { useAppContext } from '../context/AppContext';
import { Transaction, TransactionType } from '../types';
import { PencilIcon, TrashIcon, ChevronRightIcon, ChevronDownIcon, ChevronLeftIcon, getIcon, DocumentDuplicateIcon } from './icons';
import ConfirmationModal from './modals/ConfirmationModal';
import DuplicateTransactionModal from './modals/DuplicateTransactionModal';
import { useTheme } from '../context/ThemeContext';

const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const CustomTooltip = ({ active, payload, label }: any) => {
  const { theme } = useTheme();
  if (active && payload && payload.length) {
    return (
      <div className={`p-4 rounded-lg shadow-lg ${theme === 'neon' ? 'bg-dark-bg border border-border-color' : 'bg-dark-blue-bg border border-dark-blue-border'}`}>
        <p className="label text-base font-semibold text-light-text mb-2">{`${label}`}</p>
        {payload.map((pld: any) => (
            <div key={pld.dataKey} style={{ color: pld.color }} className="flex items-center space-x-2">
                <div style={{ backgroundColor: pld.color }} className="w-2.5 h-2.5 rounded-full"></div>
                <span className="text-sm text-medium-text">{pld.dataKey}:</span>
                <span className="text-sm font-bold text-light-text">{formatCurrency(pld.value)}</span>
            </div>
        ))}
      </div>
    );
  }

  return null;
};

interface ReportsPageProps {
  onEditTransaction: (transaction: Transaction) => void;
}

const ReportsPage: React.FC<ReportsPageProps> = ({ onEditTransaction }) => {
    const { transactions, categories, deleteTransaction } = useAppContext();
    const { theme } = useTheme();
    const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
    const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null);
    const [isDuplicateModalOpen, setDuplicateModalOpen] = useState(false);
    const [transactionToDuplicate, setTransactionToDuplicate] = useState<Transaction | null>(null);
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handlePreviousMonth = () => {
        setSelectedDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setSelectedDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    const toggleRowExpansion = (transactionId: string) => {
        setExpandedRows(prev => {
            const newSet = new Set(prev);
            if (newSet.has(transactionId)) {
                newSet.delete(transactionId);
            } else {
                newSet.add(transactionId);
            }
            return newSet;
        });
    };

    const chartData = useMemo(() => {
        const dataByMonth: { [key: string]: { month: string; Receitas: number; Despesas: number } } = {};
        const monthKeys: string[] = [];
        const today = new Date();

        for (let i = 5; i >= 0; i--) {
            const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const month = date.toLocaleString('pt-BR', { month: 'short' });
            const yearMonthKey = `${date.getFullYear()}-${date.getMonth()}`;
            if (!dataByMonth[yearMonthKey]) {
                dataByMonth[yearMonthKey] = { month: month.charAt(0).toUpperCase() + month.slice(1), Receitas: 0, Despesas: 0 };
                monthKeys.push(yearMonthKey);
            }
        }
        
        transactions.forEach(t => {
            const transactionDate = new Date(t.date);
            const yearMonthKey = `${transactionDate.getFullYear()}-${transactionDate.getMonth()}`;
            
            if (dataByMonth[yearMonthKey]) {
                if (t.type === TransactionType.INCOME) {
                    dataByMonth[yearMonthKey].Receitas += t.amount;
                } else {
                    dataByMonth[yearMonthKey].Despesas += t.amount;
                }
            }
        });

        return monthKeys.map(key => dataByMonth[key]);
    }, [transactions]);

    const currentMonthLabel = new Date().toLocaleString('pt-BR', { month: 'short' }).replace(/^\w/, c => c.toUpperCase());

    const filteredTransactions = useMemo(() => {
        return [...transactions]
            .filter(t => {
                const transactionDate = new Date(t.date);
                return transactionDate.getMonth() === selectedDate.getMonth() &&
                       transactionDate.getFullYear() === selectedDate.getFullYear();
            })
            .filter(t => filter === 'all' || t.type === filter)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [transactions, filter, selectedDate]);

    const getCategory = (id: string) => categories.find(c => c.id === id);

    const handleOpenDeleteConfirm = (transactionId: string) => {
        setTransactionToDelete(transactionId);
        setConfirmModalOpen(true);
    };

    const handleDeleteTransaction = () => {
        if (transactionToDelete) {
            deleteTransaction(transactionToDelete);
        }
        setConfirmModalOpen(false);
        setTransactionToDelete(null);
    };
    
    const handleOpenDuplicateModal = (transaction: Transaction) => {
        setTransactionToDuplicate(transaction);
        setDuplicateModalOpen(true);
    };

    const chartColors = {
        income: theme === 'neon' ? 'hsl(var(--neon-green-hsl))' : '#22C55E',
        expense: theme === 'neon' ? 'hsl(var(--neon-pink-hsl))' : '#EF4444',
        grid: theme === 'neon' ? '#2a2a45' : '#334155'
    };

    return (
        <div className="p-4 md:p-8 space-y-6">
            <header className="py-4">
                <h1 className="text-3xl font-bold text-light-text">Relatórios</h1>
            </header>
            
            <div className="space-y-6 md:grid md:grid-cols-5 md:gap-6 md:space-y-0">
                <div className={`md:col-span-5 p-4 sm:p-6 rounded-2xl border ${theme === 'neon' ? 'bg-card-bg border-border-color' : 'bg-dark-blue-card border-dark-blue-border'}`}>
                    <div className="h-80 w-full">
                        <ResponsiveContainer>
                            <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 20 }}>
                                <defs>
                                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={chartColors.income} stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor={chartColors.income} stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={chartColors.expense} stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor={chartColors.expense} stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                                <XAxis dataKey="month" stroke="#a0a0b0" dy={10} style={{ fontSize: '0.8rem' }}>
                                  <Label value="Mês" position="insideBottom" offset={-10} style={{ textAnchor: 'middle', fill: '#a0a0b0', fontSize: '0.9rem' }} />
                                </XAxis>
                                <YAxis stroke="#a0a0b0" tickFormatter={(value) => `${(Number(value)/1000)}k`} dx={-5} style={{ fontSize: '0.8rem' }}>
                                  <Label value="Valor (R$)" angle={-90} position="insideLeft" offset={10} style={{ textAnchor: 'middle', fill: '#a0a0b0', fontSize: '0.9rem' }} />
                                </YAxis>
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(160, 160, 176, 0.1)' }}/>
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                
                                <ReferenceArea x1={currentMonthLabel} x2={currentMonthLabel} stroke="none" fill="#a0a0b0" fillOpacity={0.1} />
                                
                                {filter !== 'expense' && <Area type="monotone" dataKey="Receitas" stroke={chartColors.income} fillOpacity={1} fill="url(#colorIncome)" strokeWidth={2.5} />}
                                {filter !== 'income' && <Area type="monotone" dataKey="Despesas" stroke={chartColors.expense} fillOpacity={1} fill="url(#colorExpense)" strokeWidth={2.5} />}
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="md:col-span-5 space-y-4">
                     <div className={`flex justify-between items-center p-2 rounded-xl border ${theme === 'neon' ? 'bg-card-bg border-border-color' : 'bg-dark-blue-card border-dark-blue-border'}`}>
                        <button onClick={handlePreviousMonth} className={`p-2 rounded-full transition-colors ${theme === 'neon' ? 'hover:bg-border-color' : 'hover:bg-dark-blue-border'}`}>
                            <ChevronLeftIcon className="w-5 h-5 text-medium-text" />
                        </button>
                        <h3 className="font-semibold text-lg text-light-text capitalize">
                            {selectedDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
                        </h3>
                        <button onClick={handleNextMonth} className={`p-2 rounded-full transition-colors ${theme === 'neon' ? 'hover:bg-border-color' : 'hover:bg-dark-blue-border'}`}>
                            <ChevronRightIcon className="w-5 h-5 text-medium-text" />
                        </button>
                    </div>
                    <div className={`flex justify-center md:justify-start space-x-2 p-2 rounded-xl border self-start ${theme === 'neon' ? 'bg-card-bg border-border-color' : 'bg-dark-blue-card border-dark-blue-border'}`}>
                        <button onClick={() => setFilter('all')} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${filter === 'all' ? (theme === 'neon' ? 'bg-neon-cyan text-black' : 'bg-primary-blue text-white') : `text-medium-text ${theme === 'neon' ? 'hover:bg-border-color' : 'hover:bg-dark-blue-border'}`}`}>Todos</button>
                        <button onClick={() => setFilter('income')} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${filter === 'income' ? (theme === 'neon' ? 'bg-neon-green text-black' : 'bg-income-green text-white') : `text-medium-text ${theme === 'neon' ? 'hover:bg-border-color' : 'hover:bg-dark-blue-border'}`}`}>Receitas</button>
                        <button onClick={() => setFilter('expense')} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${filter === 'expense' ? (theme === 'neon' ? 'bg-neon-pink text-white' : 'bg-expense-red text-white') : `text-medium-text ${theme === 'neon' ? 'hover:bg-border-color' : 'hover:bg-dark-blue-border'}`}`}>Despesas</button>
                    </div>
                    <div className="space-y-3 max-h-[60vh] md:max-h-[26rem] overflow-y-auto pr-2 no-scrollbar">
                        {filteredTransactions.length > 0 ? filteredTransactions.map(t => {
                            const category = getCategory(t.categoryId);
                            const isIncome = t.type === TransactionType.INCOME;
                            const actualSubItems = t.subItems?.filter(item => item.description !== 'Sobra') || [];
                            const hasSubItems = actualSubItems.length > 0;
                            const isExpanded = expandedRows.has(t.id);
                            const IconComponent = category ? getIcon(category.icon) : getIcon('default');

                            const incomeColor = theme === 'neon' ? 'text-neon-green' : 'text-income-green';
                            const expenseColor = theme === 'neon' ? 'text-neon-pink' : 'text-expense-red';

                            const sobra = (t.initialAmount && t.initialAmount > t.amount) 
                                ? t.initialAmount - t.amount 
                                : 0;

                            return (
                                <div key={t.id} className={`rounded-xl border p-4 ${theme === 'neon' ? 'bg-card-bg border-border-color' : 'bg-dark-blue-card border-dark-blue-border'}`}>
                                    <div className="flex items-start space-x-3">
                                        <div className={`p-3 rounded-full flex-shrink-0 border border-transparent ${theme === 'neon' ? (isIncome ? 'shadow-[0_0_8px_hsla(var(--neon-green-hsl),0.5)] bg-dark-bg' : 'shadow-[0_0_8px_hsla(var(--neon-pink-hsl),0.5)] bg-dark-bg') : (isIncome ? 'bg-income-green/10' : 'bg-expense-red/10')}`}>
                                            {category && <IconComponent className={`w-5 h-5 ${isIncome ? incomeColor : expenseColor}`} />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-semibold text-light-text break-words">{t.description}</p>
                                                    <p className="text-sm text-medium-text">{new Date(t.date).toLocaleDateString('pt-BR')}</p>
                                                </div>
                                                 <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center ml-2">
                                                    {(hasSubItems || t.notes || sobra > 0) && (
                                                        <button 
                                                            onClick={() => toggleRowExpansion(t.id)}
                                                            aria-expanded={isExpanded}
                                                            className="text-medium-text"
                                                        >
                                                            {isExpanded ? <ChevronDownIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" />}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center mt-2">
                                                <p className={`font-bold text-base ${isIncome ? incomeColor : expenseColor}`}>
                                                    {isIncome ? '+' : '-'} {formatCurrency(t.amount)}
                                                </p>
                                                <div className="flex space-x-1">
                                                    <button onClick={() => handleOpenDuplicateModal(t)} className={`p-1 text-medium-text ${theme === 'neon' ? 'hover:text-neon-cyan' : 'hover:text-primary-blue'}`}><DocumentDuplicateIcon className="w-4 h-4" /></button>
                                                    <button onClick={() => onEditTransaction(t)} className={`p-1 text-medium-text ${theme === 'neon' ? 'hover:text-neon-cyan' : 'hover:text-primary-blue'}`}><PencilIcon className="w-4 h-4" /></button>
                                                    <button onClick={() => handleOpenDeleteConfirm(t.id)} className={`p-1 text-medium-text ${theme === 'neon' ? 'hover:text-neon-pink' : 'hover:text-expense-red'}`}><TrashIcon className="w-4 h-4" /></button>
                                                </div>
                                            </div>
                                             {isExpanded && (hasSubItems || t.notes || sobra > 0.001) && (
                                                <div className={`pt-3 mt-3 space-y-2 ${theme === 'neon' ? 'border-t border-border-color' : 'border-t border-dark-blue-border'}`}>
                                                     {t.notes && <p className="text-sm text-medium-text italic mb-2 break-words">Nota: {t.notes}</p>}
                                                    {actualSubItems.map(item => (
                                                        <div key={item.id} className="flex justify-between items-start text-sm gap-4">
                                                            <p className="text-medium-text break-words flex-1 min-w-0">{item.description}</p>
                                                            <p className={`font-medium whitespace-nowrap ${isIncome ? `${incomeColor}/90` : `${expenseColor}/90`}`}>
                                                                {isIncome ? '+' : '-'} {formatCurrency(item.amount)}
                                                            </p>
                                                        </div>
                                                    ))}
                                                    {sobra > 0.001 && (
                                                        <div className="flex justify-between items-start text-sm gap-4">
                                                            <p className="text-medium-text break-words flex-1 min-w-0">Sobra</p>
                                                            <p className={`font-medium whitespace-nowrap ${theme === 'neon' ? 'text-neon-green' : 'text-income-green'}`}>
                                                                {formatCurrency(sobra)}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        }) : (
                            <div className={`text-center py-16 rounded-2xl border ${theme === 'neon' ? 'bg-card-bg border-border-color' : 'bg-dark-blue-card border-dark-blue-border'}`}>
                                <p className="text-medium-text">Nenhuma transação encontrada para este período.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ConfirmationModal 
                isOpen={isConfirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                onConfirm={handleDeleteTransaction}
                title="Confirmar Exclusão"
                message="Você tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita."
            />
             <DuplicateTransactionModal
                isOpen={isDuplicateModalOpen}
                onClose={() => setDuplicateModalOpen(false)}
                transactionToDuplicate={transactionToDuplicate}
            />
        </div>
    );
};

export default ReportsPage;