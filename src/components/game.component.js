/* eslint-disable max-len, react/jsx-closing-tag-location */
/*
3rd Party library imports
 */
import React from 'react';
import { compose, withProps, withState } from 'recompose';
import { reduce } from 'ramda';

/*
Project file imports
 */

const Game = props => (
	<div>
		<h1>Game Component</h1>
		<h3>ID: {props._id}</h3>
		<div>Users:</div>
		{
			props.players.map(player =>
				(<div key={player.username}>
					username: {player.username}
					<br />
					lastWill: {player.lastWill}
					<br />
					died: {player.died}
				</div>))
		}
		<br />
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
		<br />
		<small>createdAt: {props.createdAt}</small>
		<br />
		<small>updatedAt: {props.updatedAt}</small>
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
);

export default enhancer(Game);