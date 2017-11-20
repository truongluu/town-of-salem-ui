/*
3rd Party library imports
 */
import React from 'react';
import { compose, withHandlers, withState } from 'recompose';
/*
Project file imports
 */
import LOGIN_QUERY from '../../graphql/login.graphql';

console.log(LOGIN_QUERY);

const Authentication = props => (
  <div>
    <form>
      <div>
        <label htmlFor="username-input">Username:
          <input
            id="username-input"
            type="text"
            value={props.username}
            onChange={event => props.updateUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password-input">Password:
          <input
            id="password-input"
            type="password"
            value={props.password}
            onChange={event => props.updatePassword(event.target.value)}
          />
        </label>
      </div>
    </form>
    <button onClick={props.onLogin}>Login</button>
    <button onClick={props.onRegister}>Register</button>
  </div>
);

const enhance = compose(
  withState('username', 'updateUsername', ''),
  withState('password', 'updatePassword', ''),
  withHandlers({
    onLogin: props => () => console.log('on Login props: ', props),
    onRegister: props => () => console.log('on Register props: ', props),
  }),
);

export default enhance(Authentication);
