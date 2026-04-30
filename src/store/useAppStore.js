import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createTablesSlice } from "./slices/tablesSlice";
import { createProductsSlice } from "./slices/productsSlice";
import { createBillingSlice } from "./slices/billingSlice";
import { createIngredientsSlice } from "./slices/ingredientsSlice";

const useAppStore = create(
  persist(
    (set, get) => ({
      ...createTablesSlice(set, get),
      ...createProductsSlice(set, get),
      ...createBillingSlice(set, get),
      ...createIngredientsSlice(set, get),
    }),
    {
      name: "barmargin-store",
      partialize: (state) => ({
        tables: state.tables,
        products: state.products,
        closedBills: state.closedBills,
        ingredients: state.ingredients,
      }),
    }
  )
);

export default useAppStore;