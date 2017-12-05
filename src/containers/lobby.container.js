/* eslint-disable react/jsx-closing-tag-location */
/*
3rd Party library imports
 */
import React from 'react';
import { compose, lifecycle, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
/*
Project file imports
 */
import { LobbyAction } from '../actions';
import { CURRENT_STATE_QUERY, STATE_UPDATES_SUBSCRIPTION } from '../graphql';
import { getAuthToken, getLobbyCommandResult } from '../reducers';

const Lobby = props => (
	<div>
		<h1>Lobby</h1>
		<small>{props.commandResult}</small>
		{props.currentStateQuery.currentState ? <div>
			<button onClick={props.onLeaveLobby}>Leave Lobby</button>
			<h3>ID: {props.currentStateQuery.currentState.lobby.id}</h3>
			<h3>Users: </h3>
			{props.currentStateQuery.currentState.lobby.users.map(user => <div key={user}>{user}</div>)}
			<h3>Closed in: {props.currentStateQuery.currentState.lobby.isClosed}</h3>
		</div> : <button onClick={props.currentStateQuery.onJoinLobby}>Join Lobby</button>
		}
	</div>
);

const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZ1bmd1eWVuaHVuZyJ9.YPjyg-w7NN4eCGtCCnk2Z3pehWR-5JmaUeDTgBOfY_c';

const withGraphqlData = graphql(CURRENT_STATE_QUERY, {
	// props: ({ ownProps, data }) => ({
	// 	ownProps,
	// 	data: Maybe.fromNullable(data),
	// }),
	name: 'currentStateQuery',
	options: () => ({
		variables: {
			token: fakeToken,
		},
	}),
	// props: props => ({
	// 	...props,
	// 	subscribeToStateUpdates: param =>
	// 		props.data.subscribeToMore({
	// 			document: STATE_UPDATES_SUBSCRIPTION,
	// 			variables: { token: param.token },
	// 			updateQuery: (prev, { subscriptionData }) => {
	// 				console.log('prev: ', prev);
	// 				console.log('subscriptionData:', subscriptionData);
	// 				// if (!subscriptionData) {
	// 				// 	return prev;
	// 				// }
	// 				// console.log('subscriptionData: ', subscriptionData);
	// 				return Object.assign({}, prev, {
	// 					currentState: subscriptionData.data.stateUpdates,
	// 				});
	// 			},
	// 		}),
	// }),
});

const mapStateToProps = state => ({
	commandResult: getLobbyCommandResult(state),
	token: getAuthToken(state),
});

const enhancer = compose(
	connect(mapStateToProps),
	withGraphqlData,
	lifecycle({
		componentDidMount() {
			this.props.currentStateQuery.subscribeToMore({
				document: STATE_UPDATES_SUBSCRIPTION,
				variables: { token: fakeToken },
				updateQuery: (prev, { subscriptionData }) => {
					console.log('prev: ', prev);
					console.log('subscriptionData:', subscriptionData);
					// if (!subscriptionData) {
					// 	return prev;
					// }
					// console.log('subscriptionData: ', subscriptionData);
					return Object.assign({}, prev, {
						currentState: subscriptionData.data.stateUpdates,
					});
				},
				onError: err => console.error(err),
			});
		},
	}),
	withHandlers({
		onJoinLobby: props => () => props.dispatch(LobbyAction.startLobbyJoin(props.token)),
		onLeaveLobby: props => () => props.dispatch(LobbyAction.startLobbyLeave(props.token)),
	}),
);

export default enhancer(Lobby);
