import {createStore,combineReducers,applyMiddleware} from 'redux'
import nombreReducer from './reducer'
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const reducers=combineReducers({
  data:nombreReducer
})

const persisConfig={
  key:'main-root',storage
}

const persistedReducers=persistReducer(persisConfig,reducers)

const store=createStore(persistedReducers,applyMiddleware())

// ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()


const Persistor=persistStore(store)
// store.subscribe(()=>console.log(store))

export {Persistor}

export default store