import { createSelector } from 'reselect'

const selectUser = state => state.user 

export const selectCurrentUser = createSelector(
    [selectUser],
    (user, cart) => user.currentUser            // check spelling; must match 'currentUser' in INITIAL_STATE
)