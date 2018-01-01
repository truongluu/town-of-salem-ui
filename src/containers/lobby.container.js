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

const isLobbyExisting = props =>
	props.currentStateQuery.currentState
	&& props.currentStateQuery.currentState.lobby;

const Lobby = props => (
	<div>
		<div className="jumbotron bg-primary text-white">
			<div className="container">
				<h1 className="display-3">Lobby</h1>
				{isLobbyExisting(props) &&
				<div className="lead">ID: {props.currentStateQuery.currentState.lobby.id}</div>}
			</div>
		</div>
		<div className="container">
			<div className="row">
				<div className="lead mr-2">Player: <b>{props.username}</b></div>
				{!isLobbyExisting(props) ?
					<button className="btn btn-sm btn-outline-primary" onClick={props.onJoinLobby}>Join
						Lobby</button>
					: <button className="btn btn-sm btn-outline-danger" onClick={props.onLeaveLobby}>Leave
						Lobby</button>}
			</div>
			{isLobbyExisting(props) && <LobbyComponent
				{...props.currentStateQuery.currentState.lobby}
			/>}
		</div>
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
