import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'


import './app.css'

import Routes from "../routes/routes";



export const App = () => {

  return (
    <div className="ui container" style={{ marginTop: '10px' }}>
      <BrowserRouter>
        <Route component={Routes} />
      </BrowserRouter>

    </div>

  )
}
