import { fetchProducts } from "../../features/products/products.api";

export const createProductsSlice = (set, get) => ({
  products: [],
  loadProducts: async () => {
    set({ loadingProducts: true });

    const data = await fetchProducts();

    set({
      products: data,
      loadingProducts: false,
    });
  },

  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),

  updateProduct: (product) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === product.id ? { ...p, ...product } : p
      ),
    })),
});