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
      isCurrency,
      name,
      onChange,
      type,
      required,
      alternative,
      label,
      placeholder,
    } = this.props;

    const sanitizedName = camelCase(name);

    const inputClassNames = cx(styles.input, {
      [styles.alternative]: alternative,
      [styles.currency]: isCurrency,
    });

    return (
      <div className={styles.field}>
        {isCurrency && <span className={styles.currencySymbol}>$</span>}
        <label className={styles.label} htmlFor={sanitizedName}>
          {label || name}
        </label>
        {type === 'textarea' ? (
          <textarea
            className={cx(styles.input, { [styles.alternative]: alternative })}
            name={sanitizedName}
            id={sanitizedName}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
          />
        ) : (
          <input
            className={inputClassNames}
            type={type}
            name={sanitizedName}
            id={sanitizedName}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
          />
        )}
        {!isValid && <div className={styles.error}>{errorMessage}</div>}
      </div>
    );
  }
}
