/*
3rd Party library imports
 */
import React from 'react';

/*
Project file imports
 */
const Lobby = props => (
	<div className="row mt-2">
		<ul className="list-group col-md-4">
			{props.users
				.slice(0, 5)
				.map(user => <li className="list-group-item" key={user}>{user}</li>)}
		</ul>
		<ul className="list-group col-md-4">
			{props.users
				.slice(5, 10)
				.map(user => <li className="list-group-item" key={user}>{user}</li>)}
		</ul>
		<ul className="list-group col-md-4">
			{props.users
				.slice(10, 16)
				.map(user => <li className="list-group-item" key={user}>{user}</li>)}
		</ul>
		{props.isClosed !== '0' && <small>Starting in: {props.isClosed}</small>}
	</div>
);

export default Lobby;

