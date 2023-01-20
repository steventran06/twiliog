import React from "react"
import ReactDOM from "react-dom"
import { Provider} from "react-redux";
import { createStore, applyMiddleware,compose } from "redux";
import thunk from 'redux-thunk';
import { BrowserRouter, Route } from "react-router-dom";
import { createFirestoreInstance,reduxFirestore,getFirestore } from "redux-firestore"
import { ReactReduxFirebaseProvider, reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from "./config/fbConfig"
import reducers from "./reducers";
import firebase from 'firebase/compat/app'
import App from "./App";
import './index.css';

const store = createStore(reducers, 
    compose(applyMiddleware(thunk.withExtraArgument({getFirebase,getFirestore})),
    reduxFirestore(fbConfig,firebase)
    
    )
);
const profileSpecificProps = {
    userProfile: "users",
    useFirestoreForProfile: true,
    enableRedirectHandling: false,
    resetBeforeLogin: false,
  };

const rrfProps = {
    firebase,
    config: fbConfig && profileSpecificProps,
    dispatch: store.dispatch,
    createFirestoreInstance
  };

ReactDOM.render(
    <Provider store={store}> 
           <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>,
    document.querySelector('#root')
)