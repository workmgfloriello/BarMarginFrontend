export function OrdersTopbar({ changeMode, mode, onAddTable }) {
  return (
    <div className="bg-white shadow rounded-2xl p-4 flex flex-wrap items-center gap-3 mb-2">
      <button
        onClick={onAddTable}  // ← usa la prop, non setSheet
        className="bg-black text-white px-4 py-2 rounded-lg text-sm"
      >
        + Tavolo
      </button>

      <button
        onClick={() => changeMode("info")}
        className={`px-4 py-2 rounded-lg text-sm ${mode === "info" ? "bg-black text-white" : "bg-gray-100"}`}
      >
        Info Tavolo
      </button>

      <button
        onClick={() => changeMode("Prodotti")}
        className={`px-4 py-2 rounded-lg text-sm ${mode === "Prodotti" ? "bg-black text-white" : "bg-gray-100"}`}
      >
        Prodotti
      </button>
    </div>
  );
}