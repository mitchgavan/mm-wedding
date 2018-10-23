import React, { Component } from 'react';

function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000/60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
}

export default class Countdown extends Component {
  state = {
    timeRemaining: 0,
  }

  tick = () => {
    this.setState({
      timeRemaining: getTimeRemaining(new Date(2019, 3, 16)),
    });
  }

  componentDidMount() {
    this.tick();
  }

  componentDidUpdate() {
    if (this.state.timeRemaining.total >= 1000) {
      window.requestAnimationFrame(this.tick)
    }
  }

  render() {
    const { timeRemaining } = this.state;
  
    return (
      <div>
        <div>{timeRemaining.days}</div>
        <div>{timeRemaining.hours}</div>
        <div>{timeRemaining.minutes}</div>
        <div>{timeRemaining.seconds}</div>
      </div>
    )
  }
}
