/*
3rd Party library imports
 */
import { handleActions } from 'redux-actions';
/*
Project file imports
 */
import { AddPrivateMessage, AddPublicMessage } from '../actions/message.action';

const initialState = {};

const reducer = handleActions({
	[AddPublicMessage]: {
		next: (state, { payload }) => ({ commandResult: payload }),
		throw: (state, { payload }) => ({ error: payload }),
	},
	[AddPrivateMessage]: {
		next: (state, { payload }) => ({ commandResult: payload }),
		throw: (state, { payload }) => ({ error: payload }),
	},
}, initialState);

export default reducer;
