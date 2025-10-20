import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Category, TransactionType } from '../types';
import { getIcon, PlusIcon } from './icons';
import { useTheme, Theme } from '../context/ThemeContext';

interface ProfilePageProps {
    onAddCategoryClick: () => void;
}

const CategoryList: React.FC<{ title: string; categories: Category[] }> = ({ title, categories }) => {
    const { theme } = useTheme();

    const cardClasses = {
      dark: 'bg-dark-blue-card border-dark-blue-border',
      neon: 'bg-card-bg border-border-color',
      minimal: 'bg-minimal-card border-minimal-border',
      brutalist: 'brutalist-card',
      glass: 'bg-white/10 border-white/20 backdrop-blur-md',
      cyberpunk: 'bg-cyber-card border-cyber-border'
    }[theme];

    const textClass = (theme === 'minimal' || theme === 'brutalist') ? 'text-minimal-text' : 'text-light-text';
    const mediumTextClass = (theme === 'minimal' || theme === 'brutalist') ? 'text-minimal-medium-text' : 'text-medium-text';


    return (
        <div>
            <h2 className={`text-xl font-bold ${textClass} mb-4`}>{title}</h2>
            <div className="space-y-3">
                {categories.map(category => {
                    const IconComponent = getIcon(category.icon);
                    return (
                        <div key={category.id} className={`p-4 rounded-lg flex items-center justify-between border ${cardClasses}`}>
                            <div className="flex items-center space-x-4">
                                <IconComponent className={`w-6 h-6 ${mediumTextClass}`} />
                                <span className={`font-medium ${textClass}`}>{category.name}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onAddCategoryClick }) => {
    const { categories } = useAppContext();
    const { theme, setTheme } = useTheme();

    const incomeCategories = categories.filter(c => c.type === TransactionType.INCOME);
    const expenseCategories = categories.filter(c => c.type === TransactionType.EXPENSE);
    
    const themes: { id: Theme, name: string, activeClass: string }[] = [
        { id: 'dark', name: 'Padrão', activeClass: 'bg-primary-blue text-white' },
        { id: 'neon', name: 'Neon', activeClass: 'bg-neon-cyan text-black shadow-[0_0_10px_hsl(var(--neon-cyan-hsl))]' },
        { id: 'minimal', name: 'Minimalista', activeClass: 'bg-minimal-accent text-white' },
        { id: 'glass', name: 'Translúcido', activeClass: 'bg-glass-accent text-black backdrop-blur-sm shadow-lg' },
        { id: 'cyberpunk', name: 'Cyberpunk', activeClass: 'bg-cyber-accent text-black shadow-[0_0_10px_#F0F]' },
        { id: 'brutalist', name: 'Brutalista', activeClass: 'bg-brutalist-accent text-white brutalist-button' },
    ];

    const inactiveButtonClasses: Record<Theme, string> = {
        dark: 'bg-dark-blue-bg hover:bg-dark-blue-border',
        neon: 'bg-dark-bg hover:bg-border-color',
        minimal: 'bg-gray-100 hover:bg-gray-200 text-minimal-text',
        brutalist: 'bg-white hover:bg-gray-200 text-brutalist-text brutalist-card',
        glass: 'bg-white/5 hover:bg-white/10 text-light-text',
        cyberpunk: 'bg-cyber-bg hover:bg-cyber-border text-light-text'
    };

    const cardClasses = {
      dark: 'bg-dark-blue-card border-dark-blue-border',
      neon: 'bg-card-bg border-border-color',
      minimal: 'bg-minimal-card border-minimal-border',
      brutalist: 'brutalist-card',
      glass: 'bg-white/10 border-white/20 backdrop-blur-md',
      cyberpunk: 'bg-cyber-card border-cyber-border'
    }[theme];

    const buttonClasses = {
      dark: 'bg-primary-blue text-white hover:bg-primary-blue-hover',
      neon: 'bg-neon-cyan text-black hover:bg-neon-cyan/80',
      minimal: 'bg-minimal-accent text-white',
      brutalist: 'brutalist-button bg-brutalist-accent text-white',
      glass: 'bg-glass-accent text-black',
      cyberpunk: 'bg-cyber-accent text-black'
    }[theme];

    const textClass = (theme === 'minimal' || theme === 'brutalist') ? 'text-minimal-text' : 'text-light-text';

    return (
        <div className="p-4 md:p-8 space-y-8">
            <header className="flex flex-wrap justify-between items-center gap-4 py-4">
                <h1 className={`text-3xl font-bold ${textClass}`}>Configurações</h1>
                 <button 
                    onClick={onAddCategoryClick}
                    className={`flex items-center space-x-2 font-semibold px-4 py-2 rounded-lg ${buttonClasses}`}
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Nova Categoria</span>
                </button>
            </header>

            <div className={`p-6 rounded-2xl border ${cardClasses}`}>
                <h2 className={`text-xl font-bold ${textClass} mb-4`}>Tema</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {themes.map(themeOption => (
                        <button
                            key={themeOption.id}
                            onClick={() => setTheme(themeOption.id)}
                            className={`py-3 px-4 rounded-lg font-semibold transition-all text-center
                                ${theme === themeOption.id ? themeOption.activeClass : inactiveButtonClasses[theme]}
                            `}
                        >
                            {themeOption.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <CategoryList title="Categorias de Receitas" categories={incomeCategories} />
                <CategoryList title="Categorias de Despesas" categories={expenseCategories} />
            </div>
        </div>
    );
};

export default ProfilePage;