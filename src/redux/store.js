import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { persistStore } from 'redux-persist'
import rootReducer from './root-reducer'

const middleWares = [logger]        // if you need to add more middleware, put in here inside the array

export const store = createStore(rootReducer, applyMiddleware(...middleWares) )

export const persistor = persistStore(store)

export default {store, persistor}