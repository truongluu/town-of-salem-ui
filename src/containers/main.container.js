/* eslint-disable no-shadow,no-tabs,max-len */
/*
3rd Party library imports
 */
import React from 'react';
// import Maybe from 'folktale/maybe';
/*
Project file imports
 */
import Lobby from '../containers/lobby.container';

const Main = props => (
	props.game
		? <h1>This should be Game Component</h1> : <Lobby />
);

// const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZ1bmd1eWVuaHVuZyJ9.YPjyg-w7NN4eCGtCCnk2Z3pehWR-5JmaUeDTgBOfY_c';

export default Main;
