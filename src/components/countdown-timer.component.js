import React from 'react';
import PropTypes from 'prop-types';

// Generic Countdown Timer UI component
//
// https://github.com/uken/react-countdown-timer
//
// props:
//   - initialTimeRemaining: Number
//       The time remaining for the countdown (in ms).
//
//   - interval: Number (optional -- default: 1000ms)
//       The time between timer ticks (in ms).
//
//   - formatFunc(timeRemaining): Function (optional)
//       A function that formats the timeRemaining.
//
//   - tickCallback(timeRemaining): Function (optional)
//       A function to call each tick.
//
//   - completeCallback(): Function (optional)
//       A function to call when the countdown completes.
//
class CountdownTimer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timeRemaining: this.props.initialTimeRemaining,
			timeoutId: null,
			prevTime: null,
		};
		this.tick = this.tick.bind(this);
		this.getFormattedTime = this.getFormattedTime.bind(this);
	}

	componentDidMount() {
		this.mounted = true;
		this.tick();
	}

	componentWillReceiveProps(newProps) {
		if (newProps.initialTimeRemaining !== this.props.initialTimeRemaining) {
			if (this.state.timeoutId) {
				clearTimeout(this.state.timeoutId);
			}
			this.setState({ prevTime: null, timeRemaining: newProps.initialTimeRemaining });
		}
	}

	componentDidUpdate() {
		if ((!this.state.prevTime) && this.state.timeRemaining > 0 && this.mounted) {
			this.tick();
		}
	}

	componentWillUnmount() {
		this.mounted = false;
		clearTimeout(this.state.timeoutId);
	}

	getFormattedTime(milliseconds) {
		if (this.props.formatFunc) {
			return this.props.formatFunc(milliseconds);
		}

		const totalSeconds = Math.round(milliseconds / 1000);

		let seconds = parseInt(totalSeconds % 60, 10);

		seconds = seconds < 10 ? `0${seconds}` : seconds;

		return `${seconds}`;
	}

	tick() {
		const currentTime = Date.now();
		const dt = this.state.prevTime ? (currentTime - this.state.prevTime) : 0;
		const { interval } = this.props;

		// correct for small variations in actual timeout time
		const timeRemainingInInterval = (interval - (dt % interval));
		let timeout = timeRemainingInInterval;

		if (timeRemainingInInterval < (interval / 2.0)) {
			timeout += interval;
		}

		const timeRemaining = Math.max(this.state.timeRemaining - dt, 0);
		const countdownComplete = (this.state.prevTime && timeRemaining <= 0);

		if (this.mounted) {
			if (this.state.timeoutId) {
				clearTimeout(this.state.timeoutId);
			}
			this.setState({
				timeoutId: countdownComplete ? null : setTimeout(this.tick, timeout),
				prevTime: currentTime,
				timeRemaining,
			});
		}

		if (countdownComplete) {
			if (this.props.completeCallback) {
				this.props.completeCallback();
			}
			return;
		}

		if (this.props.tickCallback) {
			this.props.tickCallback(timeRemaining);
		}
	}

	render() {
		const { timeRemaining } = this.state;

		return (
			<div className="timer">
				{this.getFormattedTime(timeRemaining)}
			</div>
		);
	}
}

CountdownTimer.propTypes = {
	initialTimeRemaining: PropTypes.number.isRequired,
	interval: PropTypes.number,
	formatFunc: PropTypes.func,
	tickCallback: PropTypes.func,
	completeCallback: PropTypes.func,
};

CountdownTimer.defaultProps = {
	interval: 1000,
	formatFunc: null,
	tickCallback: null,
	completeCallback: null,
};

export default CountdownTimer;
