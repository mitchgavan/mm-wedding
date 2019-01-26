import React, { Component } from 'react';
import styles from './Countdown.module.css';

function getTimeRemaining(endtime) {
  const total = Date.parse(new Date(endtime)) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
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
  };

  tick = () => {
    this.setState({
      timeRemaining: getTimeRemaining('March 16, 2019 16:00:00'),
    });
  };

  componentDidMount() {
    this.tick();
  }

  componentDidUpdate() {
    if (this.state.timeRemaining.total >= 1000) {
      window.requestAnimationFrame(this.tick);
    }
  }

  render() {
    const { timeRemaining } = this.state;

        <div className={styles.countdown}>
          <div className={styles.complete}>The countdown is over!</div>
        </div>
      );
    }

    return (
      <div className={styles.countdown}>
        {Object.entries(timeRemaining)
          .filter(([key]) => key !== 'total')
          .map(([key, value]) => (
            <div key={key} className={styles.block}>
              <div className={styles.number}>{value}</div>
              <div className={styles.unit}>{key}</div>
            </div>
          ))}
      </div>
    );
  }
}
