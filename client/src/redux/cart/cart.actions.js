import { CartActionTypes } from './cart.types'

export const toggleCartHidden = ( state ) => ({
    type: CartActionTypes.TOOGLE_CART_HIDDEN,
    // payload: state           // no need to write this, because you just need the action type, then react will automatically set the opposite for this case
})

export const addItem = (item) => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
})

export const removeItem = (item) => ({
    type: CartActionTypes.REMOVE_ITEM,
    payload: item
})

export const clearItemFromCart = (item) => ({ 
    type: CartActionTypes.CLEAR_ITEM_FROM_CART,
    payload: item
})

export const clearCart = () => ({
    type: CartActionTypes.CLEAR_CART
})