import { UserActionTypes } from './user.types'

const INITIAL_STATE = {
    currentUser: null,
    error: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {   
        case UserActionTypes.GOOGLE_SIGN_IN_SUCCESS:        // short syntax
        case UserActionTypes.EMAIL_SIGN_IN_SUCCESS:         // either case
            return {
                ...state,
                currentUser: action.payload,
                error: null
            }
        case UserActionTypes.GOOGLE_SIGN_IN_FAILURE:        // short syntax
        case UserActionTypes.EMAIL_SIGN_IN_FAILURE:         // either case
            return {
                ...state,
                error: action.payload
            }
        
        // case UserActionTypes.SET_CURRENT_USER:
        //     return {
        //         ...state,
        //         currentUser: action.payload
        //     }
        default:    
            return state;
    }
}

export default userReducer