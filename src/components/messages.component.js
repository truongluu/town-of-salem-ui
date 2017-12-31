import React from 'react';

import Message from './message.component';
import MessageInput from './message-input.component';

const messages = props => (
	<div>
		<h1>Messages:</h1>
		<div>
			{
				props.messages &&
				props.messages.map(message => <Message key={message.message} {...message} />)
			}
		</div>
		<MessageInput
			onAddPublicMessage={props.onAddPublicMessage}
			onAddPrivateMessage={props.onAddPrivateMessage}
			players={props.players}
		/>
	</div>
);

export default messages;
