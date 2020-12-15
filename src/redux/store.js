import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import rootReducer from './root-reducer'

const middleWares = [logger]        // if you need to add more middleware, put in here inside the array

const store = createStore(rootReducer, applyMiddleware(...middleWares) )

export default store