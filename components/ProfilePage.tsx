import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Category, TransactionType } from '../types';
import { getIcon, PlusIcon } from './icons';

interface ProfilePageProps {
    onAddCategoryClick: () => void;
}

const CategoryList: React.FC<{ title: string; categories: Category[] }> = ({ title, categories }) => (
    <div>
        <h2 className="text-xl font-bold text-light-text mb-4">{title}</h2>
        <div className="space-y-3">
            {categories.map(category => {
                const IconComponent = getIcon(category.icon);
                return (
                    <div key={category.id} className="bg-navy-800 p-4 rounded-lg flex items-center justify-between border border-navy-700">
                        <div className="flex items-center space-x-4">
                            <IconComponent className="w-6 h-6 text-medium-text" />
                            <span className="font-medium text-light-text">{category.name}</span>
                        </div>
                        {/* Placeholder for future Edit/Delete buttons */}
                    </div>
                );
            })}
        </div>
    </div>
);

const ProfilePage: React.FC<ProfilePageProps> = ({ onAddCategoryClick }) => {
    const { categories } = useAppContext();

    const incomeCategories = categories.filter(c => c.type === TransactionType.INCOME);
    const expenseCategories = categories.filter(c => c.type === TransactionType.EXPENSE);

    return (
        <div className="p-4 md:p-8 space-y-6">
            <header className="flex flex-wrap justify-between items-center gap-4 py-4">
                <h1 className="text-3xl font-bold text-light-text">Categorias</h1>
                <button 
                    onClick={onAddCategoryClick}
                    className="flex items-center space-x-2 bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-hover"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Adicionar Categoria</span>
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <CategoryList title="Receitas" categories={incomeCategories} />
                <CategoryList title="Despesas" categories={expenseCategories} />
            </div>
        </div>
    );
};

export default ProfilePage;
