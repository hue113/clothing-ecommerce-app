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


export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;       // if user doesn't exist -> exist function, do nothing

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()
    
    if(!snapShot.exists) {      // 
        const { displayName, email } = userAuth;
        const createAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }
    
    // console.log(firestore.doc('users/23sa'))
    // console.log(snapShot)

    return userRef
}


export default firebase;