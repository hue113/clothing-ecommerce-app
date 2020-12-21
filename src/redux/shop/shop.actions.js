import { ShopActionTypes } from './shop.types'
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

// USING THUNK: ACTION CAN RETURN a FUNCTION
export const fetchCollectionsStart = () => ({    
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
})

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionsFailure = errorMessage  => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})

export const fetchCollectionsStartAsync = () => {    
    return dispatch => {
        const collectionRef = firestore.collection('collections')   // 1. create a collection ref
        dispatch(fetchCollectionsStart())       // 2. dispatch an action (which will switch isFetching: true)

        // 3. begin async request
        collectionRef.get()
            .then(snapshot => {
                const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
                dispatch(fetchCollectionsSuccess(collectionsMap))  
            }).catch( error =>
                dispatch(fetchCollectionsFailure(error.message))
            )
    }
}





// BEFORE using Thunk: ACTION RETURN a PLAIN JAVASCRIPT OBJECT (PJO)
// PJO can be ACTION / OBJECT with Key-Value pair
// export const updateCollections = (collectionsMap) => ({      
//     type: ShopActionTypes.UPDATE_COLLECTIONS,
//     payload: collectionsMap
// })