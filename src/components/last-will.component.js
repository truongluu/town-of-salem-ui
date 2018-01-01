/* eslint-disable max-len */
import React from 'react';
import { compose, withState } from 'recompose';

const LastWill = props => (
	<div>
		<div>
			<span className="lead mr-2">Last Will:</span>
			<button
				className="btn btn-sm btn-outline-primary"
				onClick={() => props.onUpdateLastWill(props.playerLastWill)}
			>
				Update
			</button>
		</div>
		<div className="form-group mt-2">
			<textarea
				className="form-control"
				id="exampleFormControlTextarea1"
				rows="3"
				style={{ resize: 'none' }}
				value={props.playerLastWill}
				onChange={event => props.updatePlayerLastWill(event.target.value)}
			/>
		</div>
	</div>
);

const enhancer = compose(withState(
	'playerLastWill',
	'updatePlayerLastWill',
	props => props.currentPlayerLastWill || '',
));

export default enhancer(LastWill);
