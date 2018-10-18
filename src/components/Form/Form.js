import React, { Component } from 'react';
import styles from './Form.module.css';

export default class Form extends Component {
  render() {
    const { name } = this.props;

    return (
      <form name={name} method="POST" netlify className={styles.form}>
        <div className={styles.field}>
          <label for="name">Full name</label>
          <input type="text" name="name" id="name" />
        </div>
        <div className={styles.field}>
          <label for="email">Email </label>
          <input type="email" name="email" id="email" />
        </div>
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
        <div className={styles.field}>
          <label for="song">Song request</label>
          <input type="text" name="song" id="song" />
        </div>
        <div className={styles.field}>
          <button type="submit">Send RSVP</button>
        </div>
      </form>
    )
  }
}
