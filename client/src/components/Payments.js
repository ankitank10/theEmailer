import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

class Payment extends Component {
  render() {
    return (
      <StripeCheckout
        name="Surveyly"
        description="Add credits to be surveyed!"
        token={token => {
          {
            this.props.handlePaymentToken(token);
          }
        }}
        amount={500}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payment);

