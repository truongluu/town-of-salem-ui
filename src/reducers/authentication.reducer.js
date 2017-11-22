/*
3rd Party library imports
 */
import { combineActions, handleActions } from 'redux-actions';
import { decode } from 'jsonwebtoken';
/*
Project file imports
 */
import { InitUser, Login, Register } from '../actions/authentication.action';

const initialState = {};

const reducer = handleActions({
  [combineActions(InitUser, Register, Login)]: {
    next: (state, { payload }) => ({ token: payload }),
    throw: (state, { payload }) => ({ error: payload }),
  },
}, initialState);

export const getUsername = ({ token }) => decode(token);

export default reducer;
