import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Page } from '../types';
import { ChevronRightIcon, ArrowDownTrayIcon, ArrowUpTrayIcon, FlagIcon, BanknotesIcon, ChevronLeftIcon, WalletIcon } from './icons';
import { useTheme } from '../context/ThemeContext';

interface DashboardProps {
    navigateTo: (page: Page) => void;
}

const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const Dashboard: React.FC<DashboardProps> = ({ navigateTo }) => {
    const { totalIncome, totalExpenses, totalBalance, netBalanceForMonth, goals, selectedDashboardDate, handleDashboardPreviousMonth, handleDashboardNextMonth } = useAppContext();
    const { theme } = useTheme();
    const firstGoal = goals[0];
    const goalProgress = firstGoal ? (firstGoal.currentAmount / firstGoal.targetAmount) * 100 : 0;

    const cardBaseClasses = "p-6 rounded-2xl border transition-all duration-300";
    const textClass = (theme === 'minimal' || theme === 'brutalist') ? 'text-minimal-text' : 'text-light-text';
    const mediumTextClass = (theme === 'minimal' || theme === 'brutalist') ? 'text-minimal-medium-text' : 'text-medium-text';


    const themeStyles = {
        dark: {
            dateNav: 'bg-dark-blue-card border-dark-blue-border',
            dateButtonHover: 'hover:bg-dark-blue-border',
            incomeCard: `bg-dark-blue-card border-dark-blue-border bg-income-green/10`,
            expenseCard: `bg-dark-blue-card border-dark-blue-border bg-expense-red/10`,
            balanceCard: `bg-dark-blue-card border-dark-blue-border`,
            accumulatedBalanceCard: `bg-dark-blue-card border-dark-blue-border bg-primary-blue/10`,
            goalCard: `bg-dark-blue-card border-dark-blue-border`,
            incomeIconBg: 'bg-income-green/10',
            expenseIconBg: 'bg-expense-red/10',
            balanceIconBg: 'bg-primary-blue/10',
            incomeText: 'text-income-green',
            expenseText: 'text-expense-red',
            balanceText: 'text-primary-blue',
            progressBarBg: 'bg-dark-blue-bg',
            progressFill: 'bg-primary-blue',
            detailsButton: 'text-primary-blue bg-primary-blue/10 hover:bg-primary-blue/20',
        },
        neon: {
            dateNav: 'bg-card-bg border-border-color',
            dateButtonHover: 'hover:bg-border-color',
            incomeCard: `bg-card-bg border-border-color hover:border-neon-green/50 hover:shadow-lg hover:shadow-neon-green/10`,
            expenseCard: `bg-card-bg border-border-color hover:border-neon-red/50 hover:shadow-lg hover:shadow-neon-red/10`,
            balanceCard: `bg-card-bg border-border-color`,
            accumulatedBalanceCard: `bg-card-bg border-border-color hover:border-neon-cyan/50 hover:shadow-lg hover:shadow-neon-cyan/10`,
            goalCard: `bg-card-bg border-border-color`,
            incomeIconBg: 'bg-neon-green/10',
            expenseIconBg: 'bg-neon-red/10',
            balanceIconBg: 'bg-neon-cyan/10',
            incomeText: 'text-neon-green text-glow-green',
            expenseText: 'text-neon-red text-glow-red',
            balanceText: 'text-neon-cyan text-glow-cyan',
            progressBarBg: 'bg-dark-bg',
            progressFill: 'bg-neon-cyan',
            detailsButton: 'text-neon-cyan bg-neon-cyan/10 hover:bg-neon-cyan/20',
        },
        minimal: {
            dateNav: 'bg-minimal-card border-minimal-border',
            dateButtonHover: 'hover:bg-gray-100',
            incomeCard: `bg-minimal-card border-minimal-border hover:border-minimal-income`,
            expenseCard: `bg-minimal-card border-minimal-border hover:border-minimal-expense`,
            balanceCard: `bg-minimal-card border-minimal-border`,
            accumulatedBalanceCard: `bg-minimal-card border-minimal-border hover:border-minimal-accent`,
            goalCard: `bg-minimal-card border-minimal-border`,
            incomeIconBg: 'bg-minimal-income/10',
            expenseIconBg: 'bg-minimal-expense/10',
            balanceIconBg: 'bg-minimal-accent/10',
            incomeText: 'text-minimal-income',
            expenseText: 'text-minimal-expense',
            balanceText: 'text-minimal-accent',
            progressBarBg: 'bg-gray-200',
            progressFill: 'bg-minimal-accent',
            detailsButton: 'text-minimal-accent bg-minimal-accent/10 hover:bg-minimal-accent/20',
        },
        brutalist: {
            dateNav: 'brutalist-card',
            dateButtonHover: 'hover:bg-gray-200',
            incomeCard: `brutalist-card bg-minimal-income/20`,
            expenseCard: `brutalist-card bg-minimal-expense/20`,
            balanceCard: `brutalist-card`,
            accumulatedBalanceCard: `brutalist-card bg-minimal-accent/20`,
            goalCard: `brutalist-card`,
            incomeIconBg: 'bg-transparent border border-brutalist-border',
            expenseIconBg: 'bg-transparent border border-brutalist-border',
            balanceIconBg: 'bg-transparent border border-brutalist-border',
            incomeText: 'text-brutalist-income',
            expenseText: 'text-brutalist-expense',
            balanceText: 'text-brutalist-accent',
            progressBarBg: 'bg-brutalist-bg border border-brutalist-border',
            progressFill: 'bg-brutalist-accent',
            detailsButton: 'text-brutalist-accent brutalist-button bg-brutalist-accent/20',
        },
        glass: {
            dateNav: 'bg-white/10 border-white/20 backdrop-blur-md',
            dateButtonHover: 'hover:bg-white/20',
            incomeCard: 'bg-white/10 border-white/20 backdrop-blur-md hover:border-white/40',
            expenseCard: 'bg-white/10 border-white/20 backdrop-blur-md hover:border-white/40',
            balanceCard: 'bg-white/10 border-white/20 backdrop-blur-md',
            accumulatedBalanceCard: 'bg-white/10 border-white/20 backdrop-blur-md hover:border-white/40',
            goalCard: 'bg-white/10 border-white/20 backdrop-blur-md',
            incomeIconBg: 'bg-white/10',
            expenseIconBg: 'bg-white/10',
            balanceIconBg: 'bg-white/10',
            incomeText: 'text-income-green',
            expenseText: 'text-expense-red',
            balanceText: 'text-glass-accent',
            progressBarBg: 'bg-white/10',
            progressFill: 'bg-glass-accent',
            detailsButton: 'text-glass-accent bg-glass-accent/10 hover:bg-glass-accent/20',
        },
        cyberpunk: {
            dateNav: 'bg-cyber-card border-cyber-border',
            dateButtonHover: 'hover:bg-cyber-border',
            incomeCard: `bg-cyber-card border-cyber-border hover:border-cyber-income`,
            expenseCard: `bg-cyber-card border-cyber-border hover:border-cyber-expense`,
            balanceCard: `bg-cyber-card border-cyber-border`,
            accumulatedBalanceCard: `bg-cyber-card border-cyber-border hover:border-cyber-accent`,
            goalCard: `bg-cyber-card border-cyber-border`,
            incomeIconBg: 'bg-cyber-income/10',
            expenseIconBg: 'bg-cyber-expense/10',
            balanceIconBg: 'bg-cyber-accent/10',
            incomeText: 'text-cyber-income',
            expenseText: 'text-cyber-expense',
            balanceText: 'text-cyber-accent',
            progressBarBg: 'bg-cyber-bg',
            progressFill: 'bg-cyber-accent',
            detailsButton: 'text-cyber-accent bg-cyber-accent/10 hover:bg-cyber-accent/20',
        }
    };
    
    const styles = themeStyles[theme];
    const netBalanceMonthTextClasses = netBalanceForMonth >= 0 ? styles.incomeText : styles.expenseText;
    const netBalanceIconBg = netBalanceForMonth >= 0 ? styles.incomeIconBg : styles.expenseIconBg;

    return (
        <div className="p-4 md:p-8 space-y-6">
             {/* Date Navigator */}
            <div className={`flex justify-between items-center p-2 rounded-xl border ${styles.dateNav}`}>
                <button onClick={handleDashboardPreviousMonth} className={`p-2 rounded-full transition-colors ${styles.dateButtonHover}`} aria-label="Mês anterior">
                    <ChevronLeftIcon className={`w-5 h-5 ${mediumTextClass}`} />
                </button>
                <h3 className={`font-semibold text-lg ${textClass} capitalize`}>
                    {selectedDashboardDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
                </h3>
                <button onClick={handleDashboardNextMonth} className={`p-2 rounded-full transition-colors ${styles.dateButtonHover}`} aria-label="Próximo mês">
                    <ChevronRightIcon className={`w-5 h-5 ${mediumTextClass}`} />
                </button>
            </div>

            {/* Income & Expense Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Receita do Mês Card */}
                <div className={`${cardBaseClasses} ${styles.incomeCard}`}>
                    <div className="flex items-center space-x-3 mb-3">
                         <div className={`p-2 rounded-lg ${styles.incomeIconBg}`}>
                            <ArrowDownTrayIcon className={`w-5 h-5 ${styles.incomeText}`} />
                        </div>
                        <p className={`${mediumTextClass} font-medium`}>Receita Total</p>
                    </div>
                    <p className={`text-3xl font-bold ${styles.incomeText}`}>{formatCurrency(totalIncome)}</p>
                </div>

                {/* Despesa do Mês Card */}
                <div className={`${cardBaseClasses} ${styles.expenseCard}`}>
                    <div className="flex items-center space-x-3 mb-3">
                        <div className={`p-2 rounded-lg ${styles.expenseIconBg}`}>
                            <ArrowUpTrayIcon className={`w-5 h-5 ${styles.expenseText}`} />
                        </div>
                        <p className={`${mediumTextClass} font-medium`}>Despesa do Mês</p>
                    </div>
                    <p className={`text-3xl font-bold ${styles.expenseText}`}>{formatCurrency(totalExpenses)}</p>
                </div>
            </div>
            
            {/* Balance Cards */}
            <div className="grid grid-cols-2 gap-6">
                 {/* Saldo do Mês Card */}
                <div className={`p-4 sm:p-6 rounded-2xl border transition-all duration-300 ${styles.balanceCard}`}>
                    <div className="flex items-center space-x-2 sm:space-x-3 mb-3">
                         <div className={`p-2 rounded-lg ${netBalanceIconBg}`}>
                            <WalletIcon className={`w-5 h-5 ${netBalanceMonthTextClasses}`} />
                        </div>
                        <p className={`${mediumTextClass} font-medium text-sm sm:text-base whitespace-nowrap`}><span className="hidden sm:inline">Saldo do </span>Mês</p>
                    </div>
                    <p className={`text-2xl sm:text-3xl font-bold ${netBalanceMonthTextClasses}`}>{formatCurrency(netBalanceForMonth)}</p>
                </div>

                {/* Saldo Acumulado Card */}
                <div className={`p-4 sm:p-6 rounded-2xl border transition-all duration-300 ${styles.accumulatedBalanceCard}`}>
                    <div className="flex items-center space-x-2 sm:space-x-3 mb-3">
                         <div className={`p-2 rounded-lg ${styles.balanceIconBg}`}>
                            <BanknotesIcon className={`w-5 h-5 ${styles.balanceText}`} />
                        </div>
                        <p className={`${mediumTextClass} font-medium text-sm sm:text-base whitespace-nowrap`}><span className="hidden sm:inline">Saldo </span>Acumulado</p>
                    </div>
                    <p className={`text-2xl sm:text-3xl font-bold ${styles.balanceText}`}>{formatCurrency(totalBalance)}</p>
                </div>
            </div>

            {/* Bottom row with Goals */}
            <div className="grid grid-cols-1 gap-6">
                {firstGoal && (
                     <div className={`p-6 rounded-2xl flex flex-col border ${styles.goalCard}`}>
                        <div className="flex items-center space-x-3 mb-4">
                             <div className={`p-2 rounded-lg ${styles.balanceIconBg}`}>
                                <FlagIcon className={`w-6 h-6 ${styles.balanceText}`} />
                            </div>
                            <div>
                                <h3 className={`text-lg font-bold ${textClass}`}>Próxima Meta</h3>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                            <div className="flex justify-between items-baseline mb-1">
                                <p className={`font-semibold ${textClass}`}>{firstGoal.name}</p>
                                <p className={`text-sm font-bold ${styles.balanceText}`}>{goalProgress.toFixed(0)}%</p>
                            </div>
                            <div className={`w-full rounded-full h-2.5 ${styles.progressBarBg}`}>
                                <div className={`h-2.5 rounded-full ${styles.progressFill}`} style={{ width: `${goalProgress > 100 ? 100 : goalProgress}%` }}></div>
                            </div>
                        </div>
                        <button onClick={() => navigateTo('goals')} className={`${styles.detailsButton} font-semibold mt-6 flex items-center space-x-1 justify-center w-full py-2 rounded-lg`}>
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