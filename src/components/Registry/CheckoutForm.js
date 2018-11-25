import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import isNumber from 'lodash/isNumber';
import Button from '../Button/Button';
import styles from './CheckoutForm.module.css';
import TextInput from '../Form/TextInput/TextInput';
import AlertMessage from '../AlertMessage/AlertMessage';

const dollarsToCents = amount => amount * 100;

const validate = {
  amount: val => isNumber(parseInt(val)) && val > 0,
  emailAddress: val => /\S+@\S+\.\S+/.test(val),
  fullName: val => val.length > 1,
};

class CheckoutForm extends Component {
  state = {
    amount: '',
    status: 'default',
    fullName: '',
    emailAddress: '',
    errorMessage: '',
    invalidFields: ['amount', 'fullName', 'emailAddress'],
    hasBeenValidated: false,
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });

    const isValid = validate[name](value);

    if (!isValid) {
      this.setState(prevState => ({
        invalidFields: prevState.invalidFields.includes(name)
          ? prevState.invalidFields
          : prevState.invalidFields.concat(name),
      }));
    } else {
      this.setState(prevState => ({
        invalidFields: prevState.invalidFields.filter(x => x !== name),
      }));
    }
  };

  submit = async () => {
    const {
      amount,
      fullName,
      hasBeenValidated,
      emailAddress,
      invalidFields,
    } = this.state;

    if (!hasBeenValidated) {
      this.setState({ hasBeenValidated: true });
    }

    if (invalidFields.length) {
      return;
    }

    // let { token } = await this.props.stripe.createToken({ name: 'Name' });

    try {
      await axios.post('/.netlify/functions/charge', {
        amount: dollarsToCents(amount),
        token: 'tok_au',
        email: emailAddress,
        from: fullName,
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
    const {
      amount,
      emailAddress,
      errorMessage,
      fullName,
      hasBeenValidated,
      invalidFields,
      status,
    } = this.state;

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
          isValid={!invalidFields.includes('amount') || !hasBeenValidated}
          errorMessage="Please enter a valid amount."
        />
        <TextInput
          name="Full name"
          onChange={this.handleChange}
          type="text"
          value={fullName}
          isValid={!invalidFields.includes('fullName') || !hasBeenValidated}
          errorMessage="Please let us know who this gift is from."
        />
        <TextInput
          name="Email address"
          onChange={this.handleChange}
          type="text"
          value={emailAddress}
          isValid={!invalidFields.includes('emailAddress') || !hasBeenValidated}
          errorMessage="Please enter a valid email address."
        />
        <Button
          onClick={this.submit}
          disabled={hasBeenValidated && invalidFields.length > 0}
        >
          Send Gift
        </Button>
        {status === 'error' && (
          <AlertMessage type="error">{errorMessage}</AlertMessage>
        )}
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
