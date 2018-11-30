import React, { Component } from 'react';
import cx from 'classnames';
import styles from './Gift.module.css';

export default class Gift extends Component {
  render() {
    const { image, isSelected, title } = this.props;

    return (
      <div className={cx(styles.gift, { [styles.selected]: isSelected })}>
        <div className={styles.image}>
          <img src={image} alt={title} />
        </div>
        <div className={styles.body}>
          <h3 className={styles.title}>{title}</h3>
        </div>
      </div>
    );
  }
}
