import React from 'react';
import { Page } from '../types';
import { HomeIcon, ChartBarIcon, FlagIcon, UserIcon, PlusIcon, CurrencyDollarIcon } from './icons';
import { useTheme } from '../context/ThemeContext';

interface SideNavProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  onAddClick: () => void;
}

const SideNav: React.FC<SideNavProps> = ({ currentPage, setCurrentPage, onAddClick }) => {
  const { theme } = useTheme();
  const navItems = [
    { page: 'dashboard' as Page, icon: HomeIcon, label: 'Dashboard' },
    { page: 'reports' as Page, icon: ChartBarIcon, label: 'Relatórios' },
    { page: 'goals' as Page, icon: FlagIcon, label: 'Metas' },
    { page: 'profile' as Page, icon: UserIcon, label: 'Perfil' },
  ];

  return (
    <aside className={`hidden md:flex flex-col w-64 h-screen border-r fixed left-0 top-0 ${theme === 'neon' ? 'bg-card-bg border-border-color' : 'bg-dark-blue-card border-dark-blue-border'}`}>
        <div className={`flex items-center justify-center h-20 border-b ${theme === 'neon' ? 'border-border-color' : 'border-dark-blue-border'}`}>
            <CurrencyDollarIcon className={`w-8 h-8 ${theme === 'neon' ? 'text-neon-cyan' : 'text-primary-blue'}`} />
            <span className="ml-2 text-2xl font-bold text-light-text tracking-wide">FinDash</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
                 const isActive = currentPage === item.page;
                 const activeClasses = theme === 'neon' ? 'bg-neon-cyan/10 text-neon-cyan' : 'bg-primary-blue/10 text-primary-blue';
                 const inactiveClasses = theme === 'neon' ? 'text-medium-text hover:bg-dark-bg hover:text-light-text' : 'text-medium-text hover:bg-dark-blue-bg hover:text-light-text';

                return (
                    <button
                        key={item.page}
                        onClick={() => setCurrentPage(item.page)}
                        className={`w-full flex items-center space-x-4 px-4 py-3 rounded-lg text-md font-semibold transition-all duration-200 ${
                            isActive ? activeClasses : inactiveClasses
                        }`}
                        aria-label={`Ir para ${item.label}`}
                        aria-current={isActive ? 'page' : undefined}
                    >
                       <item.icon className="w-6 h-6" />
                       <span>{item.label}</span>
                    </button>
                );
            })}
        </nav>
        <div className={`p-4 border-t ${theme === 'neon' ? 'border-border-color' : 'border-dark-blue-border'}`}>
             <button
                onClick={onAddClick}
                className={`w-full flex items-center justify-center space-x-2 font-bold py-3 px-6 rounded-lg transition-all duration-300 ${
                  theme === 'neon' 
                  ? 'bg-neon-cyan hover:bg-neon-cyan/80 text-black shadow-[0_0_10px_hsla(var(--neon-cyan-hsl),0.7)] hover:shadow-[0_0_15px_hsla(var(--neon-cyan-hsl),0.9)]' 
                  : 'bg-primary-blue hover:bg-primary-blue-hover text-white'
                }`}
                aria-label="Adicionar nova transação"
              >
                <PlusIcon className="w-5 h-5" />
                <span>Nova Transação</span>
            </button>
        </div>
    </aside>
  );
};

export default SideNav;