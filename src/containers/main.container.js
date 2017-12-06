/* eslint-disable no-shadow,no-tabs,max-len */
/*
3rd Party library imports
 */
import React from 'react';
import { branch, compose, lifecycle, renderComponent } from 'recompose';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo/index';
/*
Project file imports
 */
import Lobby from './lobby.container';
import Game from '../components/game.component';
import Loading from '../components/loading.component';
import { getAuthToken } from '../redux/reducers';
import { CURRENT_GAME_STATE_QUERY, STATE_UPDATES_SUBSCRIPTION } from '../graphql';

const Main = props => (
	props.currentStateQuery.currentState.game ?
		<Game {...props.currentStateQuery.currentState.game} /> : <Lobby />
);

const withGraphqlData = graphql(CURRENT_GAME_STATE_QUERY, {
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
				token: this.props.token,
			});
		},
	}),
);

export default enhancer(Main);
