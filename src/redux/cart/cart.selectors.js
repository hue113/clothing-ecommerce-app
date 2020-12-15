import { createSelector } from 'reselect'

// from Input selector
const selectCart = state => state.cart  // get the whole state and return a slice of it

export const selectCartItems = createSelector(
    [selectCart],               // array of input selectors. Eg [selectCart, selectUser]
    cart => cart.cartItems      // a function that return value you want from the selectors
)

// 
export const selectCartItemCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(          
        (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity
    , 0)
)