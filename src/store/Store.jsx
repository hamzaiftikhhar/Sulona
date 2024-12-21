import { create } from "zustand";

const useCartStore = create((set) => ({
  cart: [],
  action: {
    addToCart: (addedProduct) => {
      set((state) => {
        let newCartValue = [];
        let isAlreadyAdded = state.cart.some((product) => {
          return product._id === addedProduct._id;
        });
        
        if (isAlreadyAdded) {
          newCartValue = state.cart.map((product) => {
            if (product._id === addedProduct._id) {
              return { ...product, quantity: product.quantity + 1 };
            }
            return product;
          });
        } else {
          newCartValue = [...state.cart, { ...addedProduct, quantity: 1 }];
        }
        return { cart: newCartValue };
      });
    },

    removeFromCart: (productId) => {
      set((state) => {
        let filteredCart = state.cart.filter(
          (product) => product._id !== productId
        );
        return { cart: filteredCart };
      });
    },

    addProductQuantity(_id, newQty) {
      if (newQty > 20) return;
      set((state) => {
        if (newQty < 0) {
          state.action.removeFromCart(_id);
          return {};
        }
        let newCartValue = state.cart.map((product) => {
          if (product._id === _id) {
            return { ...product, quantity: newQty };
          }
          return product;
        });

        return { cart: newCartValue };
      });
    },

    emptyCart() {
      set({ cart: [] }); 
    },
  },
}));

export const useCart = () => useCartStore((store) => store.cart);
export const useCartActions = () => useCartStore((store) => store.action);