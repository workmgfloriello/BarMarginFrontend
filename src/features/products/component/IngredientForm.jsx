export function IngredientForm({ onClose }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Aggiungi Ingrediente</h2>

      <input
        placeholder="Nome ingrediente"
        className="border p-2 rounded"
      />

      <input
        placeholder="Costo (€)"
        type="number"
        className="border p-2 rounded"
      />

      <div className="flex gap-2 mt-2">
        <button className="flex-1 bg-black text-white p-2 rounded">
          Salva
        </button>

        <button
          onClick={onClose}
          className="flex-1 bg-gray-200 p-2 rounded"
        >
          Annulla
        </button>
      </div>
    </div>
  );
}