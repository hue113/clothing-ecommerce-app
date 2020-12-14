import firebase from 'firebase/app'
import 'firebase/firestore'

const firestore = firebase.firestore()


// basic 
firestore.collection('users').doc('wrq2sl0kQM2HaCqDHer1')
// chain
firestore.collection('users').doc('wrq2sl0kQM2HaCqDHer1').collection('cartItems').doc('WAZEmMfKBXIYtSScEyby')

// short syntax for chaining to get document & collection
firestore.collection('/users/wrq2sl0kQM2HaCqDHer1/cartItems')
firestore.doc('/users/wrq2sl0kQM2HaCqDHer1/cartItems/WAZEmMfKBXIYtSScEyby')