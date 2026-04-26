export function ProductRow({ name, price, cost, onEdit }) {
  const margin = price ? (((price - cost) / price) * 100).toFixed(1) : null;
  const isLow = margin < 50;
  const isMid = margin >= 50 && margin < 70;

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

  return (
    <div className="grid grid-cols-5 gap-3 px-5 py-3 border-t items-center hover:bg-gray-50 transition-colors">
      <span className="font-medium text-sm">{name}</span>
      <span className="text-sm">€{price?.toFixed(2)}</span>
      <span className="text-sm text-gray-500">€{cost?.toFixed(2)}</span>
      {margin ? (
        <div>
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${badgeClass}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${barColor}`} />
            {margin}%
          </span>
          <div className="mt-1 h-1 bg-gray-100 rounded-full w-full">
            <div
              className={`h-1 rounded-full ${barColor}`}
              style={{ width: `${margin}%` }}
            />
          </div>
        </div>
      ) : (
        <span className="text-gray-300 text-xs">—</span>
      )}
      <button
        onClick={onEdit}
        className="text-sm bg-zinc-900 text-white px-2 py-1 rounded"
      >
        Modifica
      </button>
    </div>
  );
}
