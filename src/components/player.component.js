import React from 'react';
import LastWill from './last-will.component';
import RoleInformation from './role-information.component';
import InteractionResults from './interaction-results.component';

const Player = props => (
	<div className="card col-md-3">
		<div className="card-body">
			<div>
				<span className="lead mr-2">Player: {props.player.username}</span>
				{props.player.died && <span className="badge badge-danger">Died</span>}
			</div>
			<hr />
			<div className="lead">Role: <b>{props.player.role}</b></div>
			<RoleInformation role={props.player.role} />
			<hr />
			{!props.reconnect && <LastWill
				disabled={props.player.died}
				currentPlayerLastWill={props.player.lastWill}
				onUpdateLastWill={props.onUpdateLastWill}
			/>}
			<hr />
			<InteractionResults interactionResults={props.player.interactionResults} />
		</div>
	</div>
);

export default Player;
