import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import styles from './CheckoutForm.module.css';

class CheckoutForm extends Component {
  state = {
    status: 'default',
  };

  submit = async () => {
    // let { token } = await this.props.stripe.createToken({ name: 'Name' });

    try {
      await axios.post('/.netlify/functions/charge', {
        token: 'tok_au',
      });
      this.setState({ status: 'complete' });
    } catch (err) {
      this.setState({ status: 'error' });
    }
  }

  render() {
    const { status } = this.state;
  
    if (this.state.status === 'complete') return <h1>Purchase Complete</h1>;

    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
        {status === 'error' && <div>Sorry, something went wrong.</div>}
      </div>
    )
  }
}

export default injectStripe(CheckoutForm);
