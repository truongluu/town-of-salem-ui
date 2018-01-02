/*
3rd Party library imports
 */
import React from 'react';
import { compose, withHandlers, withState } from 'recompose';
/*
Project file imports
 */

const Authentication = props => (
	<div>
		<div className="jumbotron bg-primary text-white">
			<div className="container">
				<h1 className="display-3">Town Of Salem Mini</h1>
			</div>
		</div>
		<div className="container">
			<div className="row d-flex justify-content-center">
				<form className="card w-50" onSubmit={props.onFormSubmit}>
					<div className="card-header">
						<h3>Authentication</h3>
					</div>
					<div className="card-body px-md-5">
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								id="username-input"
								placeholder="Username"
								value={props.username}
								onChange={event => props.updateUsername(event.target.value)}
							/>
						</div>
						<div className="form-group">
							<input
								type="password"
								className="form-control"
								id="password-input"
								placeholder="Password"
								value={props.password}
								onChange={event => props.updatePassword(event.target.value)}
							/>
						</div>
						<div className="d-flex justify-content-end">
							<button
								type="button"
								className="btn btn-link"
								onClick={() =>
									props.onRegister({ username: props.username, password: props.password })}
							>
								Register
							</button>
							<button
								type="button"
								className="btn btn-outline-primary"
								onClick={() =>
									props.onLogin({ username: props.username, password: props.password })}
							>
								Login
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
);

const enhance = compose(
	withHandlers({
		onFormSubmit: props => (event) => {
			props.onLogin({ username: props.username, password: props.password });
			event.preventDefault();
		},
	}),
	withState('username', 'updateUsername', ''),
	withState('password', 'updatePassword', ''),
);

export default enhance(Authentication);
