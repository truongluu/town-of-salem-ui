/* eslint-disable react/jsx-closing-tag-location */
/*
3rd Party library imports
 */
import React from 'react';
import { branch, compose, lifecycle, renderComponent, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
/*
Project file imports
 */
import { LobbyAction } from '../redux/actions';
import { CURRENT_LOBBY_STATE_QUERY, STATE_UPDATES_SUBSCRIPTION } from '../graphql';
import { getAuthToken, getAuthTokenDecoded, getLobbyCommandResult } from '../redux/reducers';
import Loading from '../components/loading.component';
import LobbyComponent from '../components/lobby.component';

const Lobby = props => (
	<div>
		<h1>Lobby</h1>
		<h3>Player: {props.username}</h3>
		{props.currentStateQuery.currentState
		&& props.currentStateQuery.currentState.lobby
			? <LobbyComponent
				{...props.currentStateQuery.currentState.lobby}
				onLeaveLobby={props.onLeaveLobby}
			/>
			: <button onClick={props.onJoinLobby}>Join Lobby</button>}
	</div>
);

const withGraphqlData = graphql(CURRENT_LOBBY_STATE_QUERY, {
	name: 'currentStateQuery',
	options: ({ token }) => ({
		variables: {
			token,
		},
	}),
	props: props => ({
		...props,
		subscribeToStateUpdates: param =>
			props.currentStateQuery.subscribeToMore({
				document: STATE_UPDATES_SUBSCRIPTION,
				variables: { token: param.token },
				updateQuery: (prev, { subscriptionData }) => ({
					currentState: subscriptionData.data.stateUpdates,
				}),
				onError: err => console.error(err),
			}),
	}),
});

const mapStateToProps = state => ({
	commandResult: getLobbyCommandResult(state),
	token: getAuthToken(state),
	username: getAuthTokenDecoded(state).username,
});

const enhancer = compose(
	connect(mapStateToProps),
	withGraphqlData,
	branch(
		props => props.currentStateQuery.loading,
		renderComponent(Loading),
	),
	lifecycle({
		componentDidMount() {
			this.props.subscribeToStateUpdates({
				token: this.props.token,
			});
		},
	}),
	withHandlers({
		onJoinLobby: props => () => props.dispatch(LobbyAction.startLobbyJoin(props.token)),
		onLeaveLobby: props => () => props.dispatch(LobbyAction.startLobbyLeave(props.token)),
	}),
);

export default enhancer(Lobby);
