import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyA2RvGsdYnrNlH6nvJ6A3KVlsyyXLx69Xk",
    authDomain: "clothing-db-28ed3.firebaseapp.com",
    projectId: "clothing-db-28ed3",
    storageBucket: "clothing-db-28ed3.appspot.com",
    messagingSenderId: "796285868233",
    appId: "1:796285868233:web:012fe216e751c7221f1518",
    measurementId: "G-E9LGF3PY75"
};

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()             
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;