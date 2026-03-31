import React, { createContext, useContext, useMemo, useReducer } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return action.payload;
    case 'ADD_ITEM': {
      const { meal, quantity } = action.payload;
      const existing = state.find((item) => item.id === meal.id);

      if (existing) {
        return state.map((item) =>
          item.id === meal.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }

      return [...state, { ...meal, quantity }];
    }
    case 'REMOVE_ITEM':
      return state.filter((item) => item.id !== action.payload);
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return state.filter((item) => item.id !== id);
      }
      return state.map((item) => (item.id === id ? { ...item, quantity } : item));
    }
    case 'CLEAR':
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [persistedItems, setPersistedItems] = useLocalStorage('hn-cart-items', []);
  const [items, dispatch] = useReducer(cartReducer, persistedItems);

  React.useEffect(() => {
    setPersistedItems(items);
  }, [items, setPersistedItems]);

  const addToCart = (meal, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { meal, quantity } });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR' });
  };

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );
  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalPrice,
      totalItems,
    }),
    [items, totalPrice, totalItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};