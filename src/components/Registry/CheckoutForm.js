import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import styles from './CheckoutForm.module.css';

class CheckoutForm extends Component {
  submit = async () => {
    console.log('submit');
    // let {token} = await this.props.stripe.createToken({name: "Name"});
    // let response = await fetch("/charge", {
    //   method: "POST",
    //   headers: {"Content-Type": "text/plain"},
    //   body: token.id
    // });
  
    // if (response.ok) console.log("Purchase Complete!")

    fetch('/.netlify/functions/hello')
      .then(response => response.json())
      .then(json => console.log(json.msg));
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm);
