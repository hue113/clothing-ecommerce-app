import { takeLatest, call, put, all } from 'redux-saga/effects'
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'
import { ShopActionTypes } from './shop.types'
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions'

export function* fetchCollectionsAsync() {
    // yield console.log('I am fired')

    try {
        const collectionRef = firestore.collection('collections')       
        const snapshot = yield collectionRef.get()
        // if (snapshot.empty) throw new Error('Snapshot is empty');
        const collectionsMap = yield call(
            convertCollectionsSnapshotToMap, 
            snapshot
        )
        yield put(fetchCollectionsSuccess(collectionsMap))
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(        // use takeLatest because the last one will get the most updated data from the db
        ShopActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollectionsAsync
    )
}

export function* shopSagas() {
    yield all([
        call(fetchCollectionsStart),
    ])
}