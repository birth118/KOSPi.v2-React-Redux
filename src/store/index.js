import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import thunk from "redux-thunk";


import { reducers } from '../reducers'

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  || compose;



const persistConfig = {
  key: 'auth',
  storage: storage,
  blacklist: ['isSignedIn']
}

const pReducer = persistReducer(persistConfig, reducers)

//export const store = createStore(pReducer)
export const store = createStore(pReducer, composeEnhancers(applyMiddleware(thunk)))
export const persistor = persistStore(store)