import React, { useState, useEffect } from 'react';
import { Page, Transaction } from './types';
import SideNav from './components/SideNav';
import BottomNav from './components/BottomNav';
import Dashboard from './components/Dashboard';
import ReportsPage from './components/ReportsPage';
import GoalsPage from './components/GoalsPage';
import ProfilePage from './components/ProfilePage';
import AddTransactionModal from './components/modals/AddTransactionModal';
import AddCategoryModal from './components/modals/AddCategoryModal';
import { ArrowDownTrayIcon, XMarkIcon } from './components/icons';
import { useTheme } from './context/ThemeContext';

const App: React.FC = () => {
    const { theme } = useTheme();
    const [currentPage, setCurrentPage] = useState<Page>('dashboard');
    const [isAddTransactionModalOpen, setAddTransactionModalOpen] = useState(false);
    const [isAddCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
    const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);
    const [installPrompt, setInstallPrompt] = useState<any>(null);

     useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            setInstallPrompt(e);
        };
        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    useEffect(() => {
        const body = document.querySelector('body');
        if (body) {
            body.className = theme === 'neon' ? 'bg-dark-bg' : 'bg-dark-blue-bg';
            if (currentPage === 'reports') {
                body.classList.add('no-scrollbar');
            } else {
                body.classList.remove('no-scrollbar');
            }
        }
        return () => {
            if (body) {
                body.classList.remove('no-scrollbar');
            }
        }
    }, [currentPage, theme]);

    const handleInstallClick = () => {
        if (!installPrompt) return;
        installPrompt.prompt();
        installPrompt.userChoice.then((choiceResult: { outcome: string }) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            setInstallPrompt(null);
        });
    };

    const handleAddTransactionClick = () => {
        setTransactionToEdit(null);
        setAddTransactionModalOpen(true);
    };

    const handleEditTransaction = (transaction: Transaction) => {
        setTransactionToEdit(transaction);
        setAddTransactionModalOpen(true);
    };
    
    const handleAddCategoryClick = () => {
        setAddCategoryModalOpen(true);
    }

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return <Dashboard navigateTo={setCurrentPage} />;
            case 'reports':
                return <ReportsPage onEditTransaction={handleEditTransaction} />;
            case 'goals':
                return <GoalsPage />;
            case 'profile':
                return <ProfilePage onAddCategoryClick={handleAddCategoryClick} />;
            default:
                return <Dashboard navigateTo={setCurrentPage} />;
        }
    };

    return (
        <div className={`${theme === 'neon' ? 'bg-dark-bg' : 'bg-dark-blue-bg'} text-light-text min-h-screen font-sans`}>
            <SideNav currentPage={currentPage} setCurrentPage={setCurrentPage} onAddClick={handleAddTransactionClick} />
            <main className="md:ml-64 pb-20 md:pb-0">
                {renderPage()}
            </main>
            <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} onAddClick={handleAddTransactionClick} />
            
            <AddTransactionModal 
                isOpen={isAddTransactionModalOpen} 
                onClose={() => setAddTransactionModalOpen(false)}
                transactionToEdit={transactionToEdit}
            />
            <AddCategoryModal 
                isOpen={isAddCategoryModalOpen}
                onClose={() => setAddCategoryModalOpen(false)}
            />

            {installPrompt && (
                <div className="fixed bottom-24 md:bottom-8 right-4 z-50 animate-fade-in-up">
                    <div className={`rounded-2xl shadow-lg p-4 flex items-center space-x-4 max-w-sm ${theme === 'neon' ? 'bg-card-bg border border-border-color' : 'bg-dark-blue-card border border-dark-blue-border'}`}>
                        <ArrowDownTrayIcon className={`w-10 h-10 flex-shrink-0 ${theme === 'neon' ? 'text-neon-cyan' : 'text-primary-blue'}`} />
                        <div className="flex-1">
                            <p className="font-semibold text-light-text">Instale o FinDash!</p>
                            <p className="text-sm text-medium-text">Adicione à sua tela inicial para acesso rápido e offline.</p>
                        </div>
                        <div className="flex flex-col space-y-2">
                           <button onClick={handleInstallClick} className={`px-3 py-1 text-sm font-bold rounded-lg whitespace-nowrap ${theme === 'neon' ? 'bg-neon-cyan text-black hover:bg-neon-cyan/80' : 'bg-primary-blue text-white hover:bg-primary-blue-hover'}`}>
                                Instalar
                            </button>
                             <button onClick={() => setInstallPrompt(null)} className="px-3 py-1 text-sm font-medium text-medium-text hover:text-light-text whitespace-nowrap">
                                Agora não
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;