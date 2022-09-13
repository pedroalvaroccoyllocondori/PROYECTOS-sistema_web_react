import {createStore,combineReducers,applyMiddleware} from 'redux'
import nombreReducer from './reducer'
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension';


const reducers=combineReducers({
  data:nombreReducer
})

const persisConfig={
  key:'main-root',storage
}



const persistedReducers=persistReducer(persisConfig,reducers)

const composedEnhancer = composeWithDevTools(
  // EXAMPLE: Add whatever middleware you actually want to use here
  applyMiddleware()
  // other store enhancers if any
)


const store=createStore(persistedReducers,composedEnhancer)

// ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()


const Persistor=persistStore(store)
// store.subscribe(()=>console.log(store))

export {Persistor}

export default store