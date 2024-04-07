import { createContext, useState, useEffect } from "react";


const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(item => item.id === productToAdd.id)

    // if found, increase quantity
    if(existingCartItem){
        return cartItems.map(item => item.id === productToAdd.id ? 
        {...item, quantity: item.quantity + 1}
        : item)
    }
    // return new array
    return [ ...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, productToRemove) => {
    //if more than one then reduce quantity by 1
    if(productToRemove.quantity > 1) {
        return cartItems.map(item => item.id === productToRemove.id ?
        { ...item, quantity: item.quantity - 1 } 
        : item);
    }
    //else remove from cartItems entirely
    return cartItems.filter(item => item.id !== productToRemove.id);
};

const deleteCartItem = (cartItems, productToDelete) => {
    return cartItems.filter(item => item.id !== productToDelete.id);
}


export const CartContext = createContext({
    isCartOpen : false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {}, // but not exposing this directly like above
    removeItemFromCart: () => {},
    deleteItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});

export const CartProvider = ({children}) => {

    const [ isCartOpen, setIsCartOpen ] = useState(false);
    const [ cartItems, setCartItems ] = useState([]);
    const [ cartCount, setCartCount ] = useState(0);
    const [ cartTotal, setCartTotal ] = useState(0);

    // 1 useEffect should only govern 1 thing.. so using 1 for each
    useEffect(() => {
        const newCartCount =  cartItems.reduce((acc, el) => acc + el.quantity,0);
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((acc,el) => acc + el.quantity*el.price, 0);
        setCartTotal(newCartTotal);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        //writing a helper function
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const deleteItemFromCart = (productToDelete) => {
        setCartItems(deleteCartItem(cartItems, productToDelete));
    }

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, removeItemFromCart, deleteItemFromCart, cartTotal };
    
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
};