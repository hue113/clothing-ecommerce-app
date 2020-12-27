import { createSelector } from 'reselect'

const selectDirectory = state => state.directory

export const selectDirectorySections = createSelector(
    [selectDirectory],
    directory => directory.sections         // check spelling; must match 'sections' in INITIAL_STATE
)