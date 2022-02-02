import firebase from "firebase";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "netflix-clone-mus.firebaseapp.com",
  projectId: "netflix-clone-mus",
  storageBucket: "netflix-clone-mus.appspot.com",
  messagingSenderId: "20240355269",
  appId: "1:20240355269:web:9b043a597387f980ca45ac",
  measurementId: "G-MVHBPNTRNV",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();
export const db = firebaseApp.firestore();
