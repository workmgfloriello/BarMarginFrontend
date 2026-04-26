export function ProductForm({ onClose, product }) {
  console.log(product);
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">
        {product ? "Modifica Prodotto" : "Aggiungi Prodotto"}
      </h2>

      <input
        placeholder={product ? "" : "Aggiungi Prodotto"}
        className="border p-2 rounded"
        value={product ? product.name : ""}
      />
      <input
        placeholder="Prezzo (€)"
        type="number"
        className="border p-2 rounded"
        value={product ? product.price : ""}
      />

      <div className="flex gap-2 mt-2">
        <button className="flex-1 bg-black text-white p-2 rounded">
          Salva
        </button>

        <button onClick={onClose} className="flex-1 bg-gray-200 p-2 rounded">
          Annulla
        </button>
      </div>
    </div>
  );
}
