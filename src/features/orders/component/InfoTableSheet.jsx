import { useState } from "react";
import useAppStore from "../../../store/useAppStore";

export function InfoTableSheet({ tables, selectedTableId, onClose }) {
  const table = tables.find((t) => t.id === selectedTableId);

  const [newName, setNewName] = useState("");

  const {
    renameTable,
    toggleReserved,
    closeBill,
    deleteTable,
  } = useAppStore();

  const onRenameTable = () => {
    if (!table || !newName.trim()) return;
    renameTable(table.id, newName);
    setNewName("");
  };

  const onToggleReserved = () => {
    if (!table) return;
    toggleReserved(table.id);
  };

  const onCloseBill = () => {
    if (!table) return;
    closeBill(table.id);
    onClose?.();
  };

  const onDeleteTable = () => {
    if (!table) return;
    deleteTable(table.id);
    onClose?.();
  };

  if (!table) {
    return <div className="text-gray-500">Nessun tavolo selezionato</div>;
  }

  return (
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
          placeholder="Nuovo nome..."
        />

        <button
          onClick={onRenameTable}
          className="bg-black text-white p-2 rounded"
        >
          Salva nome
        </button>
      </div>

      {/* 💎 PRENOTATO */}
      <button
        onClick={onToggleReserved}
        className={`p-3 rounded ${
          table.reserved ? "bg-yellow-500 text-black" : "bg-gray-100"
        }`}
      >
        {table.reserved
          ? "Rimuovi prenotazione"
          : "Imposta Prenotato"}
      </button>

      {/* 💰 CHIUDI CONTO */}
      <button
        onClick={onCloseBill}
        className="bg-green-600 text-white p-3 rounded"
      >
        Chiudi conto
      </button>

      {/* 🗑️ ELIMINA */}
      <button
        onClick={onDeleteTable}
        className="bg-red-500 text-white p-3 rounded"
      >
        Elimina tavolo
      </button>
    </div>
  );
}