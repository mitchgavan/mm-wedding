import React, { Component } from 'react';
import { camelCase } from 'lodash';
import styles from './TextInput.module.css';

export default class TextInput extends Component {
  render() {
    const { name, type } = this.props;
    const sanitizedName = camelCase(name);

    return (
      <div className={styles.field}>
        <label htmlFor={sanitizedName}>{name}</label>
        <input type={type} name={sanitizedName} id={sanitizedName} />
      </div>
    )
  }
}
