import { useState } from "react";

export function OrderPage() {
  const [tables, setTables] = useState([
    { id: 1, name: "T1", orderItems: [] },
    { id: 2, name: "T2", orderItems: [] },
    { id: 3, name: "T3", orderItems: [] },
  ]);

  const products = [
    { id: 1, name: "Spritz", price: 8 },
    { id: 2, name: "Mojito", price: 10 },
    { id: 3, name: "Negroni", price: 9 },
    { id: 4, name: "Gin Tonic", price: 9 },
  ];

  const [selectedTableId, setSelectedTableId] = useState(null);
  const [openProductSheet, setOpenProductSheet] = useState(false);

  const selectedTable = tables.find(t => t.id === selectedTableId);

  // 🍸 aggiunta prodotto
  const addProduct = (product) => {
    setTables(prev =>
      prev.map(table => {
        if (table.id !== selectedTableId) return table;

        const existing = table.orderItems.find(i => i.id === product.id);

        let updatedItems;

        if (existing) {
          updatedItems = table.orderItems.map(i =>
            i.id === product.id
              ? { ...i, qty: i.qty + 1 }
              : i
          );
        } else {
          updatedItems = [
            ...table.orderItems,
            { ...product, qty: 1 }
          ];
        }

        return {
          ...table,
          orderItems: updatedItems,
        };
      })
    );
  };

  // 🧠 rimuovi prodotto
  const removeProduct = (productId) => {
    setTables(prev =>
      prev.map(table => {
        if (table.id !== selectedTableId) return table;

        return {
          ...table,
          orderItems: table.orderItems.filter(i => i.id !== productId),
        };
      })
    );
  };

  const getTotal = (table) =>
    table.orderItems.reduce(
      (sum, i) => sum + i.price * i.qty,
      0
    );

  return (
    <div className="relative h-screen bg-gray-100">

      {/* 🪑 TAVOLI */}
      <div className="p-6 grid grid-cols-3 gap-4">
        {tables.map(table => (
          <button
            key={table.id}
            onClick={() => setSelectedTableId(table.id)}
            className="bg-black text-white p-6 rounded-xl text-lg font-bold"
          >
            {table.name}
          </button>
        ))}
      </div>

      {/* 📌 SIDEBAR ORDINE */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transition-transform duration-300 ${
          selectedTableId ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between">
          <h2 className="font-bold">
            {selectedTable?.name}
          </h2>

          <button onClick={() => setSelectedTableId(null)}>
            ✕
          </button>
        </div>

        {selectedTable && (
          <div className="p-4">

            {/* 🍸 ORDINE */}
            <div className="space-y-2">
              {selectedTable.orderItems.map(item => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <span>
                    {item.name} x{item.qty}
                  </span>

                  <div className="flex gap-2 items-center">
                    <span>
                      €{(item.price * item.qty).toFixed(2)}
                    </span>

                    <button
                      onClick={() => removeProduct(item.id)}
                      className="text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 💰 TOTALE */}
            <div className="flex justify-between font-bold mt-4">
              <span>Totale</span>
              <span>
                €{getTotal(selectedTable).toFixed(2)}
              </span>
            </div>

            {/* ➕ AGGIUNGI */}
            <button
              onClick={() => setOpenProductSheet(true)}
              className="mt-4 w-full bg-black text-white py-2 rounded"
            >
              + Aggiungi prodotto
            </button>
          </div>
        )}
      </div>

      {/* 📱 BOTTOM SHEET (iPhone style) */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 ${
          openProductSheet ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between">
          <h3 className="font-bold">Prodotti</h3>

          <button onClick={() => setOpenProductSheet(false)}>
            ✕
          </button>
        </div>

        <div className="p-4 grid grid-cols-2 gap-3 max-h-80 overflow-y-auto">
          {products.map(p => (
            <button
              key={p.id}
              onClick={() => {
                addProduct(p);
                setOpenProductSheet(false);
              }}
              className="bg-black text-white p-3 rounded"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}