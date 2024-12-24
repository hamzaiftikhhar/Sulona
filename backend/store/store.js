import { create } from 'zustand';
import axios from 'axios';

export const useCart = create((set) => ({
  items: [],
  
  loadCart: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const response = await axios.get('/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ items: response.data });
    } catch (err) {
      console.error('Failed to load cart:', err);
    }
  },

  clearCart: () => set({ items: [] }),

  addProductQuantity: async (productId, quantity) => {
    set(state => {
      const newItems = state.items.map(item => 
        item._id === productId ? { ...item, quantity } : item
      );
      syncCartWithServer(newItems);
      return { items: newItems };
    });
  },

  removeFromCart: async (productId) => {
    set(state => {
      const newItems = state.items.filter(item => item._id !== productId);
      syncCartWithServer(newItems);
      return { items: newItems };
    });
  }
}));

const syncCartWithServer = async (items) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return;

    await axios.post('/api/cart/sync', 
      { items },
      { headers: { Authorization: `Bearer ${token}` }}
    );
  } catch (err) {
    console.error('Failed to sync cart:', err);
  }
};