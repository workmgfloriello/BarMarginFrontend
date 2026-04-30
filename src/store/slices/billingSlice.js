export const createBillingSlice = (set, get) => ({
  closedBills: [],

  addProductToOrder: (tableId, product) =>
    set((state) => ({
      tables: state.tables.map((table) => {
        if (table.id !== tableId) return table;

        const existing = table.orderItems.find(
          (i) => i.id === product.id
        );

        return {
          ...table,
          orderItems: existing
            ? table.orderItems.map((i) =>
                i.id === product.id
                  ? { ...i, qty: i.qty + 1 }
                  : i
              )
            : [...table.orderItems, { ...product, qty: 1 }],
        };
      }),
    })),

  removeProductFromOrder: (tableId, productId) =>
    set((state) => ({
      tables: state.tables.map((table) => {
        if (table.id !== tableId) return table;

        return {
          ...table,
          orderItems: table.orderItems
            .map((i) =>
              i.id === productId
                ? { ...i, qty: i.qty - 1 }
                : i
            )
            .filter((i) => i.qty > 0),
        };
      }),
    })),

  closeBill: (tableId) =>
    set((state) => {
      const table = state.tables.find((t) => t.id === tableId);
      if (!table) return state;

      const total = table.orderItems.reduce(
        (sum, i) => sum + i.price * i.qty,
        0
      );

      return {
        tables: state.tables.map((t) =>
          t.id === tableId ? { ...t, orderItems: [] } : t
        ),
        closedBills: [
          ...state.closedBills,
          {
            id: Date.now(),
            tableName: table.name,
            items: table.orderItems,
            total,
            closedAt: new Date().toLocaleTimeString(),
          },
        ],
      };
    }),

  restoreBill: (bill) =>
    set((state) => ({
      closedBills: state.closedBills.filter(
        (b) => b.id !== bill.id
      ),
      tables: state.tables.map((t) =>
        t.name === bill.tableName
          ? { ...t, orderItems: bill.items }
          : t
      ),
    })),
});