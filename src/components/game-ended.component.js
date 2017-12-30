import React from 'react';

const GameEnded = props => (
	<div>
		<div>Game {props.id} Ended!</div>
		<button onClick={props.onGoBackToLobby}>Go Back To Lobby</button>
	</div>
);

GameEnded.propTypes = {};
GameEnded.defaultProps = {};

export default GameEnded;
