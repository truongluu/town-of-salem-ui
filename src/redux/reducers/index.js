/*
3rd Party library imports
 */
import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
/*
Project file imports
 */
import auth, { getReconnect, getToken, getTokenDecoded } from './authentication.reducer';
import { getCommandResult } from './common';
import lobby from './lobby.reducer';
import game from './game.reducer';

const reducers = combineReducers({
	auth,
	lobby,
	game,
});

export const getAuthState = state => state.auth;
export const getAuthToken = createSelector(getAuthState, getToken);
export const getAuthReconnect = createSelector(getAuthState, getReconnect);
export const getAuthTokenDecoded = createSelector(getAuthState, getTokenDecoded);

export const getLobbyState = state => state.lobby;
export const getLobbyCommandResult = createSelector(getLobbyState, getCommandResult);

export const getGameState = state => state.game;
export const getGameCommandResult = createSelector(getGameState, getCommandResult);

export default reducers;
