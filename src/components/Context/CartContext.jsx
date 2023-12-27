import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, CartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === CartItemToRemove.id);
    if(existingCartItem.quantity === 1) {
      return cartItems.filter(cartItem => cartItem.id !== CartItemToRemove.id);
    }
    return cartItems.map((cartItem) =>
      cartItem.id === CartItemToRemove.id 
      ? { ...cartItem, quantity: cartItem.quantity - 1 } : 
      cartItem
    );
}

const clearCartItem = (cartItems, CartItemToClear) => {
  return cartItems.filter(cartItem => cartItem.id !== CartItemToClear.id);
}

export const CartContext = createContext({
  isCartOpen: false,
  setCartOpen: () => {},
  cartItems: [],
  AddItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  totalCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setTotalCount(newCartCount)
  }, [cartItems]);
  
  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    setCartTotal(newCartTotal)
  }, [cartItems]);

  const AddItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const removeItemToCart = (CartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, CartItemToRemove));
  };
  const clearItemFromCart = (CartItemToClear) => {
    setCartItems(clearCartItem(cartItems, CartItemToClear));
  };

  const value = { 
    removeItemToCart, 
    isCartOpen, 
    setCartOpen, 
    AddItemToCart, 
    clearItemFromCart,
    cartItems, 
    totalCount,
    cartTotal 
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};