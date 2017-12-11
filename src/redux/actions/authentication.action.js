/*
3rd Party library imports
 */
import { createAction } from 'redux-actions';
import Maybe from 'folktale/maybe';
import { compose, curry } from 'ramda';
/*
Project file imports
 */
import { Client, LOGIN_QUERY, REGISTER_MUTATION } from '../../graphql/index';

const ActionTypes = {
	INIT_USER: '[Auth] INIT_USER',
	REGISTER: '[Auth] REGISTER',
	LOGIN: '[Auth] LOGIN',
	SYNC: '[Auth] SYNC',
};

export const InitUser = createAction(ActionTypes.INIT_USER);
export const Register = createAction(ActionTypes.REGISTER);
export const Login = createAction(ActionTypes.LOGIN);
export const Sync = createAction(ActionTypes.SYNC);

const maybeGetUserInfo = () => Maybe.fromNullable(sessionStorage.getItem('token'));

const getMaybeOrElse = curry((somethingElse, maybe) =>
	maybe.getOrElse(somethingElse));

export const startUserInit = () => dispatch =>
	compose(
		dispatch,
		InitUser,
		getMaybeOrElse(new Error('User is not logged in')),
	)(maybeGetUserInfo());

export const startUserRegister = user => dispatch =>
	Client.mutate({
		mutation: REGISTER_MUTATION,
		variables: { user },
	}).then((result) => {
		sessionStorage.setItem('token', result.data.register);
		return result;
	}).then(result => dispatch(Register(result.data.register)))
		.catch(e => dispatch(Register(e)));

export const startUserLogin = user => dispatch =>
	Client.query({
		query: LOGIN_QUERY,
		variables: { user },
	}).then((result) => {
		sessionStorage.setItem('token', result.data.login);
		return result;
	}).then(result => dispatch(Login(result.data.login)))
		.catch(e => dispatch(Login(e)));
