const initState = {
    authError: null
  }
  
  const authReducer = (state = initState, action) => {
    switch(action.type){
      case 'LOGIN_ERROR':
        console.log('login error');
        return {
          ...state,
          authError: 'Login failed'
        }
      case 'LOGIN_SUCCESS':
        console.log('login success');
        return {
          authError: null
        }
      case 'SIGNOUT_SUCCESS':
        console.log('sign out success')
        return {
          state
        }
      case 'SIGNUP_SUCCESS':
        console.log('sign up success')
        return {
          ...state,
          authError: null
        }
      case 'SIGNUP_ERROR':
        console.log('sign up err');
        return {
          ...state,
          authError: action.err.message
        }
        case 'VERIFY_SUCCESS':
        console.log('verify success')
        return {
          ...state,
          authError: null
        }
      case 'VERIFY_ERROR':
        console.log('verify err');
        return {
          ...state,
          authError: action.err.message
        }
      default:
        return state
    }
  };
  
  export default authReducer;