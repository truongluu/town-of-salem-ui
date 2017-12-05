/*
3rd Party library imports
 */
import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
/*
Project file imports
 */
import auth, { getToken, getTokenDecoded } from './authentication.reducer';
import lobby, { getCommandResult } from './lobby.reducer';

const reducers = combineReducers({
	auth,
	lobby,
});

export const getAuthState = state => state.auth;
export const getAuthToken = createSelector(getAuthState, getToken);
export const getAuthTokenDecoded = createSelector(getAuthState, getTokenDecoded);

export const getLobbyState = state => state.lobby;
export const getLobbyCommandResult = createSelector(getLobbyState, getCommandResult);

export default reducers;
