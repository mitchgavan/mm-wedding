import React, { Component } from 'react';
import styles from './Select.module.css';

export default class Select extends Component {
  render() {
    const { name, label, options, value } = this.props;

    return (
      <div className={styles.field}>
        <label className={styles.label}>{label}</label>
        <select className={styles.select} id={name} value={value} required>
          {options.map(text => (
            <option key={text} value={text}>{text}</option>
          ))}
        </select>
      </div>
    )
  }
}
