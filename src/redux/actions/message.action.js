/* eslint-disable max-len */
/*
3rd Party library imports
 */
import { createAction } from 'redux-actions';
/*
Project file imports
 */
import { ADD_DEAD_MESSAGE, ADD_PRIVATE_MESSAGE, ADD_PUBLIC_MESSAGE, Client } from '../../graphql';

const ActionTypes = {
	ADD_PUBLIC_MESSAGE: '[Message] ADD_PUBLIC_MESSAGE',
	ADD_DEAD_MESSAGE: '[Message] ADD_DEAD_MESSAGE',
	ADD_PRIVATE_MESSAGE: '[Message] ADD_PRIVATE_MESSAGE',
};

export const AddPublicMessage = createAction(ActionTypes.ADD_PUBLIC_MESSAGE);
export const AddDeadMessage = createAction(ActionTypes.ADD_DEAD_MESSAGE);
export const AddPrivateMessage = createAction(ActionTypes.ADD_PRIVATE_MESSAGE);

// "message": {
// 	"source": "vnhung",
// 		"message": "m2",
// 		"gameId": "5a48f640cae866001d36b428"
// }
export const startPublicMessageAdd = message => dispatch =>
	Client.mutate({
		mutation: ADD_PUBLIC_MESSAGE,
		variables: { message },
	}).then(result => dispatch(AddPublicMessage(result.data.addPublicMessage)))
		.catch(e => dispatch(AddPublicMessage(e)));

export const startDeadMessageAdd = message => dispatch =>
	Client.mutate({
		mutation: ADD_DEAD_MESSAGE,
		variables: { message },
	}).then(result => dispatch(AddDeadMessage(result.data.addDeadMessage)))
		.catch(e => dispatch(AddDeadMessage(e)));

export const startPrivateMessageAdd = message => dispatch =>
	Client.mutate({
		mutation: ADD_PRIVATE_MESSAGE,
		variables: { message },
	}).then(result => dispatch(AddPrivateMessage(result.data.addPrivateMessage)))
		.catch(e => dispatch(AddPrivateMessage(e)));

