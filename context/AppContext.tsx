import React, { createContext, useState, useContext, useMemo, useEffect, ReactNode } from 'react';
import { Transaction, Category, Goal, TransactionType } from '../types';
import { TRANSACTIONS, CATEGORIES, GOALS } from '../constants';

// --- Chaves para o LocalStorage ---
const STORAGE_KEYS = {
  TRANSACTIONS: 'findash_transactions',
  CATEGORIES: 'findash_categories',
  GOALS: 'findash_goals',
};

// --- Função para buscar o estado inicial do localStorage ou usar dados padrão ---
const getInitialState = <T,>(key: string, fallback: T[]): T[] => {
  try {
    const storedValue = localStorage.getItem(key);
    // Se não houver nada salvo, usa o fallback (dados iniciais) e já salva no storage.
    if (storedValue === null) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(storedValue);
  } catch (error) {
    console.error(`Erro ao ler do localStorage a chave “${key}”:`, error);
    // Em caso de erro, retorna o fallback para não quebrar a aplicação.
    return fallback;
  }
};


interface AppContextType {
  transactions: Transaction[];
  categories: Category[];
  goals: Goal[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (transaction: Transaction) => void;
  deleteTransaction: (transactionId: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (goal: Goal) => void;
  deleteGoal: (goalId: string) => void;
  totalIncome: number;
  totalExpenses: number;
  totalBalance: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// FIX: This component was refactored to use React.FC for consistency with the rest of the application, resolving a typing issue.
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  // --- Inicializa o estado usando a função que lê do localStorage ---
  const [transactions, setTransactions] = useState<Transaction[]>(() => getInitialState(STORAGE_KEYS.TRANSACTIONS, TRANSACTIONS));
  const [categories, setCategories] = useState<Category[]>(() => getInitialState(STORAGE_KEYS.CATEGORIES, CATEGORIES));
  const [goals, setGoals] = useState<Goal[]>(() => getInitialState(STORAGE_KEYS.GOALS, GOALS));

  // --- Efeitos para salvar automaticamente qualquer mudança no localStorage ---
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
    } catch (error) {
      console.error('Falha ao salvar transações no localStorage:', error);
    }
  }, [transactions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    } catch (error) {
      console.error('Falha ao salvar categorias no localStorage:', error);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
    } catch (error) {
      console.error('Falha ao salvar metas no localStorage:', error);
    }
  }, [goals]);


  // --- Funções de manipulação de estado (permanecem as mesmas) ---
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    setTransactions(prev => [...prev, { ...transaction, id: `t${Date.now()}` }]);
  };

  const updateTransaction = (updatedTransaction: Transaction) => {
    setTransactions(prev => prev.map(t => (t.id === updatedTransaction.id ? updatedTransaction : t)));
  };

  const deleteTransaction = (transactionId: string) => {
    setTransactions(prev => prev.filter(t => t.id !== transactionId));
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    setCategories(prev => [...prev, { ...category, id: `cat${Date.now()}` }]);
  };

  const addGoal = (goal: Omit<Goal, 'id'>) => {
    setGoals(prev => [...prev, { ...goal, id: `g${Date.now()}` }]);
  };

  const updateGoal = (updatedGoal: Goal) => {
    setGoals(prev => prev.map(goal => (goal.id === updatedGoal.id ? updatedGoal : goal)));
  };

  const deleteGoal = (goalId: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  const { totalIncome, totalExpenses } = useMemo(() => {
    const currentMonth = new Date().getMonth();
    // FIX: Corrected a typo from `new date()` to `new Date()`.
    const currentYear = new Date().getFullYear();

    return transactions.reduce((acc, t) => {
      const transactionDate = new Date(t.date);
      if (transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear) {
        if (t.type === TransactionType.INCOME) {
          acc.totalIncome += t.amount;
        } else {
          acc.totalExpenses += t.amount;
        }
      }
      return acc;
    }, { totalIncome: 0, totalExpenses: 0 });
  }, [transactions]);
  
  const totalBalance = useMemo(() => {
    return transactions.reduce((acc, t) => {
      if (t.type === TransactionType.INCOME) {
        acc += t.amount;
      } else {
        acc -= t.amount;
      }
      return acc;
    }, 0);
  }, [transactions]);

  const value = {
    transactions,
    categories,
    goals,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addCategory,
    addGoal,
    updateGoal,
    deleteGoal,
    totalIncome,
    totalExpenses,
    totalBalance,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};