import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import isNumber from 'lodash/isNumber';
import Button from '../Button/Button';
import styles from './CheckoutForm.module.css';
import TextInput from '../Form/TextInput/TextInput';
import AlertMessage from '../AlertMessage/AlertMessage';
import Gifts from './Gifts/Gifts';
import { ReactComponent as StripeLogo } from '../../svg/powered-by-stripe.svg';
import { ReactComponent as FlowerDivider } from '../../svg/flower-divider.svg';

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
    gift: '',
    giftMessage: '',
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

    const isValid = validate[name] ? validate[name](value) : true;

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

  handleGiftSelect = gift => {
    this.setState({ gift });
  };

  submit = () => {
    const {
      amount,
      cardError,
      fullName,
      gift,
      giftMessage,
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
            message: giftMessage,
            gift,
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
      gift,
      hasBeenValidated,
      invalidFields,
      status,
    } = this.state;

    if (this.state.status === 'complete')
      return (
        <div className={styles.checkoutForm}>
          <p>Your gift has been sent! Thankyou for your generosity.</p>
          <FlowerDivider className={styles.flowerDivider} />
        </div>
      );

    return (
      <div>
        <p>
          Your presence is our present, but if you'd like to contribute to our
          honeymoon in Bali you can do so via the secure payment form below.
        </p>
        <p className={styles.intro}>
          Select a gift and enter how much you would like to chip in.
        </p>
        <Gifts onGiftSelect={this.handleGiftSelect} selectedGift={gift} />
        <div className={styles.checkoutForm}>
          <TextInput
            name="Amount"
            onChange={this.handleChange}
            type="text"
            value={amount}
            isValid={!invalidFields.includes('amount') || !hasBeenValidated}
            errorMessage="Please enter a valid amount."
            isCurrency
          />
          <TextInput
            name="Gift message"
            label="Message to the bride & groom"
            onChange={this.handleChange}
            type="textarea"
            value={amount}
          />
          <h3 className={styles.formHeading}>Payment Details</h3>
          <div className={styles.creditCardField}>
            <label>
              Card details
              <CardElement onChange={this.handleCardChange} />
              <div className={styles.validation}>{cardError}</div>
            </label>
          </div>
          <TextInput
            name="Full name"
            label="Name on card"
            onChange={this.handleChange}
            type="text"
            value={fullName}
            isValid={!invalidFields.includes('fullName') || !hasBeenValidated}
            errorMessage="Please enter the cardholder's name"
          />
          <TextInput
            name="Email address"
            label="Email address (for receipt)"
            onChange={this.handleChange}
            type="text"
            value={emailAddress}
            isValid={
              !invalidFields.includes('emailAddress') || !hasBeenValidated
            }
            errorMessage="Please enter a valid email address."
          />

          {gift && amount && (
            <div className={styles.giftConfirmation}>
              Your gift is ${amount} towards {gift}
            </div>
          )}
          <Button
            className={styles.submitButton}
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
