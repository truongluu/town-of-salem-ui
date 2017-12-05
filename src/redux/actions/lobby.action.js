/*
3rd Party library imports
 */
import { createAction } from 'redux-actions';
/*
Project file imports
 */
import { Client, JOIN_LOBBY_MUTATION, LEAVE_LOBBY_MUTATION } from '../../graphql';

const ActionTypes = {
	JOIN_LOBBY: '[Lobby] JOIN_LOBBY',
	LEAVE_LOBBY: '[Lobby] LEAVE_LOBBY',
};

export const JoinLobby = createAction(ActionTypes.JOIN_LOBBY);
export const LeaveLobby = createAction(ActionTypes.LEAVE_LOBBY);

export const startLobbyJoin = token => dispatch =>
	Client.mutate({
		mutation: JOIN_LOBBY_MUTATION,
		variables: { token },
	}).then(result => dispatch(JoinLobby(result.data.joinLobby)))
		.catch(e => dispatch(JoinLobby(e)));

export const startLobbyLeave = token => dispatch =>
	Client.mutate({
		mutation: LEAVE_LOBBY_MUTATION,
		variables: { token },
	}).then(result => dispatch(LeaveLobby(result.data.leaveLobby)))
		.catch(e => dispatch(LeaveLobby(e)));
