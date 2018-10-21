import React, { Component } from 'react';
import TextInput from './TextInput/TextInput';
import Select from './Select/Select';
import Heading from '../Heading/Heading';
import Button from '../Button/Button';
import styles from './Form.module.css';

export default class Form extends Component {
  render() {
    const { name } = this.props;

    return (
      <div className={styles.container}>
        <Heading>RSVP</Heading>
        <form 
          name={name}
          className={styles.form}
          method="POST" 
          netlify 
        >
          <Select
            name="attendance"
            label="Will you be attending?"
            options={['Yes', 'No']}
            value=""
          />
          <TextInput name="Full name" type="text" required />
          <TextInput name="Song request" type="text" />
          <TextInput name="Dietary requirements" type="text" />
          <div className={styles.buttonContainer}>
            <Button type="submit">Send RSVP</Button>
          </div>
        </form>
      </div>
    )
  }
}
