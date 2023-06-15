import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAlnB4Usf5xVnF-sZq5C6SUyRUakN_iyA",
  authDomain: "codesyarn.firebaseapp.com",
  projectId: "codesyarn",
  storageBucket: "codesyarn.appspot.com",
  messagingSenderId: "549006311794",
  appId: "1:549006311794:web:82c90a0d82d68e2ddb5deb",
  measurementId: "G-XLPHSLHJEY",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();
