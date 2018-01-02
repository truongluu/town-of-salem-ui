/*
3rd Party library imports
 */
import React from 'react';
import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose';
import { reduce } from 'ramda';
import { graphql } from 'react-apollo/index';
import ReactModal from 'react-modal';
/*
Project file imports
 */
import CountdownTimer from './countdown-timer.component';
import Player from './player.component';
import PlayerList from './player-list.component';
import { CURRENT_MESSAGES, MESSAGE_SUBSCRIPTION } from '../graphql';
import Messages from './messages.component';

ReactModal.setAppElement(document.getElementById('root'));

const Game = props => (
	<div>
		<div className="jumbotron bg-primary text-white">
			<div className="container">
				<h1 className="display-3">Game</h1>
				<div className="lead">ID: {props._id}</div>
				<div className="lead">
					<span className="mr-2">
						<span className="mr-2">Current phase:</span>
						<span className="badge badge-light">{props.phase}</span>
					</span>
					<span>Current time: {!props.reconnect ?
						<CountdownTimer initialTimeRemaining={props.time * 1000} />
						: <span className="badge badge-light">N/A</span>}
					</span>
				</div>
			</div>
		</div>
		<div className="container">
			<div className="row">

				<Player player={props.player} onUpdateLastWill={props.onUpdateLastWill} />

				<Messages
					messages={props.currentMessagesQuery.currentMessages}
					onAddPublicMessage={props._onAddPublicMessage}
					onAddPrivateMessage={props._onAddPrivateMessage}
					onAddDeadMessage={props._onAddDeadMessage}
					onAddMafiaMessage={props._onAddMafiaMessage}
					players={props.players}
					username={props.username}
					phase={props.phase}
					status={props.player.status}
					died={props.player.died}
					role={props.player.role}
				/>

				<PlayerList
					normalizedPlayers={props.normalizedPlayers}
					abilityEnabled={props.abilityEnabled}
					gameId={props._id}
					phase={props.phase}
					player={props.player}
					players={props.players}
					onInteract={props.onInteract}
					onShowLastWill={props.onShowLastWill}
				/>
			</div>
		</div>
		<ReactModal isOpen={props.showModal || false}>
			<div className="d-flex justify-content-between">
				<div className="lead">{props.selectedLastWill}</div>
				<button
					className="btn btn-sm btn-outline-danger"
					onClick={() => props.updateShowModal(false)}
				>
					Close
				</button>
			</div>
		</ReactModal>
		<ReactModal isOpen={props.ended || false}>
			<div className="d-flex justify-content-center">
				<div>
					<div className="display-4">Game Ended</div>
					<div className="display-4">{props.player.won ? 'You won!' : 'You lose!'}</div>
					<button
						className="btn btn-outline-primary"
						onClick={props.onGoBackToLobby}
					>
						Go Back To Lobby
					</button>
				</div>
			</div>
		</ReactModal>
	</div>
);

const ROLES = {
	SHERIFF: 'Sheriff',
	DOCTOR: 'Doctor',
	INVESTIGATOR: 'Investigator',
	JAILOR: 'Jailor',
	MEDIUM: 'Medium',
	GODFATHER: 'Godfather',
	FRAMER: 'Framer',
	EXECUTIONER: 'Executioner',
	ESCORT: 'Escort',
	MAFIOSO: 'Mafioso',
	BLACKMAILER: 'Blackmailer',
	SERIAL_KILLER: 'Serial Killer',
	VIGILANTE: 'Vigilante',
	JESTER: 'Jester',
	SPY: 'Spy',
};

const ABILITY_PHASE = {
	[ROLES.SHERIFF]: 'N',
	[ROLES.DOCTOR]: 'D',
	[ROLES.INVESTIGATOR]: 'N',
	[ROLES.JAILOR]: 'D',
	[ROLES.MEDIUM]: 'None',
	[ROLES.GODFATHER]: 'N',
	[ROLES.FRAMER]: 'D',
	[ROLES.EXECUTIONER]: 'None',
	[ROLES.ESCORT]: 'D',
	[ROLES.MAFIOSO]: 'N',
	[ROLES.BLACKMAILER]: 'D',
	[ROLES.SERIAL_KILLER]: 'N',
	[ROLES.VIGILANTE]: 'N',
	[ROLES.JESTER]: 'None',
	[ROLES.SPY]: 'None',
};

const normalizePlayers = reduce((acc, curr) => Object.assign(acc, { [curr.username]: curr }), {});

const withMessageData = graphql(CURRENT_MESSAGES, {
	name: 'currentMessagesQuery',
	options: ({ _id }) => ({
		variables: { gameId: _id },
	}),
	props: props => ({
		...props,
		subscribeToMessage: param =>
			props.currentMessagesQuery.subscribeToMore({
				document: MESSAGE_SUBSCRIPTION,
				variables: { token: param.token },
				updateQuery: (prev, { subscriptionData }) => ({
					currentMessages: [...prev.currentMessages, subscriptionData.data.message],
				}),
				onError: err => console.error(err),
			}),
	}),
});

const enhancer = compose(
	withMessageData,
	withProps((props) => {
		const normalizedPlayers = normalizePlayers(props.players);
		return {
			normalizedPlayers,
			player: normalizedPlayers[props.username],
		};
	}),
	withProps(props => ({
		abilityEnabled: (ABILITY_PHASE[props.player.role] === props.phase[0]
			&& props.player.status !== 'jailed'
			&& props.player.status !== 'blocked')
		|| props.phase[0] === 'V',
	})),
	withState('showModal', 'updateShowModal', false),
	withState('selectedLastWill', 'updateSelectedLastWill', false),
	withHandlers({
		_onAddPublicMessage: props => (value) => {
			props.onAddPublicMessage({
				message: value,
				source: props.player.username,
				gameId: props._id,
			});
		},
		_onAddDeadMessage: props => (value) => {
			props.onAddDeadMessage({
				message: value,
				source: props.player.username,
				gameId: props._id,
			});
		},
		_onAddPrivateMessage: props => (messageAndTarget) => {
			props.onAddPrivateMessage({
				source: props.player.username,
				gameId: props._id,
				...messageAndTarget,
			});
		},
		_onAddMafiaMessage: props => (value) => {
			props.onAddMafiaMessage({
				source: 'Mafia',
				gameId: props._id,
				message: value,
			});
		},
		onShowLastWill: props => (player) => {
			props.updateSelectedLastWill(player.lastWill);
			props.updateShowModal(true);
		},
	}),
	lifecycle({
		componentDidMount() {
			this.props.subscribeToMessage({
				token: this.props.token,
			});
		},
		componentWillReceiveProps(nextProps) {
			if (this.props.reconnect && nextProps.phase !== this.props.phase) {
				this.props.onSync();
			}
		},
	}),
);

export default enhancer(Game);
