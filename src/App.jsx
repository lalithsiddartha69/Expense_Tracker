import { useEffect, useState } from 'react';
import AddTransaction from './components/AddTransaction';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import TransactionList from './components/TransactionList';
function App() {
  const [transaction, setTransaction] = useState(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });
  function addTransaction(newTransaction)
  {
      console.log(newTransaction);
      setTransaction([...transaction, newTransaction]);
  }
  useEffect(() => { 
    localStorage.setItem('transactions', JSON.stringify(transaction));
  }, [transaction]);

  function deleteTransaction(id) {
    const updatedTransaction = transaction.filter((t) => t.id !== id);
    setTransaction(updatedTransaction);
  }
  return (
    <main className="min-h-screen bg-slate-100 py-8">
      <div className = "max-w-4xl mx-auto px-4 sm:px-6">
        <Header />
        <Dashboard transactions={transaction} />
        <AddTransaction addTransaction={addTransaction} />
        <TransactionList transaction={transaction} deleteTransaction={deleteTransaction} />
      </div>
    </main>
  )
}
  
export default App
