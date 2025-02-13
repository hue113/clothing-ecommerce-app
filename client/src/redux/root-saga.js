import { all, call } from 'redux-saga/effects'

import { fetchCollectionsStart, shopSagas } from './shop/shop.sagas'
import { userSagas } from './user/user.sagas'
import { cartSagas } from './cart/cart.sagas'

export default function* rootSaga() {
    // all() takes an array of sagas; put all sagas in this array
    yield all([                 
        // call(fetchCollectionsStart),     
        call(userSagas),
        call(cartSagas),
        call(shopSagas)
    ])      
}
