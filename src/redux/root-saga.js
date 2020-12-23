import { all, call } from 'redux-saga/effects'

import { fetchCollectionsStart } from './shop/shop.sagas'
import { userSagas } from './user/user.sagas'

export default function* rootSaga() {
    // all() takes an array of sagas; put all sagas in this array
    yield all([                 
        call(fetchCollectionsStart),     
        call(userSagas)
    ])      
}
