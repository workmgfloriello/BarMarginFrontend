import { useState } from "react";
import { Topbar } from "../../../shared/components/Topbar";
import { ProductRow } from "../component/ProductRow";
import { BottomSheet } from "../../../shared/components/BottomSheet";
import { ProductForm } from "../component/ProductForm";
import { IngredientRow } from "../component/IngredientRow";

export function ProductPage() {
  const [openSheet, setOpenSheet] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [products, setProducts] = useState([
    { id: 1, name: "Spritz", price: 8, cost: 2.2 },
    { id: 2, name: "Mojito", price: 10, cost: 2.5 },
    { id: 3, name: "Negroni", price: 9, cost: 2.8 },
    { id: 4, name: "Birra", price: 5, cost: 1.5 },
    { id: 5, name: "Gin Tonic", price: 9, cost: 2.3 },
    { id: 6, name: "Americano", price: 8, cost: 2.0 },
    { id: 7, name: "Coca Cola", price: 3, cost: 0.5 },
    { id: 8, name: "Acqua", price: 2, cost: 0.3 },
  ]);

  const ingredients = [
    { id: 1, name: "Aperol", cost: 0.8, stock: 12, stockMin: 5, trend: -2 },
    { id: 2, name: "Prosecco", cost: 1.2, stock: 20, stockMin: 8, trend: -3 },
    { id: 3, name: "Soda", cost: 0.2, stock: 30, stockMin: 10, trend: -1 },
    { id: 4, name: "Rum", cost: 1.5, stock: 10, stockMin: 4, trend: -2 },
    { id: 5, name: "Menta", cost: 0.3, stock: 5, stockMin: 3, trend: -1 },
    { id: 6, name: "Zucchero", cost: 0.2, stock: 15, stockMin: 5, trend: 0 },
    { id: 7, name: "Lime", cost: 0.5, stock: 8, stockMin: 4, trend: -2 },
    { id: 8, name: "Gin", cost: 1.4, stock: 3, stockMin: 4, trend: -1 },
    { id: 9, name: "Campari", cost: 1.0, stock: 11, stockMin: 5, trend: -2 },
    { id: 10, name: "Vermouth", cost: 0.9, stock: 7, stockMin: 3, trend: -1 },
  ];

  // 👉 ADD / EDIT LOGIC
  const handleSaveProduct = (product) => {
    if (product.id) {
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? product : p))
      );
    } else {
      setProducts((prev) => [
        ...prev,
        { ...product, id: Date.now() },
      ]);
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
          {/* HEADER */}
          <div className="sticky top-0 bg-white z-10 grid grid-cols-5 gap-3 px-5 py-3 border-b font-medium text-xs text-gray-400 uppercase">
            <span>Nome</span>
            <span>Prezzo Vendita</span>
            <span>Costo Preparazione</span>
            <span>Margine</span>
            <span></span>
          </div>

          {/* ROWS */}
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

          <button className="bg-black text-white px-4 py-2 rounded">
            + Aggiungi
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {/* HEADER */}
          <div className="sticky top-0 bg-white z-10 grid grid-cols-6 gap-3 px-5 py-3 border-b font-medium text-xs text-gray-400 uppercase text-center">
            <span >Nome</span>
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