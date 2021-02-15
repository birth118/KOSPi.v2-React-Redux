import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from "react-redux";

// import { createStore, applyMiddleware, compose } from 'redux'
// import thunk from "redux-thunk";

import { PersistGate } from "redux-persist/lib/integration/react";

import { persistor, store } from "./store";


import { App } from './components/app'
// import { reducers } from './reducers'

//const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// const store = createStore(reducers, applyMiddleware(thunk))
// const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} >
      <App />
    </PersistGate>
  </Provider>,
  document.querySelector('#root'))


