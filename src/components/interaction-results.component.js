/* eslint-disable react/no-array-index-key */
import React from 'react';

const InteractionResults = props => (
	<div>
		<span className="lead">Interaction results:</span>
		<ul className="list-group">
			{props.interactionResults.map((result, index) =>
				<div className="list-group-item" key={index}>{result}</div>)}
		</ul>
	</div>
);

export default InteractionResults;
