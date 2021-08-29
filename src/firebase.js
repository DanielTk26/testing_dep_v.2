import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBp_0MJL2O0rYVAl6Z3OskhvsMS_kznP_Y",
  authDomain: "chirp-messenger.firebaseapp.com",
  projectId: "chirp-messenger",
  storageBucket: "chirp-messenger.appspot.com",
  messagingSenderId: "502794065252",
  appId: "1:502794065252:web:2ea80618c8c39327cb5671"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider, storage };
export default db;
