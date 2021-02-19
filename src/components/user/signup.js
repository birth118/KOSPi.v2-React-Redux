import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


import Alert from '../layout/alert'
import { setAlert, signUp } from "../../actions";


const Signup = ({ isSignedIn, setAlert, signUp }) => {

  const [checkBox, setCheckBox] = React.useState(true)
  const [formData, setFormData] = React.useState({
    email1: '', email2: '', password1: '', password2: ''
  })

  const { email, name, password1, password2 } = formData


  const onFormSubmit = (evt) => {
    evt.preventDefault()


    if (password1 !== password2) {
      setAlert('Password should be confirmed')
      return
    }
    signUp({ name, email, password: password1, provider: 'LOCAL' })
  }

  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onCheckBox = (e) => {
    setCheckBox(!checkBox)
    //  console.log(checkBox);
  }

  return (

    <div className="ui container" >

      <div className="ui middle  aligned grid">
        {isSignedIn && <Redirect to="/listing" />}
        <div className="column">
          <h2 className="ui teal image header">
            <img src="/images/bar.png" className="image" alt="" />
            <div className="content">
              Sign up your account
            </div>
          </h2>
          <form className="ui  form" onSubmit={onFormSubmit}>
            <div className="ui stacked segment">
              <div className="field">
                <div className="ui left icon input">
                  <i className="envelope icon"></i>
                  <input onChange={onFormChange} type="email" name="email" placeholder="E-mail address" required />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <input onChange={onFormChange} type="text" name="name" placeholder="Name" required />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <input onChange={onFormChange} type={checkBox ? "password" : "text"} name="password1" placeholder="Password" required minLength='7' id="password-field" />

                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <input onChange={onFormChange} type="password" name="password2" placeholder="Confirm Password" required />

                </div>
              </div>

              <div className="field">
                <div className="ui checkbox">
                  <input type="checkbox" name="update" value={checkBox} onClick={checkBox} />
                  <label>Show password</label>
                </div>
              </div>


              <Alert />

              <button className="ui fluid large teal submit button">Signup</button>
              <hr />
              <a className="ui fluid large  red button google" href="http://localhost:5000/auth/google">  <i className="google icon"></i>
      Google Login</a>
            </div>

          </form>

          <div className="ui message">
            Already with us? <Link to="/">Sign In</Link>
          </div>

        </div>
      </div>
    </div>


  )
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn }
}


export default connect(mapStateToProps, { signUp, setAlert })(Signup)