import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });

  const saveCart = (items) => {
    setCartItems(items);
    localStorage.setItem('cartItems', JSON.stringify(items));
  };

  const addToCart = (product, qty = 1) => {
    const existing = cartItems.find((item) => item.product === product._id);
    let updated;
    if (existing) {
      updated = cartItems.map((item) =>
        item.product === product._id ? { ...item, qty: item.qty + qty } : item
      );
    } else {
      updated = [
        ...cartItems,
        {
          product: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          stock: product.stock,
          qty,
        },
      ];
    }
    saveCart(updated);
  };

  const removeFromCart = (productId) => {
    saveCart(cartItems.filter((item) => item.product !== productId));
  };

  const updateQty = (productId, qty) => {
    saveCart(
      cartItems.map((item) => (item.product === productId ? { ...item, qty } : item))
    );
  };

  const clearCart = () => saveCart([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);