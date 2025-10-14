import { Category, Transaction, Goal, TransactionType } from './types';

export const CATEGORIES: Category[] = [
  { id: 'cat1', name: 'Salário', icon: 'BriefcaseIcon', type: TransactionType.INCOME },
  { id: 'cat2', name: 'Freelance', icon: 'BanknotesIcon', type: TransactionType.INCOME },
  { id: 'cat3', name: 'Presentes', icon: 'GiftIcon', type: TransactionType.INCOME },
  { id: 'cat4', name: 'Mercado', icon: 'ShoppingCartIcon', type: TransactionType.EXPENSE },
  { id: 'cat5', name: 'Contas', icon: 'BuildingStorefrontIcon', type: TransactionType.EXPENSE },
  { id: 'cat6', name: 'Transporte', icon: 'CreditCardIcon', type: TransactionType.EXPENSE },
];

export const TRANSACTIONS: Transaction[] = [
  { id: 't1', categoryId: 'cat1', type: TransactionType.INCOME, amount: 3200, description: 'Salário Mensal', date: new Date(new Date().setDate(1)).toISOString() },
  { 
    id: 't2', 
    categoryId: 'cat4', 
    type: TransactionType.EXPENSE, 
    amount: 450, 
    description: 'Compras do mês', 
    date: new Date(new Date().setDate(2)).toISOString(),
    notes: 'Comprado no Supermercado XYZ.',
    subItems: [
      { id: 'si1', description: 'Frutas e Vegetais', amount: 150 },
      { id: 'si2', description: 'Carnes', amount: 200 },
      { id: 'si3', description: 'Produtos de limpeza', amount: 100 },
    ]
  },
  { 
    id: 't3', 
    categoryId: 'cat5', 
    type: TransactionType.EXPENSE, 
    amount: 550, 
    description: 'Aluguel e Contas', 
    date: new Date(new Date().setDate(5)).toISOString(),
    notes: 'Pagamento recorrente.'
  },
  { id: 't4', categoryId: 'cat2', type: TransactionType.INCOME, amount: 500, description: 'Serviços extras', date: new Date(new Date().setDate(15)).toISOString() },
];

export const GOALS: Goal[] = [
  { id: 'g1', name: 'Reduzir gastos', description: 'Parar de comprar coisas desnecessárias', targetAmount: 1500, currentAmount: 1000 },
  { id: 'g2', name: 'Viagem de Férias', description: 'Guardar dinheiro para viagem em Dezembro', targetAmount: 5000, currentAmount: 1200 },
];