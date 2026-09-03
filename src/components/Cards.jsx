function Cards({ title, amount }) {
    return (
        <div className = "rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className ="text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</h3>
            <p className = "mt-2 text-2xl font-bold text-slate-900">${amount.toFixed(2)}</p>
        </div>
    )
}
export default Cards