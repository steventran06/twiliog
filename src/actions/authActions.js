import axios from "axios";
import history from '../history';

export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
      const firebase = getFirebase();
      
      firebase.auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      ).then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' });
      }).catch((err) => {
        dispatch({ type: 'LOGIN_ERROR', err });
      });
  
    }
  }

  export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
      const firebase = getFirebase();
  
      firebase.auth().signOut().then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS' })
      });
    }
  }

  export const verify =(userInfo)=>{
    return (dispatch,getState, {getFirebase, getFirestore}) => {
      const axiosConfig = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
        }
      };
      axios.post("https://us-central1-twiliog.cloudfunctions.net/default-checkCode", userInfo, axiosConfig)
      .then((result) => {
        console.log("CHECK CODE RESULT.DATA", result.data);
        dispatch({type: 'VERIFY_SUCCESS'});
        if (result.data === "approved"){
          const firebase = getFirebase();
          const firestore = getFirestore();

          firebase.auth().createUserWithEmailAndPassword(
            userInfo.email,
            userInfo.password

          ).then((resp)=> {
            console.log("firebase userId resp.user.uid", resp.user.uid)
            return firestore.collection('users').doc(resp.user.uid).set({
              firstName: userInfo.firstName,
              lastName: userInfo.lastName,
              initials: userInfo.firstName[0]+userInfo.lastName[0],
              email: userInfo.email,
              phNumber:userInfo.phNumber
            })
          }).then(() => {
            dispatch({type: 'SIGNUP_SUCCESS'})
          }).catch(err => {
            dispatch({type: 'SIGNUP_ERROR', err})
          })
        }
      }).catch(err => {
        dispatch({type: 'VERIFY_ERROR', err})
      })
    } 
  }


  export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
    
      dispatch({type:'CHECK_VERIFY', payload:newUser}) 
      console.log("newUser.phNumber", newUser.phNumber)
      const axiosConfig = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
        }
      };
      axios.post("https://us-central1-twiliog.cloudfunctions.net/default-sendVerify", newUser, axiosConfig)
      .then((result) => {
        console.log("signup result.data", result.data);
        dispatch({type: 'VERIFY_CODE_SENT_SUCCESS'});
        history.push('/verify');
      }).catch(err => {
        dispatch({type: 'VERIFY_CODE_SENT_ERROR', err})
      })
    }
  }