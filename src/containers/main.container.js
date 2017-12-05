/* eslint-disable no-shadow,no-tabs,max-len */
/*
3rd Party library imports
 */
import React from 'react';
/*
Project file imports
 */
import Lobby from './lobby.container';
import Game from './game.container';

const Main = props => (
	props.game
		? <Game /> : <Lobby />
);

export default Main;
