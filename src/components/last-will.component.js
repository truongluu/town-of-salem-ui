/* eslint-disable max-len */
import React from 'react';
import { compose, withState } from 'recompose';

const LastWill = props => (
	<div>
		<label htmlFor="last-will-input">Last Will:
			<input
				id="last-will-input"
				type="text"
				value={props.playerLastWill}
				onChange={event => props.updatePlayerLastWill(event.target.value)}
				// onBlur={() => props.updatePlayerLastWill(props.normalizedPlayers[props.username].lastWill || '')}
			/>
		</label>
		<button onClick={() => props.onUpdateLastWill(props.playerLastWill)}>Update last will</button>
	</div>
);

const enhancer = compose(withState(
	'playerLastWill',
	'updatePlayerLastWill',
	props => props.currentPlayerLastWill,
));

export default enhancer(LastWill);
