export const AGREGARCARRITO='AGREGARCARRITO';
export const REMOVE_FROM_CART='REMOVE_FROM_CART';
export const CLEAR_CART="CLEAR_CART"

export const addToCart = (product) => ({type:AGREGARCARRITO, payload: product})

export const removeFromCart = (product) => ({type:REMOVE_FROM_CART, payload: product})

export const clearCart = () => ({type:CLEAR_CART})