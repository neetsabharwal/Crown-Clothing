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


export const CartContext = createContext({
    isCartOpen : false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {}, // but not exposing this directly like above
    cartCount: 0
});

export const CartProvider = ({children}) => {

    const [ isCartOpen, setIsCartOpen ] = useState(false);
    const [ cartItems, setCartItems ] = useState([]);
    const [ cartCount, setCartCount ] = useState(0);

    useEffect(() => {
        const newCartCount =  cartItems.reduce((acc, el) => acc + el.quantity,0);
        setCartCount(newCartCount);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        //writing a helper function
        setCartItems(addCartItem(cartItems, productToAdd));
    }



    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount };
    
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
};