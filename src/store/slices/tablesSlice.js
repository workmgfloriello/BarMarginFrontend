export const createTablesSlice = (set, get) => ({
  tables: [],

  addTable: (table) =>
    set((state) => ({
      tables: [...state.tables, table],
    })),

  deleteTable: (id) =>
    set((state) => ({
      tables: state.tables.filter((t) => t.id !== id),
    })),

  renameTable: (id, name) =>
    set((state) => ({
      tables: state.tables.map((t) =>
        t.id === id ? { ...t, name } : t
      ),
    })),

  toggleReserved: (id) =>
    set((state) => ({
      tables: state.tables.map((t) =>
        t.id === id ? { ...t, reserved: !t.reserved } : t
      ),
    })),
});