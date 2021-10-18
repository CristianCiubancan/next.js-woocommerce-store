import React from "react";
import Error from "../error";

import "./payment-mode.styles.scss";

const PaymentMode = ({ input, handleOnChange }) => {
  return (
    <div className="payment-options-container">
      <Error errors={input.errors} fieldName={"paymentMethod"} />
      {/*Pay with Stripe*/}
      <div className="woo-next-payment-input-container">
        <label className="form-check-label">
          <input
            onChange={handleOnChange}
            value="stripe"
            className="form-check-input"
            name="paymentMethod"
            type="radio"
          />
          <span>Pay with credit card</span>
        </label>
      </div>
      <div className="woo-next-payment-input-container">
        <label className="form-check-label">
          <input
            onChange={handleOnChange}
            value="cod"
            className="form-check-input"
            name="paymentMethod"
            type="radio"
          />
          <span className="woo-next-payment-content">
            Pay with cash on delivery
          </span>
        </label>
      </div>
    </div>
  );
};

export default PaymentMode;
