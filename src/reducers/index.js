import { combineReducers } from 'redux'
import {
  SIGN_IN,
  SIGN_OUT,
  ALERT_OFF, ALERT_ON, CURRENCY
} from '../actions/types'


const INITIAL_STATE = {
  isSignedIn: false,
  user: null,
}

export const authReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, user: action.payload, }
    case SIGN_OUT:
      return { ...state, isSignedIn: false, user: null, }
    default:
      return state;
  }
}

const INITIAL_ALERT_STATE = {
  message: null
}

export const alertReducer = (state = INITIAL_ALERT_STATE, action) => {
  // console.log(`in Reducer: ${action.payload}`);
  switch (action.type) {
    case ALERT_ON:
      return { ...state, message: action.payload }
    case ALERT_OFF:
      return { ...state, message: null }    //action.payload = null
    default:
      return state
  }

}

const INITIAL_CURRENCY_STATE = {
  USD: 1,
  CNY: 1,
  KRW: 1
}
export const currencyReducer = (state = INITIAL_CURRENCY_STATE, action) => {
  if (action.type === CURRENCY) {
    return action.payload
  } else {
    return state
  }
}


export const reducers = combineReducers(
  {
    auth: authReducer,
    alert: alertReducer,
    currency: currencyReducer
  }
)