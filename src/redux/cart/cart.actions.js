import { CartActionTypes } from './cart.types'

export const toogleCartHidden = (state) => ({
    type: CartActionTypes.TOOGLE_CART_HIDDEN,
    // payload: state          // no need to write this, because you just need the action type, then react will set the opposite for this case
})