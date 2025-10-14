import React from 'react';
import { Page } from '../types';
import { HomeIcon, ChartBarIcon, PlusIcon, FlagIcon, UserIcon } from './icons';

interface BottomNavProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  onAddClick: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, setCurrentPage, onAddClick }) => {
  const navItems = [
    { page: 'dashboard' as Page, icon: HomeIcon },
    { page: 'reports' as Page, icon: ChartBarIcon },
    { page: 'add' as const, icon: PlusIcon },
    { page: 'goals' as Page, icon: FlagIcon },
    { page: 'profile' as Page, icon: UserIcon },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-navy-800/80 backdrop-blur-lg border-t border-navy-700 md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item, index) => {
          if (item.page === 'add') {
            return (
              <button
                key={index}
                onClick={onAddClick}
                className="bg-primary -mt-6 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30 ring-4 ring-navy-900"
                aria-label="Adicionar transação"
              >
                <item.icon className="w-7 h-7" />
              </button>
            );
          }

          const isActive = currentPage === item.page;
          return (
            <button
              key={index}
              onClick={() => setCurrentPage(item.page)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors duration-200 w-16 ${
                isActive ? 'text-primary' : 'text-medium-text hover:text-light-text'
              }`}
              aria-label={`Ir para ${item.page}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon className="w-7 h-7" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;