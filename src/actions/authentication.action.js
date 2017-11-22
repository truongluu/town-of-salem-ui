/*
3rd Party library imports
 */
import { createAction } from 'redux-actions';
import Maybe from 'folktale/maybe';
import { compose, curry } from 'ramda';
/*
Project file imports
 */
import { Client } from '../graphql';
import REGISTER_MUTATION from '../graphql/register.graphql';
import LOGIN_QUERY from '../graphql/login.graphql';

const ActionTypes = {
  INIT_USER: '[Auth] INIT_USER',
  REGISTER: '[Auth] REGISTER',
  LOGIN: '[Auth] LOGIN',
};

export const InitUser = createAction(ActionTypes.INIT_USER);
export const Register = createAction(ActionTypes.REGISTER);
export const Login = createAction(ActionTypes.LOGIN);

const maybeGetUserInfo = () => Maybe.fromNullable(localStorage.getItem('token'));

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
    localStorage.setItem('token', result.data.register);
    return result;
  }).then(result => dispatch(Register(result.data.register)))
    .catch(e => dispatch(Register(e)));

export const startUserLogin = user => dispatch =>
  Client.query({
    query: LOGIN_QUERY,
    variables: { user },
  }).then((result) => {
    localStorage.setItem('token', result.data.login);
    return result;
  }).then(result => dispatch(Login(result.data.login)))
    .catch(e => dispatch(Login(e)));
