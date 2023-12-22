// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import fbFunctions, { getFunctions } from 'firebase/functions';

const {
  apikey,
  authdomain,
  projectid,
  storagebucket,
  messagingsenderid,
  appid,
  measurementid,
} = fbFunctions.config().fbconfig;
const firebaseConfig = {
  apiKey: apikey,
  authDomain: authdomain,
  projectId: projectid,
  storageBucket: storagebucket,
  messagingSenderId: messagingsenderid,
  appId: appid,
  measurementId: measurementid,
};

// // Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({timestampsInSnapshots:true});
const functions = getFunctions(app,"us-central1");

export default firebase;
