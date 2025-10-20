export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface Category {
  id: string;
  name: string;
  icon: string; // Changed from React.ComponentType to string
  type: TransactionType;
}

export interface SubItem {
  id:string;
  description: string;
  amount: number;
}

export interface Transaction {
  id: string;
  categoryId: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: string;
  notes?: string;
  subItems?: SubItem[];
  initialAmount?: number;
}

export interface Goal {
  id: string;
  name: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
}

export type Page = 'dashboard' | 'reports' | 'goals' | 'profile';