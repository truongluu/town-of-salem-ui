/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';

// const message = props => (
// 	props.target
// 		? <li className="list-group-item list-group-item-info">
// 			<b>{props.source === props.username
// 				? `You whispered to ${props.target}: `
// 				: `${props.source} whispered to you: `}</b>
// 			<span>{props.message}</span>
// 		</li>
// 		: <li className="list-group-item">
// 			<b>{props.source}: </b>
// 			<span>{props.message}</span>
// 		</li>
// );

const message = (props) => {
	if (props.target) {
		let title = '';
		if (props.source === props.username) {
			title = `You whispered to ${props.target}: `;
		} else {
			title = `${props.source} whispered to you: `;
		}
		return (<li className="list-group-item list-group-item-info">
			<b>{title}</b>
			<span>{props.message}</span>
		</li>);
	} else if (props.dead) {
		return (<li className="list-group-item list-group-item-light">
			<b className="text-danger">{props.source}: </b>
			<span>{props.message}</span>
		</li>);
	}
	return (<li className="list-group-item">
		<b>{props.source}: </b>
		<span>{props.message}</span>
	</li>);
};

export default message;
