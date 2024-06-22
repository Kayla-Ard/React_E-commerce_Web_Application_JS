
import { createContext, useContext, useState } from 'react';

const Cart = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    
    const addToCart = (item) => {
        setCartItems([...cartItems, item]);
    };

    const cartCount = cartItems.length;

    return (
        <Cart.Provider value={{ cartItems, addToCart, cartCount }}>
            {children}
        </Cart.Provider>
    );
};

export const useCart = () => {
    return useContext(Cart);
};
