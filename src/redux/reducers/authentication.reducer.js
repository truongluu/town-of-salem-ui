/*
3rd Party library imports
 */
import { combineActions, handleActions } from 'redux-actions';
import { decode } from 'jsonwebtoken';
/*
Project file imports
 */
import { InitUser, Login, Register, Sync } from '../actions/authentication.action';

const initialState = {
	token: null,
	reconnect: false,
};

const reducer = handleActions({
	[InitUser]: {
		next: (state, { payload }) => ({ token: payload, reconnect: true }),
		throw: (state, { payload }) => ({ error: payload }),
	},
	[Sync]: state => ({ ...state, reconnect: false }),
	[combineActions(Register, Login)]: {
		next: (state, { payload }) => ({ token: payload }),
		throw: (state, { payload }) => ({ error: payload }),
	},
}, initialState);

export const getTokenDecoded = ({ token }) => decode(token);
export const getToken = ({ token }) => token;
export const getReconnect = ({ reconnect }) => reconnect;

export default reducer;
