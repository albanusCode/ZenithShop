import { createContext, useReducer } from 'react';

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

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

const INITIAL_STATE = {
  totalCount: 0,
  cartTotal: 0,
  isCartOpen: false,
  cartItems: [],

}

const cartReducer = (state, action) => {
  const {type, payload} = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      }
    default:
      throw new Error(`unhandled type of ${type} in cartReducer`);
  }
}

export const CartProvider = ({ children }) => {

  const [{isCartOpen, cartItems, totalCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const updateCertItemsReducer = (newCartItems) => {
      const newCartCount = newCartItems.reduce
      ((total, cartItem) => total + cartItem.quantity, 
      0
      );
      const newCartTotal = newCartItems.reduce
      ((total, cartItem) => total + cartItem.quantity * cartItem.price, 
      0
      );
      dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: {cartItems: newCartItems, cartTotal: newCartTotal, totalCount: newCartCount}})

  }

  const AddItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCertItemsReducer(newCartItems);
  };
  const removeItemToCart = (CartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, CartItemToRemove);
    updateCertItemsReducer(newCartItems);
  };
  const clearItemFromCart = (CartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, CartItemToClear);
    updateCertItemsReducer(newCartItems);
  };

  const setCartOpen = (bool) => {
    dispatch({type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool});
  }

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