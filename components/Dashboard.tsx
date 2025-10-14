import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Page } from '../types';
import { ChevronRightIcon, ArrowDownTrayIcon, ArrowUpTrayIcon, WalletIcon, FlagIcon } from './icons';

interface DashboardProps {
    navigateTo: (page: Page) => void;
}

const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const Dashboard: React.FC<DashboardProps> = ({ navigateTo }) => {
    const { totalIncome, totalExpenses, savedAmount, goals } = useAppContext();
    const firstGoal = goals[0];
    const goalProgress = firstGoal ? (firstGoal.currentAmount / firstGoal.targetAmount) * 100 : 0;

    return (
        <div className="p-4 md:p-8">
            <div className="space-y-6 md:grid md:grid-cols-3 md:gap-6 md:space-y-0">
                <div className="md:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-navy-800 p-6 rounded-2xl border border-navy-700">
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="bg-emerald-500/10 p-2 rounded-lg">
                                    <ArrowDownTrayIcon className="w-5 h-5 text-income" />
                                </div>
                                <p className="text-medium-text font-medium">Receitas (Mês)</p>
                            </div>
                            <p className="text-3xl font-bold text-income">{formatCurrency(totalIncome)}</p>
                        </div>
                        <div className="bg-navy-800 p-6 rounded-2xl border border-navy-700">
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="bg-red-500/10 p-2 rounded-lg">
                                    <ArrowUpTrayIcon className="w-5 h-5 text-expense" />
                                </div>
                                <p className="text-medium-text font-medium">Despesas (Mês)</p>
                            </div>
                            <p className="text-3xl font-bold text-expense">{formatCurrency(totalExpenses)}</p>
                        </div>
                    </div>
                     <div className="bg-navy-800 p-6 rounded-2xl flex justify-between items-center border border-navy-700">
                        <div>
                            <p className="text-medium-text mb-1">Dinheiro guardado:</p>
                            <p className="text-3xl font-bold text-light-text">{formatCurrency(savedAmount)}</p>
                            <button onClick={() => navigateTo('reports')} className="text-primary font-semibold mt-4 flex items-center space-x-1 hover:underline">
                                <span>Ver detalhes</span>
                                <ChevronRightIcon className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="text-primary">
                           <WalletIcon className="w-16 h-16 opacity-70" />
                        </div>
                    </div>
                </div>

                {firstGoal && (
                     <div className="md:col-span-1 bg-navy-800 p-6 rounded-2xl flex flex-col border border-navy-700">
                        <div className="flex items-center space-x-3 mb-4">
                             <div className="bg-primary/10 p-2 rounded-lg">
                                <FlagIcon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-light-text">Próxima Meta</h3>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                            <div className="flex justify-between items-baseline mb-1">
                                <p className="font-semibold text-light-text">{firstGoal.name}</p>
                                <p className="text-sm text-primary font-bold">{goalProgress.toFixed(0)}%</p>
                            </div>
                            <div className="w-full bg-navy-900 rounded-full h-2.5">
                                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${goalProgress}%` }}></div>
                            </div>
                        </div>
                        <button onClick={() => navigateTo('goals')} className="text-primary font-semibold mt-6 flex items-center space-x-1 justify-center w-full py-2 bg-primary/10 rounded-lg hover:bg-primary/20">
                            <span>Ver todas as metas</span>
                            <ChevronRightIcon className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;