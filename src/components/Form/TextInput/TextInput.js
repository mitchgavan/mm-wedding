import React, { Component } from 'react';
import { camelCase } from 'lodash';
import styles from './TextInput.module.css';

export default class TextInput extends Component {
  render() {
    const { name, onChange, type, required } = this.props;
    const sanitizedName = camelCase(name);

    return (
      <div className={styles.field}>
        <label className={styles.label} htmlFor={sanitizedName}>
          {name}
        </label>
        <input
          className={styles.input}
          type={type}
          name={sanitizedName}
          id={sanitizedName}
          onChange={onChange}
          required={required}
        />
      </div>
    );
  }
}
