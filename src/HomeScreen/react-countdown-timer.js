/* eslint-disable */

// copied from https://github.com/uken/react-countdown-timer/blob/8e473bb5b878383dab30ddf60160efca9e861128/countdown_timer.jsx

import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Generic Countdown Timer UI component
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

class CountdownTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getDefaultProps() {
    return {
      interval: 1000,
      formatFunc: undefined,
      tickCallback: undefined,
      completeCallback: undefined,
    }
  }

  getInitialState() {
    // Normally an anti-pattern to use this.props in getInitialState,
    // but these are all initializations (not an anti-pattern).
    return {
      timeRemaining: this.props.initialTimeRemaining,
      timeoutId: undefined,
      prevTime: undefined,
    }
  }

  componentWillReceiveProps(newProps, oldProps) {
    if (this.state.timeoutId) clearTimeout(this.state.timeoutId)
    this.setState({ prevTime: undefined, timeRemaining: newProps.initialTimeRemaining })
  }

  componentDidMount() {
    this.tick()
  }

  componentDidUpdate() {
    if ((!this.state.prevTime) && this.state.timeRemaining > 0 && this.isMounted()) {
      this.tick()
    }
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeoutId)
  }

  tick() {
    const currentTime = Date.now()
    const dt = currentTime - this.state.prevTime || 0
    const interval = this.props.interval

    // correct for small variations in actual timeout time
    const timeRemainingInInterval = (interval - (dt % interval))
    let timeout = timeRemainingInInterval

    if (timeRemainingInInterval < (interval / 2.0)) {
      timeout += interval
    }

    const timeRemaining = Math.max(this.state.timeRemaining - dt, 0)
    const countdownComplete = (this.state.prevTime && timeRemaining <= 0)

    if (this.isMounted()) {
      if (this.state.timeoutId) clearTimeout(this.state.timeoutId)
      this.setState({
        timeoutId: countdownComplete ? undefined : setTimeout(this.tick, timeout),
        prevTime: currentTime,
        timeRemaining,
      })
    }

    if (countdownComplete) {
      if (this.props.completeCallback) { this.props.completeCallback() }
      return
    }

    if (this.props.tickCallback) {
      this.props.tickCallback(timeRemaining)
    }
  }


  getFormattedTime(milliseconds) {
    if (this.props.formatFunc) {
      return this.props.formatFunc(milliseconds)
    }

    const totalSeconds = Math.round(milliseconds / 1000)

    let seconds = parseInt(totalSeconds % 60, 10)
    let minutes = parseInt(totalSeconds / 60, 10) % 60
    let hours = parseInt(totalSeconds / 3600, 10)

    seconds = seconds < 10 ? `0${seconds}` : seconds
    minutes = minutes < 10 ? `0${minutes}` : minutes
    hours = hours < 10 ? `0${hours}` : hours

    return `${hours} hours ${minutes} minutes and ${seconds} seconds`
  }

  render() {
    const timeRemaining = this.state.timeRemaining

    return (
      <span>
        {this.getFormattedTime(timeRemaining)}
      </span>
    )
  }
}

CountdownTimer.propTypes = {
  initialTimeRemaining: PropTypes.number.isRequired,
  interval: PropTypes.number,
  formatFunc: PropTypes.func,
  tickCallback: PropTypes.func,
  completeCallback: PropTypes.func,
}

export default CountdownTimer
