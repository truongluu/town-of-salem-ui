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
	[ROLES.BLACKMAILER]: 'N',
	[ROLES.SERIAL_KILLER]: 'N',
	[ROLES.VIGILANTE]: 'N',
	[ROLES.JESTER]: 'None',
	[ROLES.SPY]: 'None',
};

const normalizePlayers = reduce((acc, curr) => Object.assign(acc, { [curr.username]: curr }), {});

const enhancer = compose(
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
	lifecycle({
		componentWillReceiveProps() {
			if (this.props.reconnect) {
				this.props.onSync();
			}
		},
	}),
);

export default enhancer(Game);
