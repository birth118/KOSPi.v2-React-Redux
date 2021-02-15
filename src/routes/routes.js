import React from 'react'
import { Switch, Route } from 'react-router-dom';




import Signin from '../components/user/signin'
import Signup from "../components/user/signup";
import Signout from "../components/user/signout";

import GoogleSignRedirect from "../components/user/google-sign-redirect";





import Holdings from '../components/stock/holdings'
import { TransactAll } from '../components/stock/transact-all'
import StockCode from '../components/stock/stockcode'

import PrivateRoute from "./private-route";
import Transact from '../components/stock/transact';
import Update from '../components/stock/update';
import { client } from '../apis';


const Routes = () => {

  return (
    <div>


      <Switch>
        <Route exact path='/' component={Signin} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/auth/google/secrets' component={GoogleSignRedirect} />


        <PrivateRoute exact path='/listing' component={Holdings} />
        <PrivateRoute exact path='/stockcode' component={StockCode} />
        <PrivateRoute exact path='/Transactall/:yymmdd' component={TransactAll} />
        <PrivateRoute exact path='/transact/:stockcode' component={Transact} />
        <PrivateRoute exact path='/update/:stockcode' component={Update} />
        <PrivateRoute exact path='/signout' component={Signout} />
      </Switch>

    </div>
  )
}


export default Routes