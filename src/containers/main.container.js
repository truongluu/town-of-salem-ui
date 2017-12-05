/* eslint-disable no-shadow,no-tabs */
/*
3rd Party library imports
 */
import React from 'react';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import Maybe from 'folktale/maybe';
/*
Project file imports
 */
import Lobby from '../components/lobby.component';
import { LobbyAction } from '../actions';
import { getAuthToken, getLobbyCommandResult } from '../reducers';
import { CURRENT_STATE_QUERY } from '../graphql';

const Main = props => (
	props.game
		? <h1>This should be Game Component</h1> : <Lobby
			commandResult={props.commandResult}
			currentState={props.data.currentState}
			onJoinLobby={props.onJoinLobby}
			onLeaveLobby={props.onLeaveLobby}
		/>
);

const withGraphqlData = graphql(CURRENT_STATE_QUERY, {
	options: () => ({
		variables: {
			token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZ1bmd1eWVuaHVuZyJ9.YPjyg-w7NN4eCGtCCnk2Z3pehWR-5JmaUeDTgBOfY_c',
		},
		props: ({ ownProps, data }) => ({
			ownProps,
			data: Maybe.of(data),
		}),
		// props: props => ({
		//   subscribeToStateUpdates: params =>
		//     props.currentState.subscribeToMore({
		//       document: STATE_UPDATES_SUBSCRIPTION,
		//       variables: { token: params.token },
		//       updateQuery: (prev, { subscriptionData }) => {
		//         console.log('prev: ', prev);
		//         console.log('subscriptionData:', subscriptionData);
		//         return subscriptionData;
		//       },
		//     }),
		// }),
	}),
});

const mapStateToProps = state => ({
	commandResult: getLobbyCommandResult(state),
	token: getAuthToken(state),
});

const enhancer = compose(
	connect(mapStateToProps),
	withGraphqlData,
	withHandlers({
		onJoinLobby: props => () => props.dispatch(LobbyAction.startLobbyJoin(props.token)),
		onLeaveLobby: props => () => props.dispatch(LobbyAction.startLobbyLeave(props.token)),
	}),
);

export default enhancer(Main);
