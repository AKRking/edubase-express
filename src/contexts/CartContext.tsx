import { createContext, useContext, useState, ReactNode } from "react";

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

interface CartContextType {
  items: CartItem[];
  addItems: (items: CartItem[]) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItems = (newItems: CartItem[]) => {
    setItems(prevItems => {
      // Filter out duplicates by checking if item.id already exists
      const uniqueNewItems = newItems.filter(
        newItem => !prevItems.some(existingItem => existingItem.id === newItem.id)
      );
      return [...prevItems, ...uniqueNewItems];
    });
  };

  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  const getTotalItems = () => {
    return items.length;
  };

  return (
    <CartContext.Provider value={{
      items,
      addItems,
      removeItem,
      clearCart,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};