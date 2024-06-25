
import { createContext, useContext, useState } from 'react';

const Cart = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        const existingItemIndex = cartItems.findIndex(cartItem => cartItem.product_id === item.product_id);

        if (existingItemIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex].quantity += item.quantity;
            setCartItems(updatedCartItems);
        } else {
            setCartItems([...cartItems, item]);
        }
    };

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <Cart.Provider value={{ cartItems, addToCart, cartCount }}>
            {children}
        </Cart.Provider>
    );
};

export const useCart = () => {
    return useContext(Cart);
};
