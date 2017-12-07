/*
3rd Party library imports
 */
import React from 'react';

/*
Project file imports
 */

const Game = props => (
	<div>
		<h1>Game Component</h1>
		<h3>ID: {props._id}</h3>
		<div>Users:</div>
		{props.players.map(player => <div key={player.username}>{player.username}</div>)}
		<br />
		<small>createdAt: {props.createdAt}</small>
		<br />
		<small>updatedAt: {props.updatedAt}</small>
	</div>
);

export default Game;
