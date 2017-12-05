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
import { CURRENT_STATE_QUERY, STATE_UPDATES_SUBSCRIPTION } from '../graphql';
import { getAuthToken, getLobbyCommandResult } from '../redux/reducers';
import Loading from '../components/loading.component';
import LobbyComponent from '../components/lobby.component';

const Lobby = props => (
	<div>
		<h1>Lobby</h1>
		{props.currentStateQuery.currentState
		&& props.currentStateQuery.currentState.lobby
			? <LobbyComponent
				{...props.currentStateQuery.currentState.lobby}
				onLeaveLobby={props.onLeaveLobby}
			/>
			: <button onClick={props.onJoinLobby}>Join Lobby</button>}
	</div>
);

const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZ1bmd1eWVuaHVuZyJ9.YPjyg-w7NN4eCGtCCnk2Z3pehWR-5JmaUeDTgBOfY_c';

const withGraphqlData = graphql(CURRENT_STATE_QUERY, {
	name: 'currentStateQuery',
	options: () => ({
		variables: {
			token: fakeToken,
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
				token: fakeToken,
			});
		},
	}),
	withHandlers({
		onJoinLobby: props => () => props.dispatch(LobbyAction.startLobbyJoin(props.token)),
		onLeaveLobby: props => () => props.dispatch(LobbyAction.startLobbyLeave(props.token)),
	}),
);

export default enhancer(Lobby);
