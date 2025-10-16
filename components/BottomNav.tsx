import React from 'react';
import { Page } from '../types';
import { HomeIcon, ChartBarIcon, PlusIcon, FlagIcon, UserIcon } from './icons';
import { useTheme } from '../context/ThemeContext';

interface BottomNavProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  onAddClick: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, setCurrentPage, onAddClick }) => {
  const { theme } = useTheme();
  
  const navItems = [
    { page: 'dashboard' as Page, icon: HomeIcon },
    { page: 'reports' as Page, icon: ChartBarIcon },
    { page: 'add' as const, icon: PlusIcon },
    { page: 'goals' as Page, icon: FlagIcon },
    { page: 'profile' as Page, icon: UserIcon },
  ];

  const bgColor = theme === 'neon' ? 'bg-card-bg/80 border-border-color' : 'bg-dark-blue-card/80 border-dark-blue-border';
  const ringColor = theme === 'neon' ? 'ring-dark-bg' : 'ring-dark-blue-bg';
  const activeColor = theme === 'neon' ? 'text-neon-cyan' : 'text-primary-blue';
  
  const addButtonClasses = theme === 'neon' 
    ? "bg-neon-cyan text-black shadow-[0_0_15px_hsl(var(--neon-cyan-hsl))] hover:shadow-[0_0_25px_hsl(var(--neon-cyan-hsl))]"
    : "bg-primary-blue text-white shadow-lg";

  return (
    <div className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto backdrop-blur-lg border-t md:hidden ${bgColor}`}>
      <div className="flex justify-around items-center h-16">
        {navItems.map((item, index) => {
          if (item.page === 'add') {
            return (
              <button
                key={index}
                onClick={onAddClick}
                className={`-mt-6 w-14 h-14 rounded-full flex items-center justify-center ring-4 transition-all duration-300 ${addButtonClasses} ${ringColor}`}
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
                isActive ? activeColor : 'text-medium-text hover:text-light-text'
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