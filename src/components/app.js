import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'


import './app.css'

import Routes from "../routes/routes";



export const App = () => {

  return (
    <div >
      <BrowserRouter>
        <Route component={Routes} />
      </BrowserRouter>

    </div>

  )
}
