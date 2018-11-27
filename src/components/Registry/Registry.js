import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import styles from './Registry.module.css';

export default class Registry extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_TbaT0lpvmSdTKqV2LOsRk4vG">
        <div>
          <p>
            Your presence is your present, but if you would like to contribute
            to our honeymoon in Bali you can do so below, via the secure payment
            form below.
          </p>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}
