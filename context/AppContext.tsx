import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react';
import { Transaction, Category, Goal, TransactionType } from '../types';
import { TRANSACTIONS, CATEGORIES, GOALS } from '../constants';

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
  savedAmount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(TRANSACTIONS);
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [goals, setGoals] = useState<Goal[]>(GOALS);

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
  
  const savedAmount = totalIncome - totalExpenses;

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
    savedAmount
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