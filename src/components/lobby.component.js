/* eslint-disable react/jsx-closing-tag-location */
/*
3rd Party library imports
 */
import React from 'react';

/*
Project file imports
 */

const Lobby = props => (
	<div>
		<h1>Lobby</h1>
		<small>{props.commandResult}</small>
		{props.currentState ? <div>
			<button onClick={props.onLeaveLobby}>Leave Lobby</button>
			<h3>ID: {props.currentState.lobby.id}</h3>
			<h3>Users: </h3>
			{props.currentState.lobby.users.map(user => <div key={user}>{user}</div>)}
			<h3>Closed in: {props.currentState.lobby.isClosed}</h3>
		</div> : <button onClick={props.onJoinLobby}>Join Lobby</button>
		}
	</div>
);

export default Lobby;
