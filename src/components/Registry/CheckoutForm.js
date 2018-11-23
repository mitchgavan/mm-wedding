import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import Button from '../Button/Button';
import styles from './CheckoutForm.module.css';
import TextInput from '../Form/TextInput/TextInput';
import AlertMessage from '../AlertMessage/AlertMessage';

const dollarsToCents = amount => amount * 100;

class CheckoutForm extends Component {
  state = {
    status: 'default',
    fullName: '',
    emailAddress: '',
    errorMessage: '',
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  submit = async () => {
    const { amount, emailAddress: email } = this.state;

    // let { token } = await this.props.stripe.createToken({ name: 'Name' });

    try {
      await axios.post('/.netlify/functions/charge', {
        amount: dollarsToCents(amount),
        token: 'tok_au',
        email,
      });
      this.setState({ status: 'complete' });
    } catch (err) {
      this.setState({
        status: 'error',
        errorMessage:
          err.response.data.message || 'Sorry, something went wrong.',
      });
    }
  };

  render() {
    const { amount, emailAddress, errorMessage, fullName, status } = this.state;

    if (this.state.status === 'complete') return <h1>Purchase Complete</h1>;

    return (
      <div className={styles.checkout}>
        <label>
          Card details
          <CardElement />
        </label>
        <TextInput
          name="Amount"
          onChange={this.handleChange}
          type="text"
          value={amount}
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
          name="Email address"
          onChange={this.handleChange}
          type="text"
          value={emailAddress}
          required
        />
        <Button onClick={this.submit}>Send Gift</Button>
        {status === 'error' && (
          <AlertMessage type="error">{errorMessage}</AlertMessage>
        )}
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
