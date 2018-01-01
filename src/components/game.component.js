/*
3rd Party library imports
 */
import React from 'react';
import { compose, lifecycle, withHandlers, withProps } from 'recompose';
import { reduce } from 'ramda';
import { graphql } from 'react-apollo/index';
/*
Project file imports
 */
import CountdownTimer from './countdown-timer.component';
import LastWill from './last-will.component';
import PlayerList from './player-list.component';
import GameEnded from './game-ended.component';
import { CURRENT_MESSAGES, MESSAGE_SUBSCRIPTION } from '../graphql';
import Messages from './messages.component';

const Game = props => (
	<div>
		<div className="jumbotron bg-primary text-white">
			<div className="container">
				<h1 className="display-3">Game</h1>
				<div className="lead">ID: {props._id}</div>
				<div className="lead">
					<span className="mr-2">
						<span className="mr-2">Current phase:</span>
						<span className="badge badge-light">{props.phase}</span>
					</span>
					<span>Current time: {!props.reconnect ?
						<CountdownTimer initialTimeRemaining={props.time * 1000} />
						: <span className="badge badge-light">N/A</span>}
					</span>
				</div>
			</div>
		</div>
		{props.ended &&
		<GameEnded id={props.id} onGoBackToLobby={props.onGoBackToLobby} won={props.player.won} />}

		<PlayerList
			normalizedPlayers={props.normalizedPlayers}
			abilityEnabled={props.abilityEnabled}
			gameId={props._id}
			player={props.player}
			players={props.players}
			onInteract={props.onInteract}
		/>
		<br />
		<div>Player: {props.player.username}</div>
		<div>Role: {props.player.role}</div>
		{!props.reconnect && <LastWill
			currentPlayerLastWill={props.player.lastWill}
			onUpdateLastWill={props.onUpdateLastWill}
		/>}
		<div>Died: {props.player.died ? 'Died' : 'Not Died'}</div>
		<div>Status: {props.player.status}</div>
		<div>Interaction results: {props.player.interactionResults}</div>
		<Messages
			messages={props.currentMessagesQuery.currentMessages}
			onAddPublicMessage={props._onAddPublicMessage}
			onAddPrivateMessage={props._onAddPrivateMessage}
			players={props.players}
			username={props.username}
			phase={props.phase}
			status={props.player.status}
		/>
	</div>
);

const ROLES = {
	SHERIFF: 'Sheriff',
	DOCTOR: 'Doctor',
	INVESTIGATOR: 'Investigator',
	JAILOR: 'Jailor',
	MEDIUM: 'Medium',
	GODFATHER: 'Godfather',
	FRAMER: 'Framer',
	EXECUTIONER: 'Executioner',
	ESCORT: 'Escort',
	MAFIOSO: 'Mafioso',
	BLACKMAILER: 'Blackmailer',
	SERIAL_KILLER: 'Serial Killer',
	VIGILANTE: 'Vigilante',
	JESTER: 'Jester',
	SPY: 'Spy',
};

const ABILITY_PHASE = {
	[ROLES.SHERIFF]: 'N',
	[ROLES.DOCTOR]: 'D',
	[ROLES.INVESTIGATOR]: 'N',
	[ROLES.JAILOR]: 'D',
	[ROLES.MEDIUM]: 'None',
	[ROLES.GODFATHER]: 'N',
	[ROLES.FRAMER]: 'D',
	[ROLES.EXECUTIONER]: 'None',
	[ROLES.ESCORT]: 'D',
	[ROLES.MAFIOSO]: 'N',
	[ROLES.BLACKMAILER]: 'D',
	[ROLES.SERIAL_KILLER]: 'N',
	[ROLES.VIGILANTE]: 'N',
	[ROLES.JESTER]: 'None',
	[ROLES.SPY]: 'None',
};

const normalizePlayers = reduce((acc, curr) => Object.assign(acc, { [curr.username]: curr }), {});

const withMessageData = graphql(CURRENT_MESSAGES, {
	name: 'currentMessagesQuery',
	options: ({ _id }) => ({
		variables: { gameId: _id },
	}),
	props: props => ({
		...props,
		subscribeToMessage: param =>
			props.currentMessagesQuery.subscribeToMore({
				document: MESSAGE_SUBSCRIPTION,
				variables: { token: param.token },
				updateQuery: (prev, { subscriptionData }) => ({
					currentMessages: [...prev.currentMessages, subscriptionData.data.message],
				}),
				onError: err => console.error(err),
			}),
	}),
});

const enhancer = compose(
	withMessageData,
	withProps((props) => {
		const normalizedPlayers = normalizePlayers(props.players);
		return {
			normalizedPlayers,
			player: normalizedPlayers[props.username],
		};
	}),
	withProps(props => ({
		abilityEnabled: (ABILITY_PHASE[props.player.role] === props.phase[0]
			&& props.player.status !== 'jailed'
			&& props.player.status !== 'blocked')
		|| props.phase[0] === 'V',
	})),
	withHandlers({
		_onAddPublicMessage: props => (value) => {
			props.onAddPublicMessage({
				message: value,
				source: props.player.username,
				gameId: props._id,
			});
		},
		_onAddPrivateMessage: props => (messageAndTarget) => {
			props.onAddPrivateMessage({
				source: props.player.username,
				gameId: props._id,
				...messageAndTarget,
			});
		},
	}),
	lifecycle({
		componentDidMount() {
			this.props.subscribeToMessage({
				token: this.props.token,
			});
		},
		componentWillReceiveProps(nextProps) {
			if (this.props.reconnect && nextProps.phase !== this.props.phase) {
				this.props.onSync();
			}
		},
	}),
);

export default enhancer(Game);
