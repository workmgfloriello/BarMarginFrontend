import { useState } from "react";
import { Topbar } from "../../../shared/components/Topbar";
import { ProductRow } from "../component/ProductRow";
import { BottomSheet } from "../../../shared/components/BottomSheet";
import { ProductForm } from "../component/ProductForm";
import { IngredientRow } from "../component/IngredientRow";
import { useAppStore } from "../../../store/AppContext";

export function ProductPage() {
  const { state, dispatch } = useAppStore();
  const { products, ingredients } = state;

  const [openSheet, setOpenSheet] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSaveProduct = (product) => {
    if (product.id) {
      dispatch({ type: "UPDATE_PRODUCT", payload: product });
    } else {
      dispatch({ type: "ADD_PRODUCT", payload: { ...product, id: Date.now() } });
    }

    setOpenSheet(false);
    setSelectedProduct(null);
  };

  return (
    <div className="flex-1 p-6 bg-gray-100">
      <Topbar />

      {/* ===================== PRODUCTS ===================== */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-semibold">Inventario Prodotti</h3>
          <button
            onClick={() => {
              setSelectedProduct(null);
              setOpenSheet(true);
            }}
            className="bg-black text-white px-4 py-2 rounded"
          >
            + Aggiungi
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto text-center">
          <div className="sticky top-0 bg-white z-10 grid grid-cols-5 gap-3 px-5 py-3 border-b font-medium text-xs text-gray-400 uppercase">
            <span>Nome</span>
            <span>Prezzo Vendita</span>
            <span>Costo Preparazione</span>
            <span>Margine</span>
            <span></span>
          </div>

          {products.map((p) => (
            <ProductRow
              key={p.id}
              {...p}
              onEdit={() => {
                setSelectedProduct(p);
                setOpenSheet(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* ===================== INGREDIENTS ===================== */}
      <div className="mt-10 bg-white p-4 rounded-2xl shadow">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-semibold">Inventario Ingredienti</h3>
          <button
            onClick={() => {
              setSelectedProduct(null);
              setOpenSheet(true);
            }}
            className="bg-black text-white px-4 py-2 rounded"
          >
            + Aggiungi
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto">
          <div className="sticky top-0 bg-white z-10 grid grid-cols-6 gap-3 px-5 py-3 border-b font-medium text-xs text-gray-400 uppercase text-center">
            <span>Nome</span>
            <span>Costo</span>
            <span>Stock</span>
            <span>Stato</span>
            <span>Trend</span>
            <span></span>
          </div>

          {ingredients.map((p) => (
            <IngredientRow
              key={p.id}
              {...p}
              onEdit={() => {
                setSelectedProduct(p);
                setOpenSheet(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* ===================== BOTTOM SHEET ===================== */}
      <BottomSheet
        isOpen={openSheet}
        onClose={() => {
          setOpenSheet(false);
          setSelectedProduct(null);
        }}
      >
        <ProductForm
          product={selectedProduct}
          onSave={handleSaveProduct}
          onClose={() => {
            setOpenSheet(false);
            setSelectedProduct(null);
          }}
        />
      </BottomSheet>
    </div>
  );
}