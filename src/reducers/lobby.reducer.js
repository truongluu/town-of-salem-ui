/*
3rd Party library imports
 */
import { combineActions, handleActions } from 'redux-actions';
/*
Project file imports
 */
import { JoinLobby, LeaveLobby } from '../actions/lobby.action';

const initialState = {};

const reducer = handleActions({
	[combineActions(JoinLobby, LeaveLobby)]: {
		next: (state, { payload }) => ({ commandResult: payload }),
		throw: (state, { payload }) => ({ error: payload }),
	},
}, initialState);

export const getCommandResult = state => state.commandResult;

export default reducer;
