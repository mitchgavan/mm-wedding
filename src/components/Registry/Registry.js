import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import styles from './Registry.module.css';

export default class Registry extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_TbaT0lpvmSdTKqV2LOsRk4vG">
        <div className="example">
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    )
  }
}
