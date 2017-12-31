import React from 'react';

import Message from './message.component';
import MessageInput from './message-input.component';

const messages = props => (
	<div>
		<h1>Messages:</h1>
		<div>
			{
				props.messages &&
				props.messages
					.filter(message =>
						(!message.target ? true
							: props.username === message.target
							|| props.username === message.source))
					.map(message => <Message key={message.message} {...message} />)
			}
		</div>
		<MessageInput
			onAddPublicMessage={props.onAddPublicMessage}
			onAddPrivateMessage={props.onAddPrivateMessage}
			players={props.players}
			username={props.username}
		/>
	</div>
);

export default messages;
