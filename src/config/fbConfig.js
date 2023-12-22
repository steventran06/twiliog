// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFunctions } from 'firebase/functions';


const firebaseConfig = {
  apiKey: "AIzaSyCEkxjmbrNK-468OCt2NbyDxZtu_zX8p7Y",
  authDomain: "even-396918.firebaseapp.com",
  projectId: "even-396918",
  storageBucket: "even-396918.appspot.com",
  messagingSenderId: "239166856185",
  appId: "1:239166856185:web:ef587ae14ea921de2b3b28",
  measurementId: "G-P43866PB95"
};

// // Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({timestampsInSnapshots:true});
const functions = getFunctions(app,"us-central1");

export default firebase;
