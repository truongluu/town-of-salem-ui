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
import { getAuthToken, getAuthTokenDecoded } from '../redux/reducers';
import { CURRENT_GAME_STATE_QUERY, STATE_UPDATES_SUBSCRIPTION } from '../graphql';
import { GameAction } from '../redux/actions';

// TODO: normalize the game's players.

const Main = props => (
	props.currentStateQuery.currentState.game ? <Game
		{...props.currentStateQuery.currentState.game}
		username={props.username}
		onUpdateLastWill={props.onUpdateLastWill}
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
					currentState: subscriptionData.data.stateUpdates,
				}),
				onError: err => console.error(err),
			}),
	}),
});

const mapStateToProps = state => ({
	token: getAuthToken(state),
	username: getAuthTokenDecoded(state).username,
});

const enhancer = compose(
	connect(mapStateToProps),
	withHandlers({
		onUpdateLastWill: props => lastWill =>
			props.dispatch(GameAction.startLastWillUpdate(props.token, lastWill)),
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
