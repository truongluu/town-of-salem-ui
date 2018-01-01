/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';

const message = props => (
	props.target
		? <li className="list-group-item list-group-item-info">
			<b>{props.source === props.username
				? `You whispered to ${props.target}: `
				: `${props.source} whispered to you: `}</b>
			<span>{props.message}</span>
		</li>
		: <li className="list-group-item">
			<b>{props.source}: </b>
			<span>{props.message}</span>
		</li>
);

export default message;
