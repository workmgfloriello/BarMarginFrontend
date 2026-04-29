import { fetchProducts, fetchOrders, fetchIngredients } from "../features/products/products.api";

export const initialState = {
  tables: fetchOrders(),
  products: fetchProducts(),
  ingredients: fetchIngredients(),
  closedBills: [], // ← storico conti chiusi
};

export function appReducer(state, action) {
  switch (action.type) {

    // ─── TAVOLI ───────────────────────────────────────
    case "ADD_TABLE":
      return { ...state, tables: [...state.tables, action.payload] };

    case "DELETE_TABLE":
      return { ...state, tables: state.tables.filter(t => t.id !== action.payload) };

    case "RENAME_TABLE":
      return {
        ...state,
        tables: state.tables.map(t =>
          t.id === action.payload.id ? { ...t, name: action.payload.name } : t
        ),
      };

    case "TOGGLE_RESERVED":
      return {
        ...state,
        tables: state.tables.map(t =>
          t.id === action.payload ? { ...t, reserved: !t.reserved } : t
        ),
      };

    case "CLOSE_BILL": {
      const table = state.tables.find(t => t.id === action.payload);
      const total = table.orderItems.reduce((sum, i) => sum + i.price * i.qty, 0);

      return {
        ...state,
        // svuota il tavolo
        tables: state.tables.map(t =>
          t.id === action.payload ? { ...t, orderItems: [] } : t
        ),
        // salva nello storico
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
    }

    // ─── ORDINI ───────────────────────────────────────
    case "ADD_PRODUCT_TO_ORDER":
      return {
        ...state,
        tables: state.tables.map(table => {
          if (table.id !== action.tableId) return table;
          const existing = table.orderItems.find(i => i.id === action.payload.id);
          return {
            ...table,
            orderItems: existing
              ? table.orderItems.map(i =>
                  i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
                )
              : [...table.orderItems, { ...action.payload, qty: 1 }],
          };
        }),
      };

    case "REMOVE_PRODUCT_FROM_ORDER":
      return {
        ...state,
        tables: state.tables.map(table => {
          if (table.id !== action.tableId) return table;
          return {
            ...table,
            orderItems: table.orderItems
              .map(i => i.id === action.payload ? { ...i, qty: i.qty - 1 } : i)
              .filter(i => i.qty > 0),
          };
        }),
      };

    // ─── PRODOTTI ─────────────────────────────────────
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] };

    case "DELETE_PRODUCT":
      return { ...state, products: state.products.filter(p => p.id !== action.payload) };

    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map(p =>
          p.id === action.payload.id ? { ...p, ...action.payload } : p
        ),
      };

    // ─── INGREDIENTI ──────────────────────────────────
    case "ADD_INGREDIENT":
      return { ...state, ingredients: [...state.ingredients, action.payload] };

    case "DELETE_INGREDIENT":
      return { ...state, ingredients: state.ingredients.filter(i => i.id !== action.payload) };

    case "UPDATE_INGREDIENT":
      return {
        ...state,
        ingredients: state.ingredients.map(i =>
          i.id === action.payload.id ? { ...i, ...action.payload } : i
        ),
      };

    default:
      return state;
  }
}