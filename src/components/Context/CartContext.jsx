import {createContext, useState} from 'react';
import CartItem from '../CartItem/CartItem';

const AddCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
    if(existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
            {...cartItem, quantity: cartItem.quantity + 1} : cartItem
        );
    }
    return [...cartItems, {...productToAdd, quantity: 1}];
}
export const CartContext = createContext({
    isCartOpen: false,
    setCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {}
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const AddItemToCart = (productToAdd) => {
        setCartItems(AddCartItem(cartItems, productToAdd));
    };

    const value = {isCartOpen, setCartOpen, AddItemToCart, cartItems};

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}