/*
3rd Party library imports
 */
import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
/*
Project file imports
 */
import auth, { getUsername } from './authentication.reducer';

const reducers = combineReducers({
  auth,
});

export const getAuthState = state => state.auth;
export const getAuthUsername = createSelector(getAuthState, getUsername);

export default reducers;
