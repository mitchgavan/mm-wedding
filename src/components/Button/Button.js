import React, { Component } from 'react';
import styles from './Button.module.css';

export default class Button extends Component {
  render() {
    const { children, ...props } = this.props;

    return (
      <button className={styles.button} {...props}>
        {children}
      </button>
    )
  }
}
