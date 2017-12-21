/* eslint-disable no-shadow,no-tabs,max-len */
/*
3rd Party library imports
 */
import React from 'react';
import { branch, compose, lifecycle, renderComponent, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo/index';
/*
Project file imports
 */
import Lobby from './lobby.container';
import Game from '../components/game.component';
import Loading from '../components/loading.component';
import { getAuthReconnect, getAuthToken, getAuthTokenDecoded } from '../redux/reducers';
import { CURRENT_GAME_STATE_QUERY, STATE_UPDATES_SUBSCRIPTION } from '../graphql';
import { AuthAction, GameAction } from '../redux/actions';

const Main = props => (
	props.currentStateQuery.currentState.game ? <Game
		{...props.currentStateQuery.currentState.game}
		username={props.username}
		onUpdateLastWill={props.onUpdateLastWill}
		reconnect={props.reconnect}
		onSync={props.onSync}
		onInteract={props.onInteract}
	/> : <Lobby />
);

const withGraphqlData = graphql(CURRENT_GAME_STATE_QUERY, {
	name: 'currentStateQuery',
	options: ({ token }) => ({
		variables: { token },
	}),
	props: props => ({
		...props,
		subscribeToStateUpdates: param =>
			props.currentStateQuery.subscribeToMore({
				document: STATE_UPDATES_SUBSCRIPTION,
				variables: { token: param.token },
				updateQuery: (prev, { subscriptionData }) => ({
					// INFO: prev contains previous state.
					currentState: subscriptionData.data.stateUpdates,
				}),
				onError: err => console.error(err),
			}),
	}),
});

const mapStateToProps = state => ({
	token: getAuthToken(state),
	username: getAuthTokenDecoded(state).username,
	reconnect: getAuthReconnect(state),
});

// is reconnect == true, hide Countdown timer and disable interaction
const enhancer = compose(
	connect(mapStateToProps),
	withHandlers({
		onUpdateLastWill: props => lastWill =>
			props.dispatch(GameAction.startLastWillUpdate(props.token, lastWill)),
		onInteract: props => interaction =>
			props.dispatch(GameAction.startInteract(interaction)),
		onSync: props => () => props.dispatch(AuthAction.Sync()),
	}),
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
);
export default enhancer(Main);
