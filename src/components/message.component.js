import React from 'react';

const message = props => (
	<div>
		<div>source: {props.source}</div>
		<div>target: {props.target}</div>
		<div>message: {props.message}</div>
	</div>
);

export default message;
