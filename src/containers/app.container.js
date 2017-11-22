/*
3rd party library imports
 */
import React from 'react';
import { compose, lifecycle, withHandlers } from 'recompose';
import { connect } from 'react-redux';
/*
Project file imports
 */
import Login from '../components/authentication.component';
import { AuthAction } from '../actions';
import { getAuthUsername } from '../reducers';

// INFO: App is a container connected to store to get the user.

// props: {username: ...}
const App = props =>
  (props.username ? <h1>Hello to TOS</h1>
    : <Login onLogin={props.onLogin} onRegister={props.onRegister} />);

const mapStateToProps = state => ({
  username: getAuthUsername(state),
});

const enhancer = compose(
  connect(mapStateToProps /* , mapDispatchToProp  */),
  withHandlers({
    onLogin: props => user => props.dispatch(AuthAction.startUserLogin(user)),
    onRegister: props => user => props.dispatch(AuthAction.startUserRegister(user)),
  }),
  lifecycle({
    componentDidMount() {
      this.props.dispatch(AuthAction.startUserInit());
    },
  }),
);
export default enhancer(App);
