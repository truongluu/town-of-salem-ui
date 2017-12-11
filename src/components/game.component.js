/* eslint-disable max-len, react/jsx-closing-tag-location */
/*
3rd Party library imports
 */
import React from 'react';
import { compose, lifecycle, withProps, withState } from 'recompose';
import { reduce } from 'ramda';
/*
Project file imports
 */
import CountdownTimer from './countdown-timer.component';

const Game = props => (
	<div>
		<h1>Game Component</h1>
		<h3>ID: {props._id}</h3>
		<h3>phase: {props.phase}</h3>
		{!props.reconnect ? <CountdownTimer initialTimeRemaining={props.time * 1000} />
			: <div>Interactions is disabled until next phase</div>}

		<div>Players:</div>
		{
			props.players.map(player =>
				(<div key={player.username}>
					{player.username}
				</div>))
		}
		<br />
		<div>Player: {props.player.username}</div>
		<div>Role: {props.player.role}</div>
		<label htmlFor="last-will-input">Last Will:
			<input
				id="last-will-input"
				type="text"
				value={props.playerLastWill || ''}
				onChange={event => props.updatePlayerLastWill(event.target.value)}
				// onBlur={() => props.updatePlayerLastWill(props.normalizedPlayers[props.username].lastWill || '')}
			/>
		</label>
		<button onClick={() => props.onUpdateLastWill(props.playerLastWill)}>Update last will</button>
	</div>
);

const normalizePlayers = reduce((acc, curr) => Object.assign(acc, { [curr.username]: curr }), {});

const enhancer = compose(
	withProps(props => ({
		normalizedPlayers: normalizePlayers(props.players),
	})),
	withProps(props => ({
		player: props.normalizedPlayers[props.username],
	})),
	withState(
		'playerLastWill',
		'updatePlayerLastWill',
		props => props.player.lastWill || '',
	),
	lifecycle({
		componentWillReceiveProps() {
			if (this.props.reconnect) {
				this.props.onSync();
			}
		},
	}),
);

export default enhancer(Game);
