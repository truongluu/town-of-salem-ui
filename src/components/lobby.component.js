/*
3rd Party library imports
 */
import React from 'react';

/*
Project file imports
 */
const Lobby = props => (
	<div>
		<h3>ID: {props.id}</h3>
		<h3>Users: </h3>
		{props.users.map(user => <div key={user}>{user}</div>)}
		<h3>Closed in: {props.isClosed}</h3>
		<button onClick={props.onLeaveLobby}>Leave Lobby</button>
	</div>
);

export default Lobby;

