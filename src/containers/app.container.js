/*
3rd party library imports
 */
import React from 'react';
import { compose, lifecycle, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { prop } from 'ramda';
/*
Project file imports
 */
import Login from '../components/authentication.component';
import Main from './main.container';
import { AuthAction } from '../redux/actions';
import { getAuthToken, getAuthTokenDecoded } from '../redux/reducers';

// INFO: App is a container connected to store to get the user.

// const fakeLobby = {
//   id: 'someID',
//   users: ['user1', 'user2', 'user3'],
//   isClosed: 0,
// };

const App = props =>
	(props.username ? <Main />
		: <Login onLogin={props.onLogin} onRegister={props.onRegister} />);

const mapStateToProps = state => ({
	username: prop('username')(getAuthTokenDecoded(state)),
	token: getAuthToken(state),
});

const enhancer = compose(
	connect(mapStateToProps),
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
