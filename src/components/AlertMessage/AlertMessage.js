import React, { Component } from 'react';
import cx from 'classnames';
import styles from './AlertMessage.module.css';

export default class AlertMessage extends Component {
  render() {
    const { children, type } = this.props;

    const alertClassNames = cx(styles.alertMessage, {
      [styles.error]: type === 'error',
      [styles.success]: type === 'success',
    });

    return <div className={alertClassNames}>{children}</div>;
  }
}
