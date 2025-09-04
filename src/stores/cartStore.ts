import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  code: string;
  price: number;
  subject: string;
  board: string;
  level: string;
  type: string;
  yearRange: string;
  component: string;
}

interface CartStore {
  items: CartItem[];
  addItems: (items: CartItem[]) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItems: (newItems: CartItem[]) => {
        set((state) => {
          // Filter out duplicates by checking if item.id already exists
          const uniqueNewItems = newItems.filter(
            newItem => !state.items.some(existingItem => existingItem.id === newItem.id)
          );
          return {
            items: [...state.items, ...uniqueNewItems]
          };
        });
      },

      removeItem: (id: string) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price, 0);
      },

      getTotalItems: () => {
        const { items } = get();
        return items.length;
      }
    }),
    {
      name: 'cart-storage', // localStorage key
      partialize: (state) => ({ items: state.items }), // Only persist items
    }
  )
);