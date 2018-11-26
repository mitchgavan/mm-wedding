import React, { Component } from 'react';
import camelCase from 'lodash/camelCase';
import cx from 'classnames';
import styles from './TextInput.module.css';

export default class TextInput extends Component {
  static defaultProps = {
    isValid: true,
  };

  render() {
    const {
      errorMessage,
      isValid,
      name,
      onChange,
      type,
      required,
      alternative,
    } = this.props;

    const sanitizedName = camelCase(name);

    return (
      <div className={styles.field}>
        <label className={styles.label} htmlFor={sanitizedName}>
          {name}
        </label>
        <input
          className={cx(styles.input, { [styles.alternative]: alternative })}
          type={type}
          name={sanitizedName}
          id={sanitizedName}
          onChange={onChange}
          required={required}
        />
        {!isValid && <div className={styles.error}>{errorMessage}</div>}
      </div>
    );
  }
}
