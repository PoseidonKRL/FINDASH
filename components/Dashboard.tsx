import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Page } from '../types';
import { ChevronRightIcon, ArrowDownTrayIcon, ArrowUpTrayIcon, FlagIcon, BanknotesIcon } from './icons';
import { useTheme } from '../context/ThemeContext';

interface DashboardProps {
    navigateTo: (page: Page) => void;
}

const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const Dashboard: React.FC<DashboardProps> = ({ navigateTo }) => {
    const { totalIncome, totalExpenses, goals } = useAppContext();
    const { theme } = useTheme();
    const monthlyBalance = totalIncome - totalExpenses;
    const firstGoal = goals[0];
    const goalProgress = firstGoal ? (firstGoal.currentAmount / firstGoal.targetAmount) * 100 : 0;

    const cardBaseClasses = "p-6 rounded-2xl border transition-all duration-300";
    const neonCardHover = "hover:shadow-lg";

    // Define classes for each card based on the theme
    const incomeCardClasses = theme === 'neon' 
        ? `bg-card-bg border-border-color hover:border-neon-green/50 ${neonCardHover} hover:shadow-neon-green/10` 
        : `bg-dark-blue-card border-dark-blue-border bg-income-green/10`;

    const expenseCardClasses = theme === 'neon' 
        ? `bg-card-bg border-border-color hover:border-neon-red/50 ${neonCardHover} hover:shadow-neon-red/10` 
        : `bg-dark-blue-card border-dark-blue-border bg-expense-red/10`;

    const netBalanceCardClasses = theme === 'neon'
        ? `bg-card-bg border-border-color hover:border-neon-cyan/50 ${neonCardHover} hover:shadow-neon-cyan/10`
        : `bg-dark-blue-card border-dark-blue-border bg-primary-blue/10`;

    const incomeTextClasses = theme === 'neon' ? 'text-neon-green text-glow-green' : 'text-income-green';
    const expenseTextClasses = theme === 'neon' ? 'text-neon-red text-glow-red' : 'text-expense-red';
    const netBalanceTextClasses = theme === 'neon' ? 'text-neon-cyan text-glow-cyan' : 'text-primary-blue';
    
    const detailsButtonClasses = theme === 'neon' ? 'text-neon-cyan' : 'text-primary-blue';

    return (
        <div className="p-4 md:p-8 space-y-6">
            {/* Top row of cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Receita Total Card */}
                <div className={`${cardBaseClasses} ${incomeCardClasses}`}>
                    <div className="flex items-center space-x-3 mb-3">
                         <div className={`p-2 rounded-lg ${theme === 'neon' ? 'bg-neon-green/10' : 'bg-income-green/10'}`}>
                            <ArrowDownTrayIcon className={`w-5 h-5 ${theme === 'neon' ? 'text-neon-green' : 'text-income-green'}`} />
                        </div>
                        <p className="text-medium-text font-medium">Receita Total</p>
                    </div>
                    <p className={`text-3xl font-bold ${incomeTextClasses}`}>{formatCurrency(totalIncome)}</p>
                </div>

                {/* Despesa Total Card */}
                <div className={`${cardBaseClasses} ${expenseCardClasses}`}>
                    <div className="flex items-center space-x-3 mb-3">
                        <div className={`p-2 rounded-lg ${theme === 'neon' ? 'bg-neon-red/10' : 'bg-expense-red/10'}`}>
                            <ArrowUpTrayIcon className={`w-5 h-5 ${theme === 'neon' ? 'text-neon-red' : 'text-expense-red'}`} />
                        </div>
                        <p className="text-medium-text font-medium">Despesa Total</p>
                    </div>
                    <p className={`text-3xl font-bold ${expenseTextClasses}`}>{formatCurrency(totalExpenses)}</p>
                </div>

                {/* Saldo Líquido Card */}
                <div className={`${cardBaseClasses} ${netBalanceCardClasses}`}>
                    <div className="flex items-center space-x-3 mb-3">
                         <div className={`p-2 rounded-lg ${theme === 'neon' ? 'bg-neon-cyan/10' : 'bg-primary-blue/10'}`}>
                            <BanknotesIcon className={`w-5 h-5 ${theme === 'neon' ? 'text-neon-cyan' : 'text-primary-blue'}`} />
                        </div>
                        <p className="text-medium-text font-medium">Saldo Líquido</p>
                    </div>
                    <p className={`text-3xl font-bold ${netBalanceTextClasses}`}>{formatCurrency(monthlyBalance)}</p>
                </div>
            </div>

            {/* Bottom row with Goals */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {firstGoal && (
                     <div className={`lg:col-span-3 p-6 rounded-2xl flex flex-col border ${theme === 'neon' ? 'bg-card-bg border-border-color' : 'bg-dark-blue-card border-dark-blue-border'}`}>
                        <div className="flex items-center space-x-3 mb-4">
                             <div className={`p-2 rounded-lg ${theme === 'neon' ? 'bg-neon-cyan/10' : 'bg-primary-blue/10'}`}>
                                <FlagIcon className={`w-6 h-6 ${detailsButtonClasses}`} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-light-text">Próxima Meta</h3>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                            <div className="flex justify-between items-baseline mb-1">
                                <p className="font-semibold text-light-text">{firstGoal.name}</p>
                                <p className={`text-sm font-bold ${detailsButtonClasses}`}>{goalProgress.toFixed(0)}%</p>
                            </div>
                            <div className={`w-full rounded-full h-2.5 ${theme === 'neon' ? 'bg-dark-bg' : 'bg-dark-blue-bg'}`}>
                                <div className={`h-2.5 rounded-full ${theme === 'neon' ? 'bg-neon-cyan' : 'bg-primary-blue'}`} style={{ width: `${goalProgress > 100 ? 100 : goalProgress}%` }}></div>
                            </div>
                        </div>
                        <button onClick={() => navigateTo('goals')} className={`${detailsButtonClasses} font-semibold mt-6 flex items-center space-x-1 justify-center w-full py-2 rounded-lg ${theme === 'neon' ? 'bg-neon-cyan/10 hover:bg-neon-cyan/20' : 'bg-primary-blue/10 hover:bg-primary-blue/20'}`}>
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