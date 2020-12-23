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

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)


export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;       // if user doesn't exist -> exist function, do nothing

    const userRef = firestore.doc(`users/${userAuth}`)
    // console.log('doc ref: ',userRef)                    // Document Reference
    const snapShot = await userRef.get()
    // console.log('doc snapshot: ', snapShot)                   // Document Snapshot
    
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

// async request to add collection and items to firebase
// batch/group all calls into 1 big request -> don't have to enter data manually into firebase    
// only run this method ONCE when you need to add
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey)
    // console.log('collectionKey: ', collectionKey)

    const batch = firestore.batch()         // batch/group all calls into 1 big request -> don't have to enter data manually into firebase    
    objectsToAdd.forEach( obj => {
        const newDocRef = collectionRef.doc()
        // console.log('newDocRef: ', newDocRef)
        // batch.set(newDocRef, obj)
    })
    
    return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data()
        
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })

    console.log('transformed collection', transformedCollection)
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection
        return accumulator
    }, {})
}


export default firebase;