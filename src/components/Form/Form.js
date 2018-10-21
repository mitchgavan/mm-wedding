import React, { Component } from 'react';
import TextInput from './TextInput/TextInput';
import Select from './Select/Select';
import Heading from '../Heading/Heading';
import Button from '../Button/Button';
import styles from './Form.module.css';

const encode = (data) => {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
}

export default class Form extends Component {
  state = {
    attendance: 'Yes',
    dietary: '',
    fullName: '',
    song: '',
    sent: false,
    loading: false,
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    this.setState({ loading: true });

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'rsvp', ...this.state })
    })
      .then(() => {
        this.setState({ 
          sent: true,
          loading: false,
        });
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
      });

    e.preventDefault();
  };

  render() {
    const { attendance, fullName, song, dietary, sent, loading } = this.state;

    return (
      <div className={styles.container}>
        <Heading>RSVP</Heading>
        {sent
          ? (
            <p>Thankyou, your RSVP has been sent to us.</p>
          )
          : (
            <form
              className={styles.form}
              onSubmit={this.handleSubmit}
            >
              <Select
                name="attendance"
                label="Will you be attending?"
                onChange={this.handleChange}
                options={['Yes', 'No']}
                value={attendance}
                required
              />
              <TextInput
                name="Full name"
                onChange={this.handleChange}
                type="text"
                value={fullName}
                required
              />
              <TextInput
                name="Song request"
                onChange={this.handleChange}
                type="text"
                value={song}
              />
              <TextInput
                name="Dietary requirements"
                onChange={this.handleChange}
                type="text"
                value={dietary}
              />
              <div className={styles.buttonContainer}>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Sending...' : 'Send RSVP'}
                </Button>
              </div>
            </form>
          )}
      </div>
    )
  }
}
