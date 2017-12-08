/*
3rd Party library imports
 */
import { handleActions } from 'redux-actions';
/*
Project file imports
 */
import { UpdateLastWill } from '../actions/game.action';

const initialState = {};

const reducer = handleActions({
	[UpdateLastWill]: {
		next: (state, { payload }) => ({ commandResult: payload }),
		throw: (state, { payload }) => ({ error: payload }),
	},
}, initialState);

export default reducer;
