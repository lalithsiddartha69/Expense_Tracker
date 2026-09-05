import { useEffect, useState } from 'react';
import AddTransaction from './components/AddTransaction';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import TransactionList from './components/TransactionList';
function App() {
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    fetch('/api/transactions')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load transactions');
        return response.json();
      })
      .then(setTransaction)
      .catch((error) => console.error(error));
  }, []);

  async function addTransaction(newTransaction) {
    const response = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTransaction),
    });
    if (!response.ok) throw new Error('Failed to add transaction');
    const result = await response.json();
    setTransaction((currentTransactions) => [
      ...currentTransactions,
      result.data,
    ]);
  }

  async function deleteTransaction(id) {
    const response = await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete transaction');
    setTransaction((currentTransactions) =>
      currentTransactions.filter((currentTransaction) => currentTransaction.id !== id),
    );
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
