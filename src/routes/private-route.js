import React, { useEffect } from 'react'
import { Route, Redirect } from "react-router-dom"
import { connect, useStore } from 'react-redux';
import Nav from "./nav";
import { client } from '../apis';



const PrivateRoute = ({ auth: { isSignedIn, loading }, component: Component, ...rest }) => {



  return (

    <div>


      <Nav />
      <Route
        {...rest}
        render={(props) => {
          // console.log(props);
          // console.log(isSignedIn);

          return (isSignedIn ? <Component {...props} /> : <Redirect to="/" />)
        }}

      />


    </div >
  )
}

const mapStateToProps = (state) => {
  return { auth: state.auth }
}
export default connect(mapStateToProps, {})(PrivateRoute)