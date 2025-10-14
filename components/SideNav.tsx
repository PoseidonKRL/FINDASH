import React from 'react';
import { Page } from '../types';
import { HomeIcon, ChartBarIcon, FlagIcon, UserIcon, PlusIcon, CurrencyDollarIcon } from './icons';

interface SideNavProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  onAddClick: () => void;
}

const SideNav: React.FC<SideNavProps> = ({ currentPage, setCurrentPage, onAddClick }) => {
  const navItems = [
    { page: 'dashboard' as Page, icon: HomeIcon, label: 'Dashboard' },
    { page: 'reports' as Page, icon: ChartBarIcon, label: 'Relatórios' },
    { page: 'goals' as Page, icon: FlagIcon, label: 'Metas' },
    { page: 'profile' as Page, icon: UserIcon, label: 'Perfil' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-navy-800 border-r border-navy-700 fixed left-0 top-0">
        <div className="flex items-center justify-center h-20 border-b border-navy-700">
            <CurrencyDollarIcon className="w-8 h-8 text-primary" />
            <span className="ml-2 text-2xl font-bold text-light-text tracking-wide">FinDash</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
                 const isActive = currentPage === item.page;
                return (
                    <button
                        key={item.page}
                        onClick={() => setCurrentPage(item.page)}
                        className={`w-full flex items-center space-x-4 px-4 py-3 rounded-lg text-md font-semibold transition-all duration-200 ${
                            isActive ? 'bg-primary text-white shadow-lg shadow-blue-500/20' : 'text-medium-text hover:bg-navy-900/50 hover:text-light-text'
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
        <div className="p-4 border-t border-navy-700">
             <button
                onClick={onAddClick}
                className="w-full flex items-center justify-center space-x-2 bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-blue-500/20 transition-transform hover:scale-105"
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