/* eslint-disable max-len, react/jsx-closing-tag-location */
/*
3rd Party library imports
 */
import React from 'react';
import { compose, lifecycle, withProps } from 'recompose';
import { reduce } from 'ramda';
/*
Project file imports
 */
import CountdownTimer from './countdown-timer.component';
import LastWill from './last-will.component';
import PlayerList from './player-list.component';

const Game = props => (
	<div>
		<h1>Game Component</h1>
		<h3>ID: {props._id}</h3>
		<h3>phase: {props.phase}</h3>
		{!props.reconnect ? <CountdownTimer initialTimeRemaining={props.time * 1000} />
			: <div>Interactions are disabled until the next phase</div>}

		<PlayerList
			normalizedPlayers={props.normalizedPlayers}
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
		<div>Died: {props.player.died}</div>
		<div>Status: {props.player.status}</div>
		<div>Interaction results: {props.player.interactionResults}</div>
	</div>
);

const normalizePlayers = reduce((acc, curr) => Object.assign(acc, { [curr.username]: curr }), {});

const enhancer = compose(
	withProps((props) => {
		const normalizedPlayers = normalizePlayers(props.players);
		return {
			normalizedPlayers,
			player: normalizedPlayers[props.username],
		};
	}),
	lifecycle({
		componentWillReceiveProps() {
			if (this.props.reconnect) {
				this.props.onSync();
			}
		},
	}),
);

export default enhancer(Game);
