import axios from 'axios'

//const baseURL = 'http://localhost:5000'
const baseURL = 'http://yim-kospi-v2.herokuapp.com/'
export const client = axios.create({ baseURL, withCredentials: true })
export const clientGoogle = axios.create({ baseURL })