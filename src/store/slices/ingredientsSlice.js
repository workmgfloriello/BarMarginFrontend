import { fetchIngredients } from "../../features/products/products.api";

export const createIngredientsSlice = (set, get) => ({
  ingredients: [],
  loadingIngredients: false,

  loadIngredients: async () => {
    set({ loadingIngredients: true });

    const data = await fetchIngredients();

    set({
      ingredients: data,
      loadingIngredients: false,
    });
  },

  addIngredient: (ingredient) =>
    set((state) => ({
      ingredients: [...state.ingredients, ingredient],
    })),

  deleteIngredient: (id) =>
    set((state) => ({
      ingredients: state.ingredients.filter((i) => i.id !== id),
    })),

  updateIngredient: (ingredient) =>
    set((state) => ({
      ingredients: state.ingredients.map((i) =>
        i.id === ingredient.id ? { ...i, ...ingredient } : i
      ),
    })),

  getProductMargin: (productId) => {
    const state = get();
    const product = state.products.find((p) => p.id === productId);

    if (!product || !product.ingredientIds) return null;

    const cost = product.ingredientIds.reduce((sum, { id, qty }) => {
      const ing = state.ingredients.find((i) => i.id === id);
      return ing ? sum + ing.costPerUnit * qty : sum;
    }, 0);

    const margin = product.price - cost;

    return {
      cost,
      margin,
      marginPct: product.price > 0 ? (margin / product.price) * 100 : 0,
    };
  },
});