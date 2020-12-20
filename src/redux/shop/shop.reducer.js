// import SHOP_DATA from './shop.data'                  // use data from backend, not from front end anymore
import { ShopActionTypes } from './shop.types'

const INITIAL_STATE = {
    // collections: SHOP_DATA               // fetch data from backend (not from front end)
    collections: null
}

const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ShopActionTypes.UPDATE_COLLECTIONS:
            return {
                ...state,
                collections: action.payload
            }

        default:
            return state
    }
}

export default shopReducer