// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFunctions } from 'firebase/functions';


const firebaseConfig = {
  apiKey: "<your API key>",
  authDomain: "twiliog.firebaseapp.com",
  projectId: "twiliog",
  storageBucket: "twiliog.appspot.com",
  messagingSenderId: "<your ID>",
  appId: "<your appId>",
  measurementId: "G-8W9DCGCP8G"
};

// // Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({timestampsInSnapshots:true});
const functions = getFunctions(app,"us-central1");


export default firebase;


