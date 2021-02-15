import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { Redirect } from 'react-router-dom'

import { signOut } from "../../actions";


const Signout = ({ isSignedIn, signOut }) => {

  useEffect(() => {
    signOut()

    return () => {
      // cleanup
    }
  }, [])

  return (
    <div>
      {!isSignedIn && <Redirect to="/" />}
    </div>
  )
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn }
}


export default connect(mapStateToProps, { signOut })(Signout)
