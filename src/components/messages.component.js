/* eslint-disable react/no-array-index-key */

import React from 'react';

import Message from './message.component';
import MessageInput from './message-input.component';

const messages = props => (
	<div className="col-md-6">
		<div className="lead">Messages:</div>
		<ul className="list-group border rounded p-2" style={{ height: '500px', overflow: 'scroll' }}>
			{
				props.messages &&
				props.messages
					.filter(message =>
						(!message.target ? true
							: props.username === message.target
							|| props.username === message.source))
					.map((message, index) => <Message key={index} {...message} username={props.username} />)
			}
		</ul>
		<MessageInput
			onAddPublicMessage={props.onAddPublicMessage}
			onAddPrivateMessage={props.onAddPrivateMessage}
			players={props.players}
			username={props.username}
			phase={props.phase}
			status={props.status}
		/>
	</div>
);

export default messages;
