/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import { compose, lifecycle, withHandlers, withState } from 'recompose';

const isAbilityDisabled = (player, props) =>
	player.username === props.player.username
	|| props.player.died
	|| !props.abilityEnabled;

const PlayerList = props => (
	<div className="col-md-3">
		<div className="lead">Players:</div>
		<ul className="list-group">
			{
				props.players.map(player =>
					(<li className="list-group-item d-flex justify-content-between" key={player.username}>
						<span>
							{player.username}
							{player.username === props.player.username &&
							<span className="badge badge-primary ml-2">You</span>}
							{player.died &&
							<span className="badge badge-danger ml-2">Died</span>}
							{props.target === player.username &&
							<span className="badge badge-success ml-2">Targeted</span>}
						</span>
						{
							player.died ? <button
									className="btn btn-sm btn-outline-primary"
									onClick={() => props.onShowLastWill(player)}
								>Last Will</button>
								: <button
									className="btn btn-outline-primary btn-sm"
									disabled={isAbilityDisabled(player, props) || props.target === player.username}
									onClick={() => props._onInteract(player)}
								>{props.phase[0] === 'V' ? 'Vote' : 'Interact'}
								</button>
						}
					</li>))
			}
		</ul>
	</div>
);

const enhancer = compose(
	withState('target', 'updateTarget', ''),
	lifecycle({
		componentWillReceiveProps(nextProps) {
			if (nextProps.phase !== this.props.phase) {
				this.props.updateTarget('');
			}
		},
	}),
	withHandlers({
		_onInteract: props => (player) => {
			props.onInteract({
				gameId: props.gameId,
				source: {
					username: props.player.username,
					died: props.player.died,
					role: props.player.role,
					status: props.player.status,
					interactionResults: props.player.interactionResults,
				},
				target: {
					username: player.username,
					died: props.normalizedPlayers[player.username].died,
					role: props.normalizedPlayers[player.username].role,
					status: props.normalizedPlayers[player.username].status,
					interactionResults: props.normalizedPlayers[player.username].interactionResults,
				},
			});
			props.updateTarget(player.username);
		},
	}),
);

export default enhancer(PlayerList);
