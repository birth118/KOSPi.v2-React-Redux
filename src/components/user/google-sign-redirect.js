import React from 'react'
import { connect } from 'react-redux'
// import env from 'react-dotenv'
import qs from 'qs'

import { Redirect } from "react-router-dom";
import { clientGoogle } from '../../apis'
import { signIn, signUp } from '../../actions'

const GoogleSignRedirect = (props) => {

  const [access, setAccess] = React.useState(null)
  const [profile, setProfile] = React.useState(null)


  const qsObj = qs.parse(props.location.search.substring(1))

  // console.log(props);

  const { code } = qsObj
  //const code = JSON.stringify(qs[1])


  //  console.log(env);

  // console.log(process.env.NODE_ENV);
  // console.log(process.env.REACT_APP_GOOGLE_AUTH_ACCOUNT_URL);
  // console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);



  const GOOGLE_AUTH_ACCOUNT_URL = 'https://oauth2.googleapis.com/token'
  const GOOGLE_CLIENT_ID = '298787624725-n2ba208qn22h4aa55gkahu9de51k53q2.apps.googleusercontent.com'
  const GOOGLE_CLIENT_SECRET = 'h2kxPbT5qdy4fHftet5VqF5y'
  const GOOGLE_AUTH_REDIRECT_URI_DEV = 'http://localhost:3000/auth/google/secrets'
  const GOOGLE_AUTH_REDIRECT_URI_PROD = 'http://localhost:3000/auth/google/secrets'


  const GOOGLE_AUTH_PROFILE_URL = 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json'


  const googleAuthURL = GOOGLE_AUTH_ACCOUNT_URL
  const client_id = GOOGLE_CLIENT_ID
  const redirect_uri = GOOGLE_AUTH_REDIRECT_URI_DEV
  //const redirect_uri = env.GOOGLE_AUTH_REDIRECT_URI_PROD
  const client_secret = GOOGLE_CLIENT_SECRET
  const grant_type = 'authorization_code'


  React.useEffect(() => {

    clientGoogle.post(googleAuthURL, {
      client_id,
      redirect_uri,
      client_secret,
      grant_type,
      code
    }).then(({ data }) => {
      // console.log(data);
      setAccess(data)
    })
      .catch((err) => { console.log(err.response) })

  }, [])

  React.useEffect(() => {

    if (access) {
      const { access_token } = access

      const googleAuthProfileURL = GOOGLE_AUTH_PROFILE_URL

      clientGoogle.get(googleAuthProfileURL, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }).then(({ data: profile }) => {
        //  console.log(profile)
        setProfile(profile)
        props.signIn({ email: profile.email, password: profile.id })
        if (!props.isSignedIn) {
          props.signUp({ name: profile.name, email: profile.email, password: profile.id, provider: 'GOOGLE' })
        }
      }).catch((err) => {
        console.log(err)
      })
    }


  }, [access])


  return (
    <div>

      {props.isSignedIn ? <Redirect to='/listing' /> : <h3> Google Signing in....</h3>}
      {/* { profile && <h3>{profile.name}</h3>} */}
    </div>
  )
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn }
}
export default connect(mapStateToProps, { signUp, signIn })(GoogleSignRedirect)