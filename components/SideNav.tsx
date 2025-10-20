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
  
  const styles = {
    dark: {
      aside: 'bg-dark-blue-card border-dark-blue-border',
      header: 'border-dark-blue-border',
      logo: 'text-primary-blue',
      active: 'bg-primary-blue/10 text-primary-blue',
      inactive: 'text-medium-text hover:bg-dark-blue-bg hover:text-light-text',
      button: 'bg-primary-blue hover:bg-primary-blue-hover text-white'
    },
    neon: {
      aside: 'bg-card-bg border-border-color',
      header: 'border-border-color',
      logo: 'text-neon-cyan',
      active: 'bg-neon-cyan/10 text-neon-cyan',
      inactive: 'text-medium-text hover:bg-dark-bg hover:text-light-text',
      button: 'bg-neon-cyan hover:bg-neon-cyan/80 text-black shadow-[0_0_10px_hsla(var(--neon-cyan-hsl),0.7)] hover:shadow-[0_0_15px_hsla(var(--neon-cyan-hsl),0.9)]'
    },
    minimal: {
      aside: 'bg-minimal-card border-minimal-border',
      header: 'border-minimal-border',
      logo: 'text-minimal-accent',
      active: 'bg-minimal-accent/10 text-minimal-accent',
      inactive: 'text-minimal-medium-text hover:bg-gray-100 hover:text-minimal-text',
      button: 'bg-minimal-accent hover:bg-minimal-accent/90 text-white'
    },
    brutalist: {
      aside: 'brutalist-card bg-white',
      header: 'border-b-2 border-brutalist-border',
      logo: 'text-brutalist-text',
      active: 'bg-brutalist-accent/20 text-brutalist-accent brutalist-button',
      inactive: 'text-brutalist-text hover:bg-gray-200',
      button: 'brutalist-button bg-brutalist-accent hover:bg-pink-500 text-white'
    },
    glass: {
      aside: 'bg-white/10 border-white/20 backdrop-blur-md',
      header: 'border-white/20',
      logo: 'text-glass-accent',
      active: 'bg-glass-accent/10 text-glass-accent',
      inactive: 'text-medium-text hover:bg-white/20 hover:text-light-text',
      button: 'bg-glass-accent hover:bg-violet-300 text-black'
    },
    cyberpunk: {
      aside: 'bg-cyber-card border-cyber-border',
      header: 'border-cyber-border',
      logo: 'text-cyber-accent',
      active: 'bg-cyber-accent/10 text-cyber-accent',
      inactive: 'text-medium-text hover:bg-cyber-bg hover:text-light-text',
      button: 'bg-cyber-accent hover:bg-fuchsia-500 text-black shadow-[0_0_10px_#F0F] hover:shadow-[0_0_15px_#F0F]'
    },
  }[theme];

  const textClass = (theme === 'minimal' || theme === 'brutalist') ? 'text-minimal-text' : 'text-light-text';

  return (
    <aside className={`hidden md:flex flex-col w-64 h-screen border-r fixed left-0 top-0 ${styles.aside}`}>
        <div className={`flex items-center justify-center h-20 border-b ${styles.header}`}>
            <CurrencyDollarIcon className={`w-8 h-8 ${styles.logo}`} />
            <span className={`ml-2 text-2xl font-bold ${textClass} tracking-wide`}>FinDash</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
                 const isActive = currentPage === item.page;
                return (
                    <button
                        key={item.page}
                        onClick={() => setCurrentPage(item.page)}
                        className={`w-full flex items-center space-x-4 px-4 py-3 rounded-lg text-md font-semibold transition-all duration-200 ${
                            isActive ? styles.active : styles.inactive
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
        <div className={`p-4 border-t ${styles.header}`}>
             <button
                onClick={onAddClick}
                className={`w-full flex items-center justify-center space-x-2 font-bold py-3 px-6 rounded-lg transition-all duration-300 ${styles.button}`}
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