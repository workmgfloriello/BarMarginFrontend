import { useState } from "react";
import { Topbar } from "../../../shared/components/Topbar";
import { ProductRow } from "../component/ProductRow";
import { BottomSheet } from "../../../shared/components/BottomSheet";
import { ProductForm } from "../component/ProductForm";

export function ProductsPage() {
  const [openSheet, setOpenSheet] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [products, setProducts] = useState([
    { id: 1, name: "Spritz", price: 8 },
    { id: 2, name: "Mojito", price: 10 },
    { id: 3, name: "Negroni", price: 9 },
    { id: 4, name: "Birra", price: 5 },
    { id: 5, name: "Gin Tonic", price: 9 },
    { id: 6, name: "Americano", price: 8 },
    { id: 7, name: "Coca Cola", price: 3 },
    { id: 8, name: "Acqua", price: 2 },
  ]);

  const ingredients = [
    { id: 1, name: "Aperol", cost: 0.8 },
    { id: 2, name: "Prosecco", cost: 1.2 },
    { id: 3, name: "Soda", cost: 0.2 },
    { id: 4, name: "Rum", cost: 1.5 },
    { id: 5, name: "Menta", cost: 0.3 },
    { id: 6, name: "Zucchero", cost: 0.2 },
    { id: 7, name: "Lime", cost: 0.5 },
    { id: 8, name: "Gin", cost: 1.4 },
    { id: 9, name: "Campari", cost: 1.0 },
    { id: 10, name: "Vermouth", cost: 0.9 },
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
            <span>Costo Reale</span>
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
          <div className="sticky top-0 bg-white z-10 grid grid-cols-5 gap-3 px-5 py-3 border-b font-medium text-xs text-gray-400 uppercase">
            <span>Nome</span>
            <span>Costo</span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          {ingredients.map((i) => (
            <div
              key={i.id}
              className="grid grid-cols-5 gap-3 px-5 py-3 border-b text-sm"
            >
              <span>{i.name}</span>
              <span>€{i.cost}</span>
            </div>
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