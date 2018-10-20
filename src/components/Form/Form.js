import React, { Component } from 'react';
import TextInput from './TextInput/TextInput';
import Heading from '../Heading/Heading';
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
          <TextInput name="Full name" type="text" />
          <TextInput name="Email" type="email" />
          <div className={styles.field}>
            <p>Will you be attending?</p>
            <div>
              <input type="radio" id="attendingYes"
              name="attending" value="email" />
              <label for="attendingYes">Yes</label>

              <input type="radio" id="attendingNo"
              name="attending" value="phone" />
              <label for="attendingNo">No</label>
            </div>
          </div>
          <TextInput name="Song request" type="text" />
          <div className={styles.field}>
            <button type="submit">Send RSVP</button>
          </div>
        </form>
      </div>
    )
  }
}
