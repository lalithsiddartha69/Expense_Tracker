import Cards from './Cards';

function Dashboard({ transactions = [] })
{   const NewIncome = transactions.filter((transaction)=>transaction.type === "income");
    const TotalIncome = NewIncome.reduce((total,transaction)=>total + transaction.amount,0);
    const NewExpense = transactions.filter((transaction)=>transaction.type ==="expense");
    const TotalExpense = NewExpense.reduce((total,transaction)=>total+transaction.amount,0);
    return (
        <section className = "bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-3xl font-bold text-slate-800">Dashboard</h2>
            <p className="mt-1 text-slate-500">A quick overview of your money.</p>
            <div className = "mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Cards title="Total Expenses" amount={TotalExpense}/>
                <Cards title="Total Income" amount={TotalIncome} />
                <Cards title="Net Balance" amount={TotalIncome - TotalExpense} />
            </div>

        </section>
    )
}
export default Dashboard