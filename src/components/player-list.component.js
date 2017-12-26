/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';

const PlayerList = props => (
	<div>
		<div>Players:</div>
		{
			props.players.map(player =>
				(<div key={player.username}>
					<button
						disabled={player.username === props.player.username
						|| props.player.died
						|| !props.abilityEnabled
						|| player.died}
						onClick={() => props.onInteract({
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
						})}
					>{player.username}
					</button>
				</div>))
		}
	</div>
);

export default PlayerList;
