/* eslint-disable no-shadow,no-tabs,max-len */
/*
3rd Party library imports
 */
import React from 'react';
/*
Project file imports
 */
import Lobby from '../containers/lobby.container';

const Main = props => (
	props.game
		? <h1>This should be Game Component</h1> : <Lobby />
);

export default Main;
