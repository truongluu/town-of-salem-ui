/* eslint-disable react/no-array-index-key */

import React from 'react';
import { contains, curry } from 'ramda';

import Message from './message.component';
import MessageInput from './message-input.component';

const MAFIAs = [
	'Godfather',
	'Blackmailer',
	'Framer',
	'Mafioso',
];

const filterMessageMode = curry((props, message) => {
	if (!message.target) { // public message
		if (message.source === 'Mafia') { // mafia message
			return contains(props.role)(MAFIAs) || props.role === 'Spy';
		}
		return true;
	} // private message
	return props.username === message.target
		|| props.username === message.source;
});

const messages = props => (
	<div className="col-md-6">
		<div className="lead">Messages:</div>
		<ul className="list-group border rounded p-2" style={{ height: '500px', overflow: 'scroll' }}>
			{
				props.messages &&
				props.messages
					.filter(filterMessageMode(props))
					.filter(message => (message.dead ? props.died : true)
						|| props.role === 'Medium')
					.map((message, index) => <Message key={index} {...message} username={props.username} />)
			}
		</ul>
		<MessageInput
			onAddPublicMessage={props.onAddPublicMessage}
			onAddPrivateMessage={props.onAddPrivateMessage}
			onAddDeadMessage={props.onAddDeadMessage}
			onAddMafiaMessage={props.onAddMafiaMessage}
			players={props.players}
			username={props.username}
			phase={props.phase}
			status={props.status}
			died={props.died}
			role={props.role}
		/>
	</div>
);

export default messages;
