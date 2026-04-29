import { useState } from "react";

export function AddTableSheet({ onAddTable, onClose }) {
  const [tableName, setTableName] = useState("");

  return (
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

          onAddTable(tableName);
          setTableName("");
          onClose();
        }}
        className="bg-black text-white p-2 rounded"
      >
        Salva
      </button>
    </div>
  );
}