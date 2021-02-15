import { client } from "../apis";

import {
  ALERT_OFF, ALERT_ON, CURRENCY, SIGN_IN, SIGN_OUT

} from './types'



export const setCurrency = (currency) => {

  return ({
    type: CURRENCY,
    payload: currency
  })

}


export const signIn = (login) => {
  const { email, password } = login
  return async (dispatch, getState) => {
    try {
      const { data } = await client.post('/api/user/signin', {
        email, password
      })
      console.log(data)
      dispatch({ type: SIGN_IN, payload: data })
    } catch (err) {
      //  console.log(err.response.data.errors[0].message);
      console.log(err);
      //   err.response.data.errors.map(error => dispatch(setAlert(error.message)))

    }
  }
}

export const signUp = (login) => {
  const { name, email, password, provider } = login
  return async (dispatch, getState) => {
    try {
      const resp = await client.post('/api/user/signup', {
        email, password, name, provider
      })
      //  console.log(data)
      dispatch({ type: SIGN_IN, payload: resp.data })
    } catch (err) {
      //     console.log(err.response.data.errors[0].message);
      err.response.data.errors.map(error => dispatch(setAlert(error.message)))

    }
  }
}

export const signOut = () => {

  return async (dispatch, getState) => {
    try {
      await client.get('/api/user/signout')
      //  console.log(data)
      dispatch({ type: SIGN_OUT, payload: null })
    } catch (err) {
      //     console.log(err.response.data.errors[0].message);
      err.response.data.errors.map(error => dispatch(setAlert(error.message)))

    }
  }
}


export const setAlert = (message) => {
  // console.log(message);
  return (dispatch, getState) => {
    dispatch({ type: ALERT_ON, payload: message })
    setTimeout(() => {
      dispatch({ type: ALERT_OFF, payload: null })
    }, 3000)
  }
}