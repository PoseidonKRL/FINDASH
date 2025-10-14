import React, { useState } from 'react';
import { Page, Transaction } from './types';
import BottomNav from './components/BottomNav';
import Dashboard from './components/Dashboard';
import ReportsPage from './components/ReportsPage';
import GoalsPage from './components/GoalsPage';
import AddTransactionModal from './components/modals/AddTransactionModal';
import SideNav from './components/SideNav';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isAddTransactionModalOpen, setAddTransactionModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);

  const handleOpenEditTransactionModal = (transaction: Transaction) => {
    setTransactionToEdit(transaction);
    setAddTransactionModalOpen(true);
  };

  const handleCloseTransactionModal = () => {
      setAddTransactionModalOpen(false);
      setTransactionToEdit(null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard navigateTo={setCurrentPage} />;
      case 'reports':
        return <ReportsPage onEditTransaction={handleOpenEditTransactionModal} />;
      case 'goals':
        return <GoalsPage />;
      case 'profile':
        return (
            <div className="p-4 md:p-8 text-light-text">
                <header className="text-center md:text-left py-4">
                    <h1 className="text-2xl font-bold text-light-text">Perfil</h1>
                    <p className="text-medium-text">Esta página está em construção.</p>
                </header>
            </div>
        );
      default:
        return <Dashboard navigateTo={setCurrentPage} />;
    }
  };

  return (
    <div className="bg-navy-900 min-h-screen font-sans text-light-text">
      <div className="flex">
        <SideNav 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onAddClick={() => setAddTransactionModalOpen(true)}
        />
        <main className="flex-1 md:ml-64 pb-24 md:pb-4">
          {renderPage()}
        </main>
      </div>
      <BottomNav
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onAddClick={() => setAddTransactionModalOpen(true)}
      />
      <AddTransactionModal 
        isOpen={isAddTransactionModalOpen}
        onClose={handleCloseTransactionModal}
        transactionToEdit={transactionToEdit}
      />
    </div>
  );
};

export default App;