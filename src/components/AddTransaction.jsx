import { useState } from 'react';
function AddTransaction({addTransaction}) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('expense');
    function btnClick()
    {   if (!description.trim() || !amount.trim() || Number(amount) <= 0)
        {       alert('Please enter valid description and amount');
            return;
        }
            const newTransaction = {
                id :Date.now(),
                description: description,
                amount: Number(amount),
                type :type
                
            }
            addTransaction(newTransaction);
            setDescription('')
            setAmount('')
            setType('expense')
    }

    return (
        <section className ="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className = "text-3xl font-bold text-slate-800">Add Transaction</h2>

            <div className = "mt-5 grid gap-4 sm:grid-cols-2">
            <input className = "rounded-lg border border-slate-300 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" type="text" placeholder="Enter transaction description"
            value = {description}
            onChange = {(e)=>setDescription(e.target.value)} />

            <input className = "rounded-lg border border-slate-300 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" type="number" placeholder="Enter transaction amount"
            value = {amount}
            onChange = {(e)=>setAmount(e.target.value)} />
            <select className = "rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" value={type} onChange={(e)=>setType(e.target.value)}>
                <option value = "expense">Expense</option>
                <option value = "income">Income</option>
            </select>
            <button className = "rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 sm:col-span-2" onClick={btnClick}>Add Transaction</button>
            </div>
        </section>
        
    )

}
export default AddTransaction
