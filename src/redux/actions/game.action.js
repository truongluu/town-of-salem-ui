/* eslint-disable max-len */
/*
3rd Party library imports
 */
import { createAction } from 'redux-actions';
/*
Project file imports
 */
import { Client, INTERACT, UPDATE_LAST_WILL } from '../../graphql';

const ActionTypes = {
	UPDATE_LAST_WILL: '[Game] UPDATE_LAST_WILL',
	INTERACT: '[Game] INTERACT',
};

export const UpdateLastWill = createAction(ActionTypes.UPDATE_LAST_WILL);
export const Interact = createAction(ActionTypes.INTERACT);

export const startLastWillUpdate = (token, lastWill) => dispatch =>
	Client.mutate({
		mutation: UPDATE_LAST_WILL,
		variables: { token, lastWill },
	}).then(result => dispatch(UpdateLastWill(result.data.updateLastWill)))
		.catch(e => dispatch(UpdateLastWill(e)));

// source: {"username":"vnhung","lastWill":null,"died":false,"role":"Investigator","__typename":"Player"}
export const startInteract = ({ gameId, source, target }) => dispatch =>
	Client.mutate({
		mutation: INTERACT,
		variables: { gameId, source, target },
	}).then(result => dispatch(Interact(result.data.interact)))
		.catch(e => dispatch(Interact(e)));
