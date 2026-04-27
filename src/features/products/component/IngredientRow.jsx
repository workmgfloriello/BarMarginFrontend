export function IngredientRow({ name, cost, stock, stockMin, trend = 0, onEdit }) {
  // 📦 Stato scorte
  const isLow = stock <= stockMin;
  const isMid = stock <= stockMin * 1.5;

  const badgeClass = isLow
    ? "bg-red-50 text-red-700"
    : isMid
      ? "bg-amber-50 text-amber-700"
      : "bg-green-50 text-green-700";

  const barColor = isLow
    ? "bg-red-400"
    : isMid
      ? "bg-amber-400"
      : "bg-green-500";

  // 📉 Trend
  const trendLabel =
    trend < 0 ? `↓ ${Math.abs(trend)}/g` :
    trend > 0 ? `↑ ${trend}/g` :
    "—";

  // ⏳ Giorni rimanenti
  const daysLeft =
    trend < 0 ? Math.floor(stock / Math.abs(trend)) : null;

  const stockPercent = Math.min((stock / (stockMin * 2)) * 100, 100);

  return (
    <div className="grid grid-cols-6 gap-3 px-5 py-3 border-t items-center hover:bg-gray-50 transition-colors text-center">
      <span className="font-medium text-sm">{name}</span>

      {/* COSTO */}
      <span className="text-sm">€{cost?.toFixed(2)}</span>

      {/* STOCK */}
      <span className="text-sm">
        {stock}
      </span>

      {/* STATO */}
      <div>
        <span className={`text-xs px-2 py-0.5 rounded-full ${badgeClass}`}>
          {isLow ? "Critico" : isMid ? "Basso" : "OK"}
        </span>

        <div className="mt-1 h-1 bg-gray-100 rounded-full w-full">
          <div
            className={`h-1 rounded-full ${barColor}`}
            style={{ width: `${stockPercent}%` }}
          />
        </div>
      </div>

      {/* TREND + GIORNI */}
      <div className="text-xs text-gray-600">
        <div>{trendLabel}</div>
        {daysLeft && (
          <div className="text-red-500">
            {daysLeft}g
          </div>
        )}
      </div>

      {/* ACTION */}
      <button
        onClick={onEdit}
        className="text-sm bg-black text-white px-2 py-1 rounded"
      >
        Modifica
      </button>
    </div>
  );
}