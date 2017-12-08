/*
3rd Party library imports
 */
import { createAction } from 'redux-actions';
/*
Project file imports
 */
import { Client, UPDATE_LAST_WILL } from '../../graphql';

const ActionTypes = {
	UPDATE_LAST_WILL: '[Game] UPDATE_LAST_WILL',
};

export const UpdateLastWill = createAction(ActionTypes.UPDATE_LAST_WILL);

export const startLastWillUpdate = (token, lastWill) => dispatch =>
	Client.mutate({
		mutation: UPDATE_LAST_WILL,
		variables: { token, lastWill },
	}).then(result => dispatch(UpdateLastWill(result.data.updateLastWill)))
		.catch(e => dispatch(UpdateLastWill(e)));
