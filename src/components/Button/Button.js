import React, { Component } from 'react';
import cx from 'classnames';
import styles from './Button.module.css';

export default class Button extends Component {
  render() {
    const { children, isLoading, outlined, small, ...props } = this.props;

    const buttonClasses = cx(styles.button, {
      [styles.outlined]: outlined,
      [styles.small]: small,
    });

    return (
      <button className={buttonClasses} {...props}>
        {isLoading ? 'Processing...' : children}
      </button>
    );
  }
}
