import { useState } from "react";
import useAppStore from "../../../store/useAppStore";

export function RecipePage() {
  const { products, ingredients, addIngredient, updateProduct } = useAppStore();

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [ingredientId, setIngredientId] = useState("");
  const [qty, setQty] = useState(1);

  const selectedProduct = products.find(p => p.id === selectedProductId);

  const addIngredientToRecipe = () => {
    if (!selectedProduct || !ingredientId) return;

    const updatedRecipe = selectedProduct.ingredientIds
      ? [...selectedProduct.ingredientIds]
      : [];

    updatedRecipe.push({
      id: Number(ingredientId),
      qty: Number(qty)
    });

    updateProduct({
      ...selectedProduct,
      ingredientIds: updatedRecipe
    });

    setIngredientId("");
    setQty(1);
  };

  return (
    <div className="p-6 grid grid-cols-2 gap-6">
      {/* PRODUCTS */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold mb-3">Prodotti</h2>
        <div className="space-y-2">
          {products.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedProductId(p.id)}
              className={`w-full text-left p-2 rounded ${selectedProductId === p.id ? "bg-black text-white" : "bg-gray-100"}`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* RECIPE EDITOR */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold mb-3">Ricetta</h2>

        {!selectedProduct ? (
          <p className="text-gray-400">Seleziona un prodotto</p>
        ) : (
          <>
            <h3 className="font-semibold mb-2">{selectedProduct.name}</h3>

            {/* CURRENT INGREDIENTS */}
            <div className="mb-4 space-y-1">
              {(selectedProduct.ingredientIds || []).map((i, idx) => {
                const ing = ingredients.find(x => x.id === i.id);
                return (
                  <div key={idx} className="flex justify-between text-sm">
                    <span>{ing?.name || "?"} x{i.qty}</span>
                  </div>
                );
              })}
            </div>

            {/* ADD INGREDIENT */}
            <div className="flex gap-2">
              <select
                value={ingredientId}
                onChange={(e) => setIngredientId(e.target.value)}
                className="border p-2 rounded flex-1"
              >
                <option value="">Ingrediente</option>
                {ingredients.map(i => (
                  <option key={i.id} value={i.id}>{i.name}</option>
                ))}
              </select>

              <input
                type="number"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="border p-2 rounded w-20"
                min="0.1"
                step="0.1"
              />

              <button
                onClick={addIngredientToRecipe}
                className="bg-black text-white px-3 rounded"
              >
                +
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}