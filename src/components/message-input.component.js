/* eslint-disable no-param-reassign */
import { compose, withHandlers } from 'recompose';

import React from 'react';

const MessageInput = props => (
	<label htmlFor="message-input">Message:
		<input
			id="username-input"
			type="text"
			value={props.username}
			onKeyPress={event => props.onInputMessage(event)}
		/>
	</label>
);

const enhancer = compose(withHandlers({
	onInputMessage: props => (event) => {
		if (event.key === 'Enter') {
			props.onAddPublicMessage(event.target.value);
			event.target.value = '';
		}
	},
}));

export default enhancer(MessageInput);
