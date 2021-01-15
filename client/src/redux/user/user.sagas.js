import { takeLatest, put, all, call } from 'redux-saga/effects'
import { UserActionTypes } from './user.types'
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils'
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure } from './user.actions'

export function* getSnapshotFromUserAuth(userAuth) {    // reusable generator function
    console.log(userAuth)
    try {
        const userRef = yield call(createUserProfileDocument, userAuth)
        const userSnapshot = yield userRef.get()
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))

    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider)
        // BEFORE DESTRUCTRING userRef:  const userRef = yield auth.signInWithPopup(googleProvider)
        // console.log(userRef)
        
        yield getSnapshotFromUserAuth(user)
        // const userRef = yield call(createUserProfileDocument, user)
        // const userSnapshot = yield userRef.get()
        // yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}



export function* signInWithEmail({ payload: { email, password }}) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password)
        
        yield getSnapshotFromUserAuth(user)
        // const userRef = yield call(createUserProfileDocument, user)
        // const userSnapshot = yield userRef.get()
        // yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))

    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}



export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser()
        if (!userAuth) return;          // if userAuth is null (not sign in, no session) --> do nothing, exist function
        yield getSnapshotFromUserAuth(userAuth) // if there is value or userAuth exist --> call getSnapshotFromUserAuth(userAuth)
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}



export function* signOut() {
    try {
        yield auth.signOut()
        yield put(signOutSuccess())
    } catch (error) {
        yield put(signOutFailure(error))
    }
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}



export function* signUp({ payload: {email, password, displayName }}) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword (
            email, 
            password
        )   
        yield put(signInSuccess({ user, additionalData: { displayName } })) // call user & additionalData as payload inside object
    } catch (error) {
        yield put(signUpFailure(error))
    }
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}



export function* signInAfterSignUp({ payload: { user, additionalData }}) {
    yield getSnapshotFromUserAuth(user, additionalData)
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}



export function* userSagas() {          // chain of listeners
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
}