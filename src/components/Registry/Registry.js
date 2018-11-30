import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import styles from './Registry.module.css';

export default class Registry extends Component {
  render() {
    return (
      <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}>
        <div>
          <p>
            Your presence is our present, but if you'd like to contribute to our
            honeymoon in Bali you can do so below, via the secure payment form
            below.
          </p>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}
