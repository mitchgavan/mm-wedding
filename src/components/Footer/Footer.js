import React, { Component } from 'react';
import styles from './Footer.module.css';

export default class Footer extends Component {
  render() {
    return (
      <div className={styles.footer}>
        <small>&copy; Copyright {new Date().getFullYear()} Mitch Gavan</small>
      </div>
    );
  }
}
