import { useState } from "react";
import { Topbar } from "../../../shared/components/Topbar";
import { CustomTopbar } from "../../../shared/components/CustomTopbar";
import { OrdersTopbar } from "../component/OrdersTopbar";
import { BottomSheet } from "../../../shared/components/BottomSheet";
import { AddTableSheet } from "../component/AddTableSheet";
import { InfoTableSheet } from "../component/InfoTableSheet";
import useAppStore from "../../../store/useAppStore";

export function OrderPage() {
  const {
    tables,
    products,
    addTable,
    addProductToOrder,
    removeProductFromOrder,
  } = useAppStore();

  const [selectedTableId, setSelectedTableId] = useState(null);
  const [openProductSheet, setOpenProductSheet] = useState(false);
  const [mode, setMode] = useState("Prodotti");
  const [sheet, setSheet] = useState(null);

  const selectedTable = tables.find((t) => t.id === selectedTableId);

  // 🪑 ADD TABLE (Zustand)
  const onAddTable = (tableName) => {
    const newId =
      tables.length > 0 ? Math.max(...tables.map((t) => t.id)) + 1 : 1;

    addTable({
      id: newId,
      name: tableName,
      orderItems: [],
    });
  };

  // 🛒 ADD PRODUCT
  const addProduct = (product) => {
    if (!selectedTableId) return;
    addProductToOrder(selectedTableId, product);
  };

  // ❌ REMOVE PRODUCT
  const removeProduct = (productId) => {
    if (!selectedTableId) return;
    removeProductFromOrder(selectedTableId, productId);
  };

  const changeMode = (type) => {
    setMode(type);
    setSheet(null);
    setOpenProductSheet(false);
  };

  const getTotal = (table) =>
    table.orderItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="flex-1 p-6 bg-gray-100">
      <Topbar />

      <CustomTopbar
        children={
          <OrdersTopbar
            changeMode={changeMode}
            mode={mode}
            onAddTable={() => setSheet("addTable")}
            tables={tables}
            selectedTablesId={selectedTableId}
          />
        }
      />

      {/* 🪑 TAVOLI */}
      <div className="p-6 grid grid-cols-3 gap-4">
        {tables.map((table) => (
          <button
            key={table.id}
            onClick={() => {
              setSelectedTableId(table.id);
              if (mode === "info") setSheet("info");
            }}
            className={`p-6 rounded-xl text-lg font-bold ${
              table.orderItems.length > 0
                ? "bg-green-600 text-white"
                : "bg-black text-gray-500"
            }`}
          >
            {table.name}
          </button>
        ))}
      </div>

      {/* 📌 SIDEBAR ORDINE */}
      {selectedTable && mode === "Prodotti" && (
        <div
          className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transition-transform duration-300 z-40 ${
            selectedTableId ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-4 border-b flex justify-between">
            <h2 className="font-bold">{selectedTable.name}</h2>
            <button onClick={() => setSelectedTableId(null)}>✕</button>
          </div>

          <div className="p-4">
            <div className="space-y-2">
              {selectedTable.orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <span>
                    {item.name} x{item.qty}
                  </span>

                  <div className="flex gap-2 items-center">
                    <span>€{(item.price * item.qty).toFixed(2)}</span>

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

            <div className="flex justify-between font-bold mt-4">
              <span>Totale</span>
              <span>€{getTotal(selectedTable).toFixed(2)}</span>
            </div>

            <button
              onClick={() => setOpenProductSheet(true)}
              className="mt-4 w-full bg-black text-white py-2 rounded"
            >
              + Aggiungi prodotto
            </button>
          </div>
        </div>
      )}

      {/* 🔳 OVERLAY */}
      {openProductSheet && (
        <div
          onClick={() => setOpenProductSheet(false)}
          className="fixed inset-0 bg-black/10 z-40"
        />
      )}

      {/* 📱 BOTTOM SHEET */}
      <BottomSheet isOpen={sheet !== null} onClose={() => setSheet(null)}>
        <div className="flex justify-end mb-3">
          <button
            onClick={() => setSheet(null)}
            className="text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>

        {sheet === "addTable" && (
          <AddTableSheet onAddTable={onAddTable} onClose={() => setSheet(null)} />
        )}

        {sheet === "info" && (
          <InfoTableSheet
            tables={tables}
            selectedTableId={selectedTableId}
            onClose={() => setSheet(null)}
          />
        )}
      </BottomSheet>

      {/* 🛍️ PRODOTTI BOTTOM SHEET */}
      <div
        className={`fixed bottom-0 left-0 right-96 bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 z-50 ${
          openProductSheet ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ height: "50vh" }}
      >
        <div className="p-4 border-b flex justify-between">
          <h3 className="font-bold">Prodotti</h3>
          <button onClick={() => setOpenProductSheet(false)}>✕</button>
        </div>

        <div className="p-4 grid grid-cols-2 gap-3 max-h-full overflow-y-auto">
          {products.map((p) => (
            <button
              key={p.id}
              onClick={() => addProduct(p)}
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