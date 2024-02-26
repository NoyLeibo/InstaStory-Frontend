import { combineReducers, compose, legacy_createStore as createStore } from 'redux'
import { userReducer } from './reducers/user.reducer.ts'
// import { reviewReducer } from './review.reducer.js'
// import { systemReducer } from './system.reducer.js'

const rootReducer = combineReducers({
    // stayModule: stayReducer,
    userModule: userReducer,
    // systemModule: systemReducer,
    // reviewModule: reviewReducer,
})


const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers()

export const store = createStore(rootReducer, enhancer);

(window as any).gStore = store