import { combineReducers } from "redux";
import authReducer from "./authReducer";
import blogReducer from "./blogReducer";
import userReducer from "./userReducer";
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from "react-redux-firebase";


export default combineReducers({
    auth:authReducer,
    blog:blogReducer,
   firestore: firestoreReducer,
   firebase:firebaseReducer,
   user:userReducer

})

