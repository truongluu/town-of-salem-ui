/*
3rd Party library imports
 */
import React from 'react';
import { compose, withState } from 'recompose';
/*
Project file imports
 */

const Authentication = props => (
  <div>
    <h1>Authentication</h1>
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
    <button onClick={() => props.onLogin({ username: props.username, password: props.password })}>
      Login
    </button>
    <small>or</small>
    <button
      onClick={() => props.onRegister({ username: props.username, password: props.password })}
    >
      Register
    </button>
  </div>
);

const enhance = compose(
	withState('username', 'updateUsername', ''),
	withState('password', 'updatePassword', ''),
);

export default enhance(Authentication);
