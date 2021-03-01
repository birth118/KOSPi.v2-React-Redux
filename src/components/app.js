import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import './app.css';

import Routes from '../routes/routes';

export const App = () => {
  // console.log(process.env.NODE_ENV);
  // console.log(process.env.REACT_APP_GOOGLE_AUTH_ACCOUNT_URL);
  // console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);

  // console.log(process.env.REACT_APP_GOOGLE_CLIENT_SECRET);
  // console.log(process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI_DEV);
  // console.log(process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI_PROD);
  // console.log(process.env.REACT_APP_GOOGLE_AUTH_PROFILE_URL);

  return (
    <div>
      <BrowserRouter>
        <Route component={Routes} />
      </BrowserRouter>
    </div>
  );
};
