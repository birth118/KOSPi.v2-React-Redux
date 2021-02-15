import axios from 'axios'

const baseURL = 'http://localhost:5000'
export const client = axios.create({ baseURL, withCredentials: true })
export const clientGoogle = axios.create({ baseURL })