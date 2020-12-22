import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { persistStore } from 'redux-persist'
// import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

import { fetchCollectionsStart} from './shop/shop.saga'
import rootReducer from './root-reducer'

const sagaMiddleware = createSagaMiddleware()
const middleWares = [sagaMiddleware]        // if you need to add more middleware, put in here inside the array

if (process.env.NODE_ENV === 'development') {
    middleWares.push(logger)
}

export const store = createStore(rootReducer, applyMiddleware(...middleWares) )

sagaMiddleware.run(fetchCollectionsStart)

export const persistor = persistStore(store)

export default {store, persistor}