import React, { useState, Component } from 'react'
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux'

import { signIn, setAlert } from '../../actions'
import Alert from '../layout/alert'
import { client } from '../../apis';



class Signin extends Component {


  state = { email: '', password: '', checkBox: true, currentUser: null }

  // componentDidMount() {

  //   client.get('api/user/currentuser')
  //     .then(({ data }) => {
  //       // <Redirect to="/listing" />
  //       this.setState({ currentUser: data.currentUser })
  //     })
  //     .catch((err) => { console.log(err.reponse) })

  //   return () => {
  //     // cleanup
  //   }

  // }

  onCheckBox = (e) => {
    this.setState({ checkBox: !this.state.checkBox })
    //  console.log(checkBox);
  }

  onFormSubmit = (e) => {

    e.preventDefault()
    //console.log(this.state.email);
    this.props.signIn({ email: this.state.email, password: this.state.password })

    // this.props.setAlert('Login FAILED')
  }

  onGoogleClick = () => {


    const googleAuthURL = 'https://accounts.google.com/o/oauth2/v2/auth'
    const client_id =
      '298787624725-n2ba208qn22h4aa55gkahu9de51k53q2.apps.googleusercontent.com'
    const redirect_uri = 'http://localhost:3000/auth/google/secrets' // Redirect to a React route
    const response_type = 'code'
    const scope = 'email profile'
    const access_type = 'online'


    const redirectURL = `${googleAuthURL}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}&access_type=${access_type}`
    //   'https://accounts.google.com/o/oauth2/v2/auth?client_id=298787624725-n2ba208qn22h4aa55gkahu9de51k53q2.apps.googleusercontent.com&redirect_uri=http://localhost:3000/auth/google/secrets&response_type=code&scope=email&access_type=online'

    //clientGoogle.get('/auth/google')
    window.location.path = redirectURL
  }


  render() {

    if (this.props.isSignedIn) {
      return <Redirect to='/listing' />
    }

    return (

      <div className="ui container" >

        <div className="ui middle aligned  grid">
          <div className="column">
            <h2 className="ui teal image header">
              <img src="/images/bar.png" className="image bar" alt="" />
              <div className="content">
                Sign in your account

              </div>
            </h2>
            <form className="ui  form" onSubmit={this.onFormSubmit}>
              <div className="ui stacked  segment">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="envelope icon"></i>
                    <input onChange={e => this.setState({ email: e.target.value })}
                      type="email" name="email"
                      value={this.state.email}
                      placeholder="E-mail address" required />

                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input onChange={e => this.setState({ password: e.target.value })}
                      type={this.state.checkBox ? "password" : "text"} name="password" value={this.state.password} placeholder="Password" minLength='7' required />
                  </div>
                </div>
                <div className="field">
                  <div className="ui checkbox">

                    <input type="checkbox" name="update" value={this.state.checkBox} onClick={this.onCheckBox} />
                    <label>Show password</label>
                  </div>
                </div>
                <Alert />
                <button className="ui fluid large teal submit button">Login</button>
                <hr />
                <a className="ui fluid large  red button google" href="http://localhost:5000/auth/google">  <i className="google icon"></i>
      Google Login</a>

              </div>


            </form>

            <div className="ui message">
              New to us? <Link to="/signup">Sign Up</Link>
            </div>
            {this.state.email}
          </div>
        </div>
      </div>

    )
  }


}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn }
}
export default connect(mapStateToProps, { signIn, setAlert })(Signin)