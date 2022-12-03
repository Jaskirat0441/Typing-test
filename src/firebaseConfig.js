import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
//     appId: process.env.REACT_APP_APP_ID,
//     measurementId: process.env.REACT_APP_MEASUREMENT_ID
// };
const firebaseConfig = {
    apiKey: "AIzaSyC7eSGBFvAL0VRXVExJdL5Fv7oF1GyBFus",
    authDomain: "typing-test-3efa8.firebaseapp.com",
    projectId: "typing-test-3efa8",
    storageBucket: "typing-test-3efa8.appspot.com",
    messagingSenderId: "653400529155",
    appId: "1:653400529155:web:b40959c236247a95db3136",
    measurementId: "G-40P1C0HL5S"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebaseApp.firestore();

export {auth, db};