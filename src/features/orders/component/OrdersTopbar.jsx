import { useState } from "react";
import { BottomSheet } from "../../../shared/components/BottomSheet";

export function OrdersTopbar({ onAddTable }) {
  const [openSheet, setOpenSheet] = useState(false);
  const [tableName, setTableName] = useState("");

  return (
    <>
      <div className="bg-white shadow rounded-2xl p-4 flex flex-wrap items-center gap-3 mb-2">
        
        {/* ➕ AGGIUNGI TAVOLO */}
        <button
          onClick={() => setOpenSheet(true)}
          className="bg-black text-white px-4 py-2 rounded-lg text-sm"
        >
          + Tavolo
        </button>

        <button
          onClick={() => alert("Hello")}
          className="bg-gray-100 px-4 py-2 rounded-lg text-sm"
        >
          Info Tavolo
        </button>

        <button className="bg-gray-100 px-4 py-2 rounded-lg text-sm">
          Prodotti
        </button>

        <div className="h-6 w-px bg-gray-200 mx-2" />

        <div className="flex items-center gap-2 text-sm">
          <label className="text-gray-500">Dim. Celle</label>

          <input
            type="number"
            defaultValue={5}
            min={0}
            max={10}
            className="w-16 border rounded-lg px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {/* 📱 BOTTOM SHEET */}
      <BottomSheet
        isOpen={openSheet}
        onClose={() => setOpenSheet(false)}
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">Aggiungi Tavolo</h2>

          <input
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            placeholder="Nome tavolo (es. T4)"
            className="border p-2 rounded"
          />

          <button
            onClick={() => {
              if (!tableName) return;

              onAddTable(tableName); // 🔥 passa al parent
              setTableName("");
              setOpenSheet(false);
            }}
            className="bg-black text-white p-2 rounded"
          >
            Salva
          </button>
        </div>
      </BottomSheet>
    </>
  );
}