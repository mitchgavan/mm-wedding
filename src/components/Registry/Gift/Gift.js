import React, { Component } from 'react';
import cx from 'classnames';
import styles from './Gift.module.css';

export default class Gift extends Component {
  render() {
    const { isSelected, title } = this.props;

    return (
      <div className={cx(styles.gift, { [styles.selected]: isSelected })}>
        <h3>{title}</h3>
      </div>
    );
  }
}
