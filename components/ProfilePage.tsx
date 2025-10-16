import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Category, TransactionType } from '../types';
import { getIcon, PlusIcon } from './icons';
import { useTheme } from '../context/ThemeContext';

interface ProfilePageProps {
    onAddCategoryClick: () => void;
}

const CategoryList: React.FC<{ title: string; categories: Category[] }> = ({ title, categories }) => {
    const { theme } = useTheme();
    return (
        <div>
            <h2 className="text-xl font-bold text-light-text mb-4">{title}</h2>
            <div className="space-y-3">
                {categories.map(category => {
                    const IconComponent = getIcon(category.icon);
                    return (
                        <div key={category.id} className={`p-4 rounded-lg flex items-center justify-between border ${theme === 'neon' ? 'bg-card-bg border-border-color' : 'bg-dark-blue-card border-dark-blue-border'}`}>
                            <div className="flex items-center space-x-4">
                                <IconComponent className="w-6 h-6 text-medium-text" />
                                <span className="font-medium text-light-text">{category.name}</span>
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

    const buttonClasses = theme === 'neon' 
      ? 'bg-neon-cyan text-black hover:bg-neon-cyan/80' 
      : 'bg-primary-blue text-white hover:bg-primary-blue-hover';

    return (
        <div className="p-4 md:p-8 space-y-8">
            <header className="flex flex-wrap justify-between items-center gap-4 py-4">
                <h1 className="text-3xl font-bold text-light-text">Configurações</h1>
                 <button 
                    onClick={onAddCategoryClick}
                    className={`flex items-center space-x-2 font-semibold px-4 py-2 rounded-lg ${buttonClasses}`}
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Nova Categoria</span>
                </button>
            </header>

            <div className={`p-6 rounded-2xl border ${theme === 'neon' ? 'bg-card-bg border-border-color' : 'bg-dark-blue-card border-dark-blue-border'}`}>
                <h2 className="text-xl font-bold text-light-text mb-4">Tema</h2>
                {/* FIX: Simplified the ternary logic for theme buttons to remove a TypeScript comparison error and improve readability. */}
                <div className="flex space-x-4">
                    <button
                        onClick={() => setTheme('dark')}
                        className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${theme === 'dark' ? 'bg-primary-blue text-white' : 'bg-dark-bg'}`}
                    >
                        Padrão
                    </button>
                    <button
                        onClick={() => setTheme('neon')}
                        className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${theme === 'neon' ? 'bg-neon-cyan text-black shadow-[0_0_10px_hsl(var(--neon-cyan-hsl))]' : 'bg-dark-blue-bg'}`}
                    >
                        Neon
                    </button>
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