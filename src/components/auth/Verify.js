import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {verify} from '../../actions/authActions'


class Verify extends Component {
    state = {
        passcode :'',
        phNumber:this.props.phNumber,
        email: this.props.email,
        password: this.props.password,
        firstName: this.props.firstName,
        lastName: this.props.lastName
      }
      handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
      }
      handleSubmit = (e) => {
        e.preventDefault();
        this.setState({

        })
        this.props.verify(this.state)
        
       
      }
      render() {
       const { auth , authError} = this.props
       if (auth.uid) return <Redirect to='/'/>
    
        return(
        <div className="container">
          <form className="white" onSubmit={this.handleSubmit}>
            <h5 className="grey-text text-darken-3">Enter your Verification Code sent SMS</h5>
            <div className="input-field">
              <label htmlFor="verify">Enter your verification code</label>
              <input type="text" id='passcode' onChange={this.handleChange} />
              <button className="btn red accent-4 lighten-1 z-depth-0">Submit Code</button>
              <div className="red-text center">
              {authError ? <p>{authError}</p> :null}
            </div>
            </div>
          </form>
      </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      phNumber: state.user.phNumber,
      email: state.user.email,
      password: state.user.password,
      firstName: state.user.firstName,
      lastName: state.user.lastName,
      auth: state.firebase.auth,
      authError: state.auth.authError
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      verify: (userInfo) => dispatch (verify(userInfo))
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Verify)