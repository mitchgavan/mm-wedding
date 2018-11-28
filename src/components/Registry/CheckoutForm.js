import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import isNumber from 'lodash/isNumber';
import Button from '../Button/Button';
import styles from './CheckoutForm.module.css';
import TextInput from '../Form/TextInput/TextInput';
import AlertMessage from '../AlertMessage/AlertMessage';
import { ReactComponent as StripeLogo } from '../../svg/powered-by-stripe.svg';

const dollarsToCents = amount => amount * 100;

const validate = {
  amount: val => isNumber(parseInt(val)) && val > 0,
  emailAddress: val => /\S+@\S+\.\S+/.test(val),
  fullName: val => val.length > 1,
};

class CheckoutForm extends Component {
  state = {
    amount: '',
    cardError: null,
    status: 'default',
    fullName: '',
    emailAddress: '',
    errorMessage: null,
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

  handleCardChange = e => {
    if (e.error) {
      this.setState({ cardError: e.error.message });
    } else {
      this.setState({ cardError: null });
    }
  };

  submit = () => {
    const {
      amount,
      cardError,
      fullName,
      hasBeenValidated,
      emailAddress,
      invalidFields,
    } = this.state;

    if (!hasBeenValidated) {
      this.setState({ hasBeenValidated: true });
    }

    if (invalidFields.length || cardError) return;

    this.setState({ status: 'loading' });

    this.props.stripe
      .createToken({ name: fullName })
      .then(({ token }) => {
        axios
          .post('/.netlify/functions/charge', {
            amount: dollarsToCents(amount),
            token: token.id, // 'tok_au',
            email: emailAddress,
            from: fullName,
          })
          .then(() => {
            this.setState({ status: 'complete' });
          })
          .catch(err => {
            this.setState({
              status: 'error',
              errorMessage:
                err.response.data.message || 'Sorry, something went wrong.',
            });
          });
      })
      .catch(err => {
        this.setState({ status: 'default' });
      });
  };

  render() {
    const {
      amount,
      cardError,
      emailAddress,
      errorMessage,
      fullName,
      hasBeenValidated,
      invalidFields,
      status,
    } = this.state;

    if (this.state.status === 'complete') return <h1>Purchase Complete</h1>;

    return (
      <div>
        <p>Select a gift and enter how much you would like to chip in.</p>
        <div className={styles.checkoutForm}>
          <div className={styles.creditCardField}>
            <label>
              Card details
              <CardElement onChange={this.handleCardChange} />
              <div className={styles.validation}>{cardError}</div>
            </label>
          </div>
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
            isValid={
              !invalidFields.includes('emailAddress') || !hasBeenValidated
            }
            errorMessage="Please enter a valid email address."
          />
          <Button
            onClick={this.submit}
            disabled={
              status === 'loading' ||
              cardError ||
              (hasBeenValidated && invalidFields.length > 0)
            }
            isLoading={status === 'loading'}
          >
            Send Gift
          </Button>
          {status === 'error' && (
            <AlertMessage type="error">{errorMessage}</AlertMessage>
          )}
        </div>
        <a
          href="https://stripe.com/au"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StripeLogo />
        </a>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
