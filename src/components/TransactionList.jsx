function TransactionList({transaction, deleteTransaction})
{
    return(
        <section className ="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className = "text-3xl font-bold text-slate-800">Transaction List</h2>
            {transaction.length === 0 ? (
                <p className="mt-5 rounded-lg border border-dashed border-slate-300 px-4 py-8 text-center text-slate-500">
                    No transactions yet. Add one above to get started.
                </p>
            ) : transaction.map((t) => (
                <div key={t.id} className = "mb-3 flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className = "min-w-0">
                        <p className ="truncate font-semibold text-slate-800">{t.description}</p>
                        <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${t.type === 'income' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                            {t.type}
                        </span>
                    </div>
                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                        <p className={`text-lg font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                        </p>
                        <button className = "rounded-lg border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-200" onClick={() => deleteTransaction(t.id)}>Delete</button>
                    </div>

                </div>
            ))}
        </section>
    )
}
export default TransactionList