import {createStore,combineReducers} from 'redux'
import nombreReducer from './reducer'

const reducers=combineReducers({
    nombreReducer
})

const store=createStore(reducers, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )


// store.subscribe(()=>console.log(store))

export default store