import { useState } from "react";
import { useAppStore } from "../../../store/AppContext";

export function InfoTableSheet({ tables, selectedTableId}) {
  const table = tables.find((t) => t.id === selectedTableId);

  const [newName, setNewName] = useState("");
  const { dispatch } = useAppStore();

  const onRenameTable = () => {};

  const onToggleReserved = () => {};

  const onCloseBill = () => {
    dispatch({type: "CLOSE_BILL", payload: table.id})
  };

  const onDeleteTable = () =>{}
  

  if (!table) {
    return <div className="text-gray-500">Nessun tavolo selezionato</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-5">
        {/* 🪑 TITLE */}
        <h2 className="text-lg font-bold">Gestione {table.name}</h2>

        {/* ✏️ RINOMINA TAVOLO */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-500">Cambia nome tavolo</label>

          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border p-2 rounded"
          />

          <button
            onClick={() => onRenameTable(table.id, newName)}
            className="bg-black text-white p-2 rounded"
          >
            Salva nome
          </button>
        </div>

        {/* 💎 PRENOTATO PREMIUM */}
        <button
          onClick={() => onToggleReserved(table.id)}
          className={`p-3 rounded ${
            table.reserved ? "bg-yellow-500 text-black" : "bg-gray-100"
          }`}
        >
          {table.reserved
            ? "Rimuovi prenotazione"
            : "Imposta Prenotato (Premium)"}
        </button>

        {/* 💰 CHIUDI CONTO */}
        <button
          onClick={() => onCloseBill(table.id)}
          className="bg-green-600 text-white p-3 rounded"
        >
          Chiudi conto
        </button>

        {/* 🗑️ ELIMINA TAVOLO */}
        <button
          onClick={() => onDeleteTable(table.id)}
          className="bg-red-500 text-white p-3 rounded"
        >
          Elimina tavolo
        </button>

      </div>
    </>
  );
}
