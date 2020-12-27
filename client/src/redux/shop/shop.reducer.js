// import SHOP_DATA from './shop.data'                  // use data from backend, not from front end anymore
import { ShopActionTypes } from './shop.types'

const INITIAL_STATE = {
    // collections: SHOP_DATA               // fetch data from backend (not from front end)
    collections: null,
    isFetching: false,
    errorMessage: undefined     // or empty string
}

const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ShopActionTypes.FETCH_COLLECTIONS_START:
            return {
                ...state,
                isFetching: true
            }
        case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                collections: action.payload
            }
        case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
        // case ShopActionTypes.UPDATE_COLLECTIONS:
        //     return {
        //         ...state,
        //         collections: action.payload
        //     }
        default:
            return state
    }
}

export default shopReducer